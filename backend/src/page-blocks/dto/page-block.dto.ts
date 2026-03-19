import { IsString, IsOptional, IsBoolean, IsInt, Min, IsObject } from 'class-validator';

export class CreatePageBlockDto {
  @IsString()
  page: string;

  @IsString()
  blockType: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsObject()
  content: Record<string, any>;

  @IsOptional()
  @IsString()
  bgColor?: string;

  @IsOptional()
  @IsString()
  paddingTop?: string;

  @IsOptional()
  @IsString()
  paddingBottom?: string;
}

export class UpdatePageBlockDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  blockType?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @IsObject()
  content?: Record<string, any>;

  @IsOptional()
  @IsString()
  bgColor?: string;

  @IsOptional()
  @IsString()
  paddingTop?: string;

  @IsOptional()
  @IsString()
  paddingBottom?: string;
}

export class ReorderPageBlocksDto {
  @IsString()
  page: string;

  @IsObject()
  blockOrder: Record<number, number>; // { blockId: newOrder }
}
