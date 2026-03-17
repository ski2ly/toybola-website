import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название (русский)', example: 'Транспорт' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Название (английский)', example: 'Transport' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Название (узбекский)', example: 'Transport' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiPropertyOptional({ description: 'Slug URL', example: 'transport' })
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

  @ApiPropertyOptional({ description: 'URL изображения' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Порядок сортировки', example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number = 0;

  @ApiPropertyOptional({ description: 'Активна', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: 'Название (русский)', example: 'Транспорт' })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Название (английский)', example: 'Transport' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Название (узбекский)', example: 'Transport' })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiPropertyOptional({ description: 'Slug URL', example: 'transport' })
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

  @ApiPropertyOptional({ description: 'URL изображения' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Порядок сортировки', example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Активна', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateSubcategoryDto {
  @ApiProperty({ description: 'ID категории', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ description: 'Название (русский)', example: 'Военная техника' })
  @IsString()
  @IsNotEmpty()
  nameRu: string;

  @ApiProperty({ description: 'Название (английский)', example: 'Military Vehicles' })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({ description: 'Название (узбекский)', example: 'Harbiy texnika' })
  @IsString()
  @IsNotEmpty()
  nameUz: string;

  @ApiPropertyOptional({ description: 'Slug URL', example: 'military-vehicles' })
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

  @ApiPropertyOptional({ description: 'URL изображения' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Порядок сортировки', example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number = 0;

  @ApiPropertyOptional({ description: 'Активна', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateSubcategoryDto {
  @ApiPropertyOptional({ description: 'ID категории' })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Название (русский)' })
  @IsOptional()
  @IsString()
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Название (английский)' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Название (узбекский)' })
  @IsOptional()
  @IsString()
  nameUz?: string;

  @ApiPropertyOptional({ description: 'Slug URL' })
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

  @ApiPropertyOptional({ description: 'URL изображения' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Порядок сортировки' })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Активна' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
