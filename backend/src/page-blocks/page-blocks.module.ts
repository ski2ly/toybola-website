import { Module, Global } from '@nestjs/common';
import { PageBlocksService } from './page-blocks.service';
import { PageBlocksController } from './page-blocks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  controllers: [PageBlocksController],
  providers: [PageBlocksService],
  exports: [PageBlocksService],
})
export class PageBlocksModule {}
