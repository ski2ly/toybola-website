import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PageBlocksService } from './page-blocks.service';
import { CreatePageBlockDto, UpdatePageBlockDto, ReorderPageBlocksDto } from './dto/page-block.dto';

@Controller('page-blocks')
export class PageBlocksController {
  constructor(private readonly pageBlocksService: PageBlocksService) {}

  @Get()
  findAll(@Query('page') page?: string) {
    return this.pageBlocksService.findAll(page || '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pageBlocksService.findOne(id);
  }

  @Post()
  create(@Body() createPageBlockDto: CreatePageBlockDto) {
    return this.pageBlocksService.create(createPageBlockDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePageBlockDto: UpdatePageBlockDto,
  ) {
    return this.pageBlocksService.update(id, updatePageBlockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pageBlocksService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() reorderDto: ReorderPageBlocksDto) {
    return this.pageBlocksService.reorder(reorderDto);
  }

  @Post(':id/toggle')
  toggleStatus(@Param('id', ParseIntPipe) id: number) {
    return this.pageBlocksService.toggleStatus(id);
  }
}
