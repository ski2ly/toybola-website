import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { slugify } from '../utils/slugify';

interface ImportOptions {
  updateExisting: boolean;
  createCategories: boolean;
}

export type ImportResult = {
  success: boolean;
  created: number;
  updated: number;
  errors: { row: number; message: string }[];
  fileName: string;
};

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async processExcelFile(filePath: string, options: ImportOptions): Promise<ImportResult> {
    const workbook = new ExcelJS.Workbook();

    try {
      await workbook.xlsx.readFile(filePath);
    } catch (error) {
      throw new BadRequestException('Failed to read Excel file');
    }

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new BadRequestException('No worksheet found in Excel file');
    }

    const headers: string[] = [];
    const results: ImportResult = {
      success: true,
      created: 0,
      updated: 0,
      errors: [],
      fileName: filePath.split('/').pop() || 'unknown',
    };

    // Parse rows - process sequentially to ensure proper async handling
    const rows: { rowNumber: number; rowData: any }[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // First row is headers
        row.eachCell((cell) => {
          headers.push(cell.value?.toString().toLowerCase().trim() || '');
        });
        return;
      }

      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) {
          rowData[header] = cell.value;
        }
      });
      rows.push({ rowNumber, rowData });
    });

    // Process rows sequentially
    for (const { rowNumber, rowData } of rows) {
      try {
        await this.processRow(rowData, options, rowNumber, results);
      } catch (error) {
        results.errors.push({
          row: rowNumber,
          message: error.message || 'Unknown error',
        });
      }
    }

    // Save import log
    await this.prisma.importLog.create({
      data: {
        fileName: results.fileName,
        status: results.errors.length > 0 ? 'completed_with_errors' : 'completed',
        createdCount: results.created,
        updatedCount: results.updated,
        errorCount: results.errors.length,
        errors: JSON.stringify(results.errors),
      },
    });

    if (results.errors.length > 0) {
      results.success = false;
    }

    return results;
  }

  private async processRow(
    data: any,
    options: ImportOptions,
    rowNumber: number,
    results: ImportResult,
  ) {
    // Normalize column names - support multiple variations
    const normalizeKey = (key: string): string => {
      if (!key) return '';
      const k = key.toLowerCase().trim();
      // Наименование / Name
      if (k.includes('наименование') || k.includes('название') || k === 'name' || k === 'product_name') return 'name';
      // Артикул / SKU
      if (k.includes('артикул') || k === 'sku' || k.includes('article')) return 'sku';
      // Категория
      if (k.includes('категория') || k === 'category') return 'category';
      // Карточка товара / Фото / Image
      if (k.includes('карточка') || k.includes('фото') || k.includes('image') || k === 'photo') return 'image_url';
      // Цвета / Colors
      if (k.includes('цвет') || k === 'colors' || k === 'colour') return 'colors';
      // Подкатегория / Subcategory
      if (k.includes('подкатегор') || k === 'subcategory') return 'subcategory';
      // Возрастная группа / Age
      if (k.includes('возраст') || k.includes('age') || k === 'age_group') return 'age_group';
      // Материал / Material
      if (k.includes('материал') || k === 'material') return 'material';
      // Цена / Price
      if (k.includes('цена') || k.includes('price') || k === 'cost') return 'price';
      // Минимальный заказ / MOQ
      if (k.includes('минимальн') || k.includes('min') || k === 'moq' || k.includes('заказ')) return 'moq';
      return k;
    };

    // Create normalized data object
    const normalizedData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key && value !== null && value !== undefined && value !== '') {
        const normalizedKey = normalizeKey(key);
        normalizedData[normalizedKey] = value;
      }
    }

    // Validate required fields: name and sku
    if (!normalizedData.name) {
      throw new Error('Missing required field: Наименование товара (строка ' + rowNumber + ')');
    }
    if (!normalizedData.sku) {
      throw new Error('Missing required field: Артикул товара (строка ' + rowNumber + ')');
    }

    // Extract normalized data
    const name = String(normalizedData.name);
    const sku = String(normalizedData.sku);
    const categoryName = normalizedData.category ? String(normalizedData.category) : undefined;
    const colors = normalizedData.colors ? String(normalizedData.colors) : undefined;
    const subcategoryName = normalizedData.subcategory ? String(normalizedData.subcategory) : undefined;
    const ageGroup = normalizedData.age_group ? String(normalizedData.age_group) : undefined;
    const material = normalizedData.material ? String(normalizedData.material) : undefined;
    const price = normalizedData.price ? String(normalizedData.price).replace(',', '.') : undefined;
    const moq = normalizedData.moq ? String(normalizedData.moq) : undefined;
    const imageUrl = normalizedData.image_url ? String(normalizedData.image_url) : undefined;

    // Validate price is a valid number
    let priceNum: number | undefined;
    if (price) {
      priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        throw new Error(`Invalid price value: ${price} (строка ${rowNumber})`);
      }
    }

    // Find or create category
    let subcategoryId: number | undefined;
    if (categoryName && options.createCategories) {
      subcategoryId = await this.findOrCreateSubcategory(
        categoryName,
        subcategoryName,
      );
    }

    // Check if product exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct && options.updateExisting) {
      // Update existing product
      await this.prisma.product.update({
        where: { sku },
        data: {
          nameRu: name || existingProduct.nameRu,
          nameEn: name || existingProduct.nameEn,
          nameUz: name || existingProduct.nameUz,
          descriptionRu: colors ? `Цвета: ${colors}` : existingProduct.descriptionRu,
          subcategoryId: subcategoryId ?? existingProduct.subcategoryId,
          recommendedAge: ageGroup ?? existingProduct.recommendedAge,
          material: material ?? existingProduct.material,
          moq: moq ? Number(moq) : existingProduct.moq,
          priceMinUsd: priceNum !== undefined ? priceNum : existingProduct.priceMinUsd,
          priceMaxUsd: priceNum !== undefined ? priceNum : existingProduct.priceMaxUsd,
        },
      });
      results.updated++;
    } else if (!existingProduct) {
      // Create new product
      await this.prisma.product.create({
        data: {
          sku,
          nameRu: name || 'Unnamed',
          nameEn: name || 'Unnamed',
          nameUz: name || 'Unnamed',
          slug: slugify(name || 'unnamed'),
          descriptionRu: colors ? `Цвета: ${colors}` : null,
          descriptionEn: colors ? `Colors: ${colors}` : null,
          subcategoryId,
          recommendedAge: ageGroup || null,
          material: material || null,
          moq: moq ? Number(moq) : 1,
          priceMinUsd: priceNum || null,
          priceMaxUsd: priceNum || null,
          availability: 'in_stock',
        },
      });
      results.created++;
    }

    // If image URL provided, create product image
    if (imageUrl) {
      const product = await this.prisma.product.findUnique({ where: { sku } });
      if (product) {
        // Check if image already exists to prevent duplicates
        const existingImage = await this.prisma.productImage.findFirst({
          where: { productId: product.id, imageUrl: imageUrl.toString() },
        });
        
        if (!existingImage) {
          await this.prisma.productImage.create({
            data: {
              productId: product.id,
              imageUrl: imageUrl.toString(),
              isPrimary: true,
            },
          });
        }
      }
    }
  }

  private async findOrCreateSubcategory(
    categoryName: string,
    subcategoryName?: string,
  ): Promise<number | undefined> {
    if (!categoryName) {
      return undefined;
    }

    // Find or create category
    let category = await this.prisma.category.findFirst({
      where: {
        nameRu: categoryName,
      },
    });

    if (!category) {
      category = await this.prisma.category.create({
        data: {
          nameRu: categoryName,
          nameEn: categoryName,
          nameUz: categoryName,
          slug: slugify(categoryName),
        },
      });
    }

    // If no subcategory, return category's first subcategory or undefined
    if (!subcategoryName) {
      const firstSubcategory = await this.prisma.subcategory.findFirst({
        where: { categoryId: category.id },
      });
      return firstSubcategory?.id;
    }

    // Find or create subcategory
    let subcategory = await this.prisma.subcategory.findFirst({
      where: {
        categoryId: category.id,
        nameRu: subcategoryName,
      },
    });

    if (!subcategory) {
      subcategory = await this.prisma.subcategory.create({
        data: {
          categoryId: category.id,
          nameRu: subcategoryName,
          nameEn: subcategoryName,
          nameUz: subcategoryName,
          slug: slugify(subcategoryName),
        },
      });
    }

    return subcategory.id;
  }

  async getLogs() {
    return this.prisma.importLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async getLog(id: number) {
    return this.prisma.importLog.findUnique({
      where: { id },
    });
  }
}
