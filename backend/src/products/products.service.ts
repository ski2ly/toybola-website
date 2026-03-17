import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './dto/product.dto';
import { slugify } from '../utils/slugify';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: FilterProductsDto) {
    const {
      category,
      subcategory,
      age,
      material,
      priceMin,
      priceMax,
      availability,
      search,
      featured,
      new: isNew,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: Prisma.ProductWhereInput = {};

    // Category filter
    if (category) {
      where.subcategory = {
        categoryId: category,
      };
    }

    // Subcategory filter
    if (subcategory) {
      where.subcategoryId = subcategory;
    }

    // Age filter
    if (age) {
      where.recommendedAge = age;
    }

    // Material filter
    if (material) {
      where.material = material;
    }

    // Price filter
    if (priceMin !== undefined || priceMax !== undefined) {
      where.priceMinUsd = {};
      if (priceMin !== undefined) {
        where.priceMinUsd.gte = priceMin;
      }
      if (priceMax !== undefined) {
        where.priceMinUsd.lte = priceMax;
      }
    }

    // Availability filter
    if (availability) {
      where.availability = availability;
    }

    // Featured filter
    if (featured !== undefined) {
      where.isFeatured = featured;
    }

    // New filter
    if (isNew !== undefined) {
      where.isNew = isNew;
    }

    // Search filter (SKU, name) - SQLite doesn't support mode: 'insensitive'
    if (search) {
      // For SQLite, use case-insensitive search via LOWER
      const searchLower = search.toLowerCase();
      where.OR = [
        { sku: { contains: searchLower } },
        { nameRu: { contains: searchLower } },
        { nameEn: { contains: searchLower } },
      ];
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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

  async findBySku(sku: string) {
    const product = await this.prisma.product.findUnique({
      where: { sku },
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
      throw new NotFoundException(`Product with SKU "${sku}" not found`);
    }

    return product;
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
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
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });

    if (existing) {
      throw new BadRequestException(`Product with SKU "${dto.sku}" already exists`);
    }

    const slug = dto.slug || slugify(dto.nameRu);

    const product = await this.prisma.product.create({
      data: {
        ...dto,
        slug,
        weightKg: dto.weightKg || undefined,
        priceMinUsd: dto.priceMinUsd || undefined,
        priceMaxUsd: dto.priceMaxUsd || undefined,
      },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
    });

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    const data: any = { ...dto };
    if (dto.nameRu && !data.slug) {
      data.slug = slugify(dto.nameRu);
    }

    const product = await this.prisma.product.update({
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

    return product;
  }

  async remove(id: number) {
    const existing = await this.prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    await this.prisma.product.delete({
      where: { id },
    });
  }

  async getFeatured(limit = 10) {
    return this.prisma.product.findMany({
      where: { isFeatured: true, availability: 'in_stock' },
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
    });
  }

  async getNew(limit = 10) {
    return this.prisma.product.findMany({
      where: { isNew: true, availability: 'in_stock' },
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
    });
  }
}
