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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
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
  async createProduct(@Body() dto: any) {
    return this.adminService.createProduct(dto);
  }

  @Put('products/:id')
  @ApiOperation({ summary: 'Update product (admin)' })
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
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
  async createCategory(@Body() dto: any) {
    return this.adminService.createCategory(dto);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update category (admin)' })
  async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.adminService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete category (admin)' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteCategory(id);
  }
}
