import { ApiProperty } from '@nestjs/swagger';

export class UploadProductImagesDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: Express.Multer.File[];
}

export class ProductImageResponseDto {
  id: number;
  productId: number;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}
