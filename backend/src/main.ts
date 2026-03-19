import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  let app: NestExpressApplication;

  try {
    app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // CORS configuration
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ];

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    });

    // Serve static files from uploads directory
    app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // API prefix
    app.setGlobalPrefix('api/v1');

    // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('Toybola B2B API')
      .setDescription('API документация для B2B платформы Toybola')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Products', 'Управление продуктами')
      .addTag('Categories', 'Управление категориями')
      .addTag('Auth', 'Аутентификация')
      .addTag('Admin', 'Админ-панель')
      .addTag('Import', 'Импорт Excel')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Ensure uploads directories exist
    const uploadsDirs = ['./uploads', './uploads/temp', './uploads/products'];
    uploadsDirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🧸 Toybola Backend запущен!                             ║
    ║                                                           ║
    ║   API:        http://localhost:${port}                   ║
    ║   Swagger:    http://localhost:${port}/api/docs          ║
    ║   Uploads:    http://localhost:${port}/uploads/          ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error('❌ Ошибка запуска приложения:', error);
    if (app) {
      await app.close();
    }
    process.exit(1);
  }
}

bootstrap();
