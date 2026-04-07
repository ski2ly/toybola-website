import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ImportService } from './import.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@ApiTags('Import')
@Controller('import')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('excel')
  @ApiOperation({ summary: 'Import products from Excel file' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'temp'),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `import-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Only Excel files (.xlsx, .xls) are allowed'), false);
        }
      },
    }),
  )
  async importExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body('updateExisting') updateExisting: string = 'true',
    @Body('createCategories') createCategories: string = 'true',
  ) {
    try {
      const result = await this.importService.processExcelFile(file.path, {
        updateExisting: updateExisting === 'true',
        createCategories: createCategories === 'true',
      });

      // Clean up temp file after processing
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error('Failed to delete temp file:', error);
      }

      return result;
    } catch (error) {
      // Clean up temp file on error
      try {
        fs.unlinkSync(file.path);
      } catch (cleanupError) {
        console.error('Failed to delete temp file:', cleanupError);
      }

      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: 'Ошибка импорта: ' + (error.message || 'Неизвестная ошибка'),
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('logs')
  @ApiOperation({ summary: 'Get import logs' })
  async getLogs() {
    return this.importService.getLogs();
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Get import log details' })
  async getLog(@Param('id', ParseIntPipe) id: number) {
    return this.importService.getLog(id);
  }
}
