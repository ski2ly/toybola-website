import { Module } from '@nestjs/common';
import { ContactFormController } from './contact-form.controller';
import { ContactFormService } from './contact-form.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactFormController],
  providers: [ContactFormService],
  exports: [ContactFormService],
})
export class ContactFormModule {}
