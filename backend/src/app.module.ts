import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ImportModule } from './import/import.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { SeoModule } from './seo/seo.module';
// import { PageBlocksModule } from './page-blocks/page-blocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    ImportModule,
    ContactFormModule,
    SeoModule,
    // PageBlocksModule, // TODO: Fix route registration
  ],
})
export class AppModule {}
