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
      const priceRange: any = {};
      if (priceMin !== undefined) {
        priceRange.gte = priceMin;
      }
      if (priceMax !== undefined) {
        priceRange.lte = priceMax;
      }
      // Filter products where the price range overlaps with the requested range
      where.OR = [
        { priceMinUsd: priceRange },
        { priceMaxUsd: priceRange },
      ];
      // Also include products where min is below max and max is above min (full overlap)
      if (priceMin !== undefined && priceMax !== undefined) {
        where.OR.push({
          AND: [
            { priceMinUsd: { lte: priceMax } },
            { priceMaxUsd: { gte: priceMin } },
          ],
        });
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

    // Search filter (SKU, name in all languages) - SQLite doesn't support mode: 'insensitive'
    if (search) {
      // For SQLite, use case-insensitive search via LOWER
      const searchLower = search.toLowerCase();
      where.OR = [
        { sku: { contains: searchLower } },
        { nameRu: { contains: searchLower } },
        { nameEn: { contains: searchLower } },
        { nameUz: { contains: searchLower } },
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

  // Image upload methods
  async uploadImages(productId: number, files: Express.Multer.File[], primaryIndex: number = 0) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with id "${productId}" not found`);
    }

    // Get current max sort order
    const maxOrder = await this.prisma.productImage.aggregate({
      where: { productId },
      _max: { sortOrder: true },
    });
    let currentSortOrder = maxOrder._max.sortOrder || 0;

    // Create image records
    const imageRecords = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = `/uploads/products/${productId}/${file.filename}`;
      
      const imageRecord = await this.prisma.productImage.create({
        data: {
          productId,
          imageUrl,
          altText: product.nameRu,
          sortOrder: currentSortOrder + i + 1,
          isPrimary: i === primaryIndex,
        },
      });
      imageRecords.push(imageRecord);
    }

    return imageRecords;
  }

  async getProductImages(productId: number) {
    return this.prisma.productImage.findMany({
      where: { productId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async deleteImage(productId: number, imageId: number) {
    // Verify image belongs to product
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image) {
      throw new NotFoundException(`Image with id "${imageId}" not found for product "${productId}"`);
    }

    // Delete the file from disk (optional - can be done with fs.unlink)
    // For now, just delete from database
    await this.prisma.productImage.delete({
      where: { id: imageId },
    });

    return { success: true, message: 'Image deleted successfully' };
  }

  async setPrimaryImage(productId: number, imageId: number) {
    // Verify image belongs to product
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });
    if (!image) {
      throw new NotFoundException(`Image with id "${imageId}" not found for product "${productId}"`);
    }

    // Update all images for this product to not primary
    await this.prisma.productImage.updateMany({
      where: { productId },
      data: { isPrimary: false },
    });

    // Set the selected image as primary
    return this.prisma.productImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    });
  }
}
