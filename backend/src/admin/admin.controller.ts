import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto, UpdateProductDto } from '../products/dto/product.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../categories/dto/category.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('products')
  @ApiOperation({ summary: 'Get all products (admin)' })
  async getProducts(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
    @Query('search') search?: string,
  ) {
    return this.adminService.getProducts({ page, limit, search });
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID (admin)' })
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getProduct(id);
  }

  @Post('products')
  @ApiOperation({ summary: 'Create product (admin)' })
  async createProduct(@Body(new ValidationPipe({ transform: true })) dto: CreateProductDto) {
    return this.adminService.createProduct(dto);
  }

  @Put('products/:id')
  @ApiOperation({ summary: 'Update product (admin)' })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true })) dto: UpdateProductDto,
  ) {
    return this.adminService.updateProduct(id, dto);
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Delete product (admin)' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteProduct(id);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories (admin)' })
  async getCategories() {
    return this.adminService.getCategories();
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create category (admin)' })
  async createCategory(@Body(new ValidationPipe({ transform: true })) dto: CreateCategoryDto) {
    return this.adminService.createCategory(dto);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update category (admin)' })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, skipMissingProperties: true })) dto: UpdateCategoryDto,
  ) {
    return this.adminService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete category (admin)' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteCategory(id);
  }
}
