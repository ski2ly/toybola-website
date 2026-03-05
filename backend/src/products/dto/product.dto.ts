import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  nameRu: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameUz: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  descriptionRu?: string | null;

  @ApiProperty({ required: false })
  descriptionEn?: string | null;

  @ApiProperty({ required: false })
  descriptionUz?: string | null;

  @ApiProperty({ required: false })
  subcategoryId?: number | null;

  @ApiProperty({ required: false })
  dimensions?: string | null;

  @ApiProperty({ required: false })
  weightKg?: number | string | null;

  @ApiProperty({ required: false })
  recommendedAge?: string | null;

  @ApiProperty({ required: false })
  material?: string | null;

  @ApiProperty({ required: false })
  packagingType?: string | null;

  @ApiProperty()
  moq: number;

  @ApiProperty({ required: false })
  priceMinUsd?: number | null;

  @ApiProperty({ required: false })
  priceMaxUsd?: number | null;

  @ApiProperty()
  availability: string;

  @ApiProperty()
  isFeatured: boolean;

  @ApiProperty()
  isNew: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  subcategory?: any;

  @ApiProperty({ required: false })
  images?: any[];

  @ApiProperty({ required: false })
  attributes?: any[];
}

export class CreateProductDto {
  @ApiProperty()
  sku: string;

  @ApiProperty()
  nameRu: string;

  @ApiProperty()
  nameEn: string;

  @ApiProperty()
  nameUz: string;

  @ApiProperty({ required: false })
  slug?: string;

  @ApiProperty({ required: false })
  descriptionRu?: string | null;

  @ApiProperty({ required: false })
  descriptionEn?: string | null;

  @ApiProperty({ required: false })
  descriptionUz?: string | null;

  @ApiProperty({ required: false })
  subcategoryId?: number;

  @ApiProperty({ required: false })
  dimensions?: string;

  @ApiProperty({ required: false })
  weightKg?: number;

  @ApiProperty({ required: false })
  recommendedAge?: string;

  @ApiProperty({ required: false })
  material?: string;

  @ApiProperty({ required: false })
  packagingType?: string;

  @ApiProperty({ required: false })
  moq?: number;

  @ApiProperty({ required: false })
  priceMinUsd?: number;

  @ApiProperty({ required: false })
  priceMaxUsd?: number;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  isFeatured?: boolean;

  @ApiProperty({ required: false })
  isNew?: boolean;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  nameRu?: string;

  @ApiProperty({ required: false })
  nameEn?: string;

  @ApiProperty({ required: false })
  nameUz?: string;

  @ApiProperty({ required: false })
  descriptionRu?: string | null;

  @ApiProperty({ required: false })
  descriptionEn?: string | null;

  @ApiProperty({ required: false })
  descriptionUz?: string | null;

  @ApiProperty({ required: false })
  subcategoryId?: number;

  @ApiProperty({ required: false })
  dimensions?: string;

  @ApiProperty({ required: false })
  weightKg?: number;

  @ApiProperty({ required: false })
  recommendedAge?: string;

  @ApiProperty({ required: false })
  material?: string;

  @ApiProperty({ required: false })
  packagingType?: string;

  @ApiProperty({ required: false })
  moq?: number;

  @ApiProperty({ required: false })
  priceMinUsd?: number;

  @ApiProperty({ required: false })
  priceMaxUsd?: number;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  isFeatured?: boolean;

  @ApiProperty({ required: false })
  isNew?: boolean;

  @ApiProperty({ required: false })
  slug?: string;
}

export class FilterProductsDto {
  @ApiProperty({ required: false })
  category?: number;

  @ApiProperty({ required: false })
  subcategory?: number;

  @ApiProperty({ required: false })
  age?: string;

  @ApiProperty({ required: false })
  material?: string;

  @ApiProperty({ required: false })
  priceMin?: number;

  @ApiProperty({ required: false })
  priceMax?: number;

  @ApiProperty({ required: false })
  availability?: string;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  featured?: boolean;

  @ApiProperty({ required: false })
  new?: boolean;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  sortBy?: string;

  @ApiProperty({ required: false })
  sortOrder?: 'asc' | 'desc';
}
