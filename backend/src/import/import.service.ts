import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { slugify } from '../utils/slugify';
import { Decimal } from '@prisma/client/runtime/library';

interface ImportOptions {
  updateExisting: boolean;
  createCategories: boolean;
}

export type ImportResult = {
  success: boolean;
  created: number;
  updated: number;
  errors: Array<{ row: number; message: string }>;
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

    // Parse rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        // First row is headers
        row.eachCell((cell) => {
          headers.push(cell.value?.toString().toLowerCase().trim() || '');
        });
        return;
      }

      try {
        const rowData: any = {};
        row.eachCell((cell, colNumber) => {
          const header = headers[colNumber - 1];
          if (header) {
            rowData[header] = cell.value;
          }
        });

        this.processRow(rowData, options, rowNumber, results);
      } catch (error) {
        results.errors.push({
          row: rowNumber,
          message: error.message || 'Unknown error',
        });
      }
    });

    // Save import log
    await this.prisma.importLog.create({
      data: {
        fileName: results.fileName,
        status: results.errors.length > 0 ? 'completed_with_errors' : 'completed',
        createdCount: results.created,
        updatedCount: results.updated,
        errorCount: results.errors.length,
        errors: results.errors,
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
    // Validate required fields
    if (!data.sku) {
      throw new Error('Missing required field: sku');
    }
    if (!data.name_ru && !data.name_en) {
      throw new Error('Missing required field: name_ru or name_en');
    }

    // Find or create category
    let subcategoryId: number | undefined;
    if (data.category && options.createCategories) {
      subcategoryId = await this.findOrCreateSubcategory(
        data.category,
        data.subcategory,
      );
    }

    // Check if product exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { sku: data.sku.toString() },
    });

    if (existingProduct && options.updateExisting) {
      // Update existing product
      await this.prisma.product.update({
        where: { sku: data.sku.toString() },
        data: {
          nameRu: data.name_ru || existingProduct.nameRu,
          nameEn: data.name_en || existingProduct.nameEn,
          nameUz: data.name_uz || existingProduct.nameUz,
          descriptionRu: data.description_ru ?? existingProduct.descriptionRu,
          descriptionEn: data.description_en ?? existingProduct.descriptionEn,
          descriptionUz: data.description_uz ?? existingProduct.descriptionUz,
          subcategoryId: subcategoryId ?? existingProduct.subcategoryId,
          dimensions: data.dimensions ?? existingProduct.dimensions,
          weightKg: data.weight_kg ? new Decimal(data.weight_kg) : existingProduct.weightKg,
          recommendedAge: data.age ?? existingProduct.recommendedAge,
          material: data.material ?? existingProduct.material,
          packagingType: data.packaging ?? existingProduct.packagingType,
          moq: data.moq ?? existingProduct.moq,
          priceMinUsd: data.price_min_usd ? new Decimal(data.price_min_usd) : existingProduct.priceMinUsd,
          priceMaxUsd: data.price_max_usd ? new Decimal(data.price_max_usd) : existingProduct.priceMaxUsd,
          availability: data.availability ?? existingProduct.availability,
        },
      });
      results.updated++;
    } else if (!existingProduct) {
      // Create new product
      await this.prisma.product.create({
        data: {
          sku: data.sku.toString(),
          nameRu: data.name_ru || data.name_en || 'Unnamed',
          nameEn: data.name_en || data.name_ru || 'Unnamed',
          nameUz: data.name_uz || data.name_en || 'Unnamed',
          slug: slugify(data.name_ru || data.name_en || 'unnamed'),
          descriptionRu: data.description_ru,
          descriptionEn: data.description_en,
          descriptionUz: data.description_uz,
          subcategoryId,
          dimensions: data.dimensions,
          weightKg: data.weight_kg ? new Decimal(data.weight_kg) : undefined,
          recommendedAge: data.age,
          material: data.material,
          packagingType: data.packaging,
          moq: data.moq || 1,
          priceMinUsd: data.price_min_usd ? new Decimal(data.price_min_usd) : undefined,
          priceMaxUsd: data.price_max_usd ? new Decimal(data.price_max_usd) : undefined,
          availability: data.availability || 'in_stock',
        },
      });
      results.created++;
    }
  }

  private async findOrCreateSubcategory(categoryName: string, subcategoryName?: string): Promise<number | undefined> {
    if (!subcategoryName) {
      // Only category provided, return undefined (no subcategory)
      return undefined;
    }

    // Find or create category
    let category = await this.prisma.category.findFirst({
      where: {
        nameRu: { contains: categoryName, mode: 'insensitive' },
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

    // Find or create subcategory
    let subcategory = await this.prisma.subcategory.findFirst({
      where: {
        categoryId: category.id,
        nameRu: { contains: subcategoryName, mode: 'insensitive' },
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
