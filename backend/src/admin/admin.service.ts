import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../utils/slugify';

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
      const searchLower = search.toLowerCase();
      where.OR = [
        { sku: { contains: searchLower } },
        { nameRu: { contains: searchLower } },
        { nameEn: { contains: searchLower } },
        { nameUz: { contains: searchLower } },
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
      throw new BadRequestException(`Product with SKU "${dto.sku}" already exists`);
    }

    const slug = dto.slug || slugify(dto.nameRu);

    // Check for duplicate slug
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      throw new BadRequestException(`Product with slug "${slug}" already exists`);
    }

    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
        weightKg: dto.weightKg ? Number(dto.weightKg) : undefined,
        priceMinUsd: dto.priceMinUsd ? Number(dto.priceMinUsd) : undefined,
        priceMaxUsd: dto.priceMaxUsd ? Number(dto.priceMaxUsd) : undefined,
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
      const newSlug = slugify(dto.nameRu);
      // Check for slug collision
      const slugConflict = await this.prisma.product.findUnique({
        where: { slug: newSlug },
      });
      if (slugConflict && slugConflict.id !== id) {
        throw new BadRequestException(`Product with slug "${newSlug}" already exists`);
      }
      data.slug = newSlug;
    }
    if (dto.weightKg) {
      data.weightKg = Number(dto.weightKg);
    }
    if (dto.priceMinUsd) {
      data.priceMinUsd = Number(dto.priceMinUsd);
    }
    if (dto.priceMaxUsd) {
      data.priceMaxUsd = Number(dto.priceMaxUsd);
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

    // Check for duplicate slug
    const existingSlug = await this.prisma.category.findUnique({
      where: { slug },
    });
    if (existingSlug) {
      throw new BadRequestException(`Category with slug "${slug}" already exists`);
    }

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
      const newSlug = slugify(dto.nameRu);
      // Check for slug collision
      const slugConflict = await this.prisma.category.findUnique({
        where: { slug: newSlug },
      });
      if (slugConflict && slugConflict.id !== id) {
        throw new BadRequestException(`Category with slug "${newSlug}" already exists`);
      }
      data.slug = newSlug;
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
