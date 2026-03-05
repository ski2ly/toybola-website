import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../utils/slugify';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalProducts,
      totalCategories,
      inStockProducts,
      lowStockProducts,
      outOfStockProducts,
      featuredProducts,
      newProducts,
    ] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.category.count(),
      this.prisma.product.count({ where: { availability: 'in_stock' } }),
      this.prisma.product.count({ where: { availability: 'low_stock' } }),
      this.prisma.product.count({ where: { availability: 'out_of_stock' } }),
      this.prisma.product.count({ where: { isFeatured: true } }),
      this.prisma.product.count({ where: { isNew: true } }),
    ]);

    return {
      totalProducts,
      totalCategories,
      inventory: {
        inStock: inStockProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts,
      },
      featured: featuredProducts,
      new: newProducts,
    };
  }

  async getProducts(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { sku: { contains: search, mode: 'insensitive' } },
        { nameRu: { contains: search, mode: 'insensitive' } },
        { nameEn: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          subcategory: {
            include: {
              category: true,
            },
          },
          images: {
            where: { isPrimary: true },
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        perPage: limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        attributes: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return product;
  }

  async createProduct(dto: any) {
    const existing = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });

    if (existing) {
      throw new NotFoundException(`Product with SKU "${dto.sku}" already exists`);
    }

    const slug = dto.slug || slugify(dto.nameRu);

    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
        weightKg: dto.weightKg ? new Decimal(dto.weightKg) : undefined,
        priceMinUsd: dto.priceMinUsd ? new Decimal(dto.priceMinUsd) : undefined,
        priceMaxUsd: dto.priceMaxUsd ? new Decimal(dto.priceMaxUsd) : undefined,
      },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async updateProduct(id: number, dto: any) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    const data: any = { ...dto };
    if (dto.nameRu && !dto.slug) {
      data.slug = slugify(dto.nameRu);
    }
    if (dto.weightKg) {
      data.weightKg = new Decimal(dto.weightKg);
    }
    if (dto.priceMinUsd) {
      data.priceMinUsd = new Decimal(dto.priceMinUsd);
    }
    if (dto.priceMaxUsd) {
      data.priceMaxUsd = new Decimal(dto.priceMaxUsd);
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async deleteProduct(id: number) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    await this.prisma.product.delete({
      where: { id },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { subcategories: true },
        },
      },
    });
  }

  async createCategory(dto: any) {
    const slug = dto.slug || slugify(dto.nameRu);

    return this.prisma.category.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async updateCategory(id: number, dto: any) {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    const data: any = { ...dto };
    if (dto.nameRu && !dto.slug) {
      data.slug = slugify(dto.nameRu);
    }

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number) {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    await this.prisma.category.delete({
      where: { id },
    });
  }
}
