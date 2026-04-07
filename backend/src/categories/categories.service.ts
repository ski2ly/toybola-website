import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { slugify } from '../utils/slugify';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(isActive?: boolean) {
    const where: any = {};
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return this.prisma.category.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { subcategories: true },
        },
      },
    });
  }

  async findOne(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }

    return category;
  }

  async getSubcategories(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with slug "${categorySlug}" not found`);
    }

    return category.subcategories;
  }

  async create(dto: CreateCategoryDto) {
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

  async update(id: number, dto: UpdateCategoryDto) {
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

  async remove(id: number) {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    await this.prisma.category.delete({
      where: { id },
    });
  }
}
