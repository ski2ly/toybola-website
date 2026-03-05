import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;

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
  imageUrl?: string | null;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateCategoryDto {
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
  imageUrl?: string | null;

  @ApiProperty({ required: false })
  sortOrder?: number;
}

export class UpdateCategoryDto {
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
  imageUrl?: string | null;

  @ApiProperty({ required: false })
  sortOrder?: number;

  @ApiProperty({ required: false })
  isActive?: boolean;

  @ApiProperty({ required: false })
  slug?: string;
}
