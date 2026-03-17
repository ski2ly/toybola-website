import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'SKU (артикул)', example: 'TB-007' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'Название (русский)', example: 'RIFLE AK' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Название (английский)', example: 'RIFLE AK' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Название (узбекский)', example: 'RIFLE AK' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiPropertyOptional({ description: 'Slug URL', example: 'rifle-ak' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Описание (русский)' })
  @IsOptional()
  @IsString()
  descriptionRu?: string;

  @ApiPropertyOptional({ description: 'Описание (английский)' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Описание (узбекский)' })
  @IsOptional()
  @IsString()
  descriptionUz?: string;

  @ApiPropertyOptional({ description: 'ID подкатегории' })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiPropertyOptional({ description: 'Габариты', example: '30x20x10 см' })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiPropertyOptional({ description: 'Вес в кг', example: 0.8 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;

  @ApiPropertyOptional({ description: 'Рекомендуемый возраст', example: '3+' })
  @IsOptional()
  @IsString()
  recommendedAge?: string;

  @ApiPropertyOptional({ description: 'Материал', example: 'ABS-пластик' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ description: 'Тип упаковки', example: 'Коробка' })
  @IsOptional()
  @IsString()
  packagingType?: string;

  @ApiPropertyOptional({ description: 'Минимальный заказ', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  moq?: number = 1;

  @ApiPropertyOptional({ description: 'Минимальная цена USD', example: 5.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMinUsd?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена USD', example: 7.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMaxUsd?: number;

  @ApiPropertyOptional({
    description: 'Доступность',
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
    example: 'in_stock',
  })
  @IsOptional()
  @IsEnum(['in_stock', 'out_of_stock', 'pre_order'])
  availability?: string = 'in_stock';

  @ApiPropertyOptional({ description: 'Рекомендуемый товар', example: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @ApiPropertyOptional({ description: 'Новый товар', example: true })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean = false;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'SKU (артикул)', example: 'TB-007' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ description: 'Название (русский)', example: 'RIFLE AK' })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Название (английский)', example: 'RIFLE AK' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Название (узбекский)', example: 'RIFLE AK' })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiPropertyOptional({ description: 'Slug URL', example: 'rifle-ak' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Описание (русский)' })
  @IsOptional()
  @IsString()
  descriptionRu?: string;

  @ApiPropertyOptional({ description: 'Описание (английский)' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Описание (узбекский)' })
  @IsOptional()
  @IsString()
  descriptionUz?: string;

  @ApiPropertyOptional({ description: 'ID подкатегории' })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiPropertyOptional({ description: 'Габариты', example: '30x20x10 см' })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiPropertyOptional({ description: 'Вес в кг', example: 0.8 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;

  @ApiPropertyOptional({ description: 'Рекомендуемый возраст', example: '3+' })
  @IsOptional()
  @IsString()
  recommendedAge?: string;

  @ApiPropertyOptional({ description: 'Материал', example: 'ABS-пластик' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ description: 'Тип упаковки', example: 'Коробка' })
  @IsOptional()
  @IsString()
  packagingType?: string;

  @ApiPropertyOptional({ description: 'Минимальный заказ', example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  moq?: number;

  @ApiPropertyOptional({ description: 'Минимальная цена USD', example: 5.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMinUsd?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена USD', example: 7.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  priceMaxUsd?: number;

  @ApiPropertyOptional({
    description: 'Доступность',
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
    example: 'in_stock',
  })
  @IsOptional()
  @IsEnum(['in_stock', 'out_of_stock', 'pre_order'])
  availability?: string;

  @ApiPropertyOptional({ description: 'Рекомендуемый товар', example: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Новый товар', example: true })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
}

export class FilterProductsDto {
  @ApiPropertyOptional({ description: 'ID категории', example: 1 })
  @IsOptional()
  @IsNumber()
  category?: number;

  @ApiPropertyOptional({ description: 'ID подкатегории', example: 5 })
  @IsOptional()
  @IsNumber()
  subcategory?: number;

  @ApiPropertyOptional({ description: 'Возраст', example: '3+' })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiPropertyOptional({ description: 'Материал', example: 'ABS-пластик' })
  @IsOptional()
  @IsString()
  material?: string;

  @ApiPropertyOptional({ description: 'Минимальная цена', example: 5 })
  @IsOptional()
  @IsNumber()
  priceMin?: number;

  @ApiPropertyOptional({ description: 'Максимальная цена', example: 50 })
  @IsOptional()
  @IsNumber()
  priceMax?: number;

  @ApiPropertyOptional({
    description: 'Доступность',
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
  })
  @IsOptional()
  @IsEnum(['in_stock', 'out_of_stock', 'pre_order'])
  availability?: string;

  @ApiPropertyOptional({ description: 'Поиск по SKU или названию' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Рекомендуемые', example: 'true' })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ description: 'Новые', example: 'true' })
  @IsOptional()
  @IsBoolean()
  new?: boolean;

  @ApiPropertyOptional({ description: 'Страница', example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Лимит', example: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Сортировка',
    enum: ['createdAt', 'nameRu', 'priceMinUsd', 'sku'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Порядок',
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
