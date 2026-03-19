import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageBlockDto, UpdatePageBlockDto, ReorderPageBlocksDto } from './dto/page-block.dto';

@Injectable()
export class PageBlocksService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: string) {
    const blocks = await this.prisma.pageBlock.findMany({
      where: page ? { page, isEnabled: true } : { isEnabled: true },
      orderBy: { order: 'asc' },
    });
    
    // Parse JSON content
    return blocks.map(block => ({
      ...block,
      content: JSON.parse(block.content as string) || {},
    }));
  }

  async findOne(id: number) {
    const block = await this.prisma.pageBlock.findUnique({
      where: { id },
    });
    if (!block) {
      throw new NotFoundException(`Page block with ID ${id} not found`);
    }
    return {
      ...block,
      content: JSON.parse(block.content as string) || {},
    };
  }

  async create(createPageBlockDto: CreatePageBlockDto) {
    // Get the highest order for this page
    const maxOrder = await this.prisma.pageBlock.aggregate({
      where: { page: createPageBlockDto.page },
      _max: { order: true },
    });

    return this.prisma.pageBlock.create({
      data: {
        ...createPageBlockDto,
        content: JSON.stringify(createPageBlockDto.content),
        order: createPageBlockDto.order ?? (maxOrder._max.order ?? 0) + 1,
      },
    });
  }

  async update(id: number, updatePageBlockDto: UpdatePageBlockDto) {
    await this.findOne(id); // Verify exists
    
    const data: any = { ...updatePageBlockDto };
    if (updatePageBlockDto.content) {
      data.content = JSON.stringify(updatePageBlockDto.content);
    }
    
    return this.prisma.pageBlock.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verify exists
    return this.prisma.pageBlock.delete({
      where: { id },
    });
  }

  async reorder(reorderDto: ReorderPageBlocksDto) {
    const { page, blockOrder } = reorderDto;

    // Update order for each block
    const updates = Object.entries(blockOrder).map(([blockId, order]) =>
      this.prisma.pageBlock.update({
        where: { id: parseInt(blockId) },
        data: { order },
      }),
    );

    await this.prisma.$transaction(updates);
    return this.findAll(page);
  }

  async toggleStatus(id: number) {
    const block = await this.findOne(id);
    return this.prisma.pageBlock.update({
      where: { id },
      data: { isEnabled: !block.isEnabled },
    });
  }
}
