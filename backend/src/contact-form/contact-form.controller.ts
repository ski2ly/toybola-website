import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormSubmissionDto, UpdateContactStatusDto } from './dto/contact-form.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact-form')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post('submit')
  async submit(@Body() data: CreateContactFormSubmissionDto) {
    return this.contactFormService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('status') status?: string,
    @Query('topic') topic?: string,
  ) {
    return this.contactFormService.findAll({ page, limit, status, topic });
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/stats')
  async getStats() {
    return this.contactFormService.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactFormService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateContactStatusDto,
  ) {
    return this.contactFormService.updateStatus(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactFormService.remove(id);
  }
}
