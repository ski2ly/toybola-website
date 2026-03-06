import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ============================================
  // Создаем админ пользователя
  // ============================================
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.adminUser.upsert({
    where: { email: 'admin@toybola.com' },
    update: {},
    create: {
      email: 'admin@toybola.com',
      password: hashedPassword,
      name: 'Администратор',
      role: 'admin',
      isActive: true,
    },
  });
  console.log('✅ Admin user created (admin@toybola.com / admin123)');

  // ============================================
  // Создаем категории
  // ============================================
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'transport' },
      update: {},
      create: {
        nameRu: 'Транспорт',
        nameEn: 'Vehicles',
        nameUz: 'Transport',
        slug: 'transport',
        descriptionRu: 'Игрушечные автомобили и техника',
        sortOrder: 1,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sets' },
      update: {},
      create: {
        nameRu: 'Наборы',
        nameEn: 'Sets',
        nameUz: 'Toʻplamlar',
        slug: 'sets',
        descriptionRu: 'Игровые наборы для детей',
        sortOrder: 2,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'outdoor' },
      update: {},
      create: {
        nameRu: 'Игрушки для улицы',
        nameEn: 'Outdoor Toys',
        nameUz: 'Koʻcha oʻyinchoqlari',
        slug: 'outdoor',
        descriptionRu: 'Игрушки для игр на свежем воздухе',
        sortOrder: 3,
        isActive: true,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'educational' },
      update: {},
      create: {
        nameRu: 'Развивающие',
        nameEn: 'Educational',
        nameUz: 'Rivojlantiruvchi',
        slug: 'educational',
        descriptionRu: 'Образовательные и развивающие игрушки',
        sortOrder: 4,
        isActive: true,
      },
    }),
  ]);

  console.log('✅ Categories created');

  // ============================================
  // Создаем подкатегории
  // ============================================
  const transportCategory = categories[0];
  const setsCategory = categories[1];
  const outdoorCategory = categories[2];

  const subcategories = await Promise.all([
    // Транспорт
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: transportCategory.id, slug: 'military' } },
      update: {},
      create: {
        categoryId: transportCategory.id,
        nameRu: 'Военная техника',
        nameEn: 'Military Equipment',
        nameUz: 'Harbiy texnika',
        slug: 'military',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: transportCategory.id, slug: 'construction' } },
      update: {},
      create: {
        categoryId: transportCategory.id,
        nameRu: 'Строительная техника',
        nameEn: 'Construction Equipment',
        nameUz: 'Qurilish texnika',
        slug: 'construction',
        sortOrder: 2,
      },
    }),
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: transportCategory.id, slug: 'racing' } },
      update: {},
      create: {
        categoryId: transportCategory.id,
        nameRu: 'Гоночные машины',
        nameEn: 'Racing Cars',
        nameUz: 'Poyga mashinalari',
        slug: 'racing',
        sortOrder: 3,
      },
    }),
    // Наборы
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: setsCategory.id, slug: 'princess' } },
      update: {},
      create: {
        categoryId: setsCategory.id,
        nameRu: 'Наборы принцесс',
        nameEn: 'Princess Sets',
        nameUz: 'Malika toʻplamlari',
        slug: 'princess',
        sortOrder: 1,
      },
    }),
    // Уличные
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: outdoorCategory.id, slug: 'sandbox' } },
      update: {},
      create: {
        categoryId: outdoorCategory.id,
        nameRu: 'Песочные наборы',
        nameEn: 'Sandbox Sets',
        nameUz: 'Qumdon toʻplamlari',
        slug: 'sandbox',
        sortOrder: 1,
      },
    }),
  ]);

  console.log('✅ Subcategories created');

  // ============================================
  // Создаем тестовые продукты
  // ============================================
  const militarySubcat = subcategories[0];
  const constructionSubcat = subcategories[1];
  const princessSubcat = subcategories[3];
  const sandboxSubcat = subcategories[4];

  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: 'TB-007' },
      update: {},
      create: {
        sku: 'TB-007',
        nameRu: 'RIFLE AK',
        nameEn: 'RIFLE AK',
        nameUz: 'RIFLE AK',
        slug: 'rifle-ak',
        descriptionRu: 'Игрушечная винтовка AK для детей от 3 лет.',
        subcategoryId: militarySubcat.id,
        dimensions: '45x15x10 см',
        weightKg: 0.8,
        recommendedAge: '3+',
        material: 'ABS-пластик',
        packagingType: 'Цветная коробка',
        moq: 100,
        priceMinUsd: 5.50,
        priceMaxUsd: 8.00,
        availability: 'in_stock',
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'TB-008' },
      update: {},
      create: {
        sku: 'TB-008',
        nameRu: 'TANK T34',
        nameEn: 'TANK T34',
        nameUz: 'TANK T34',
        slug: 'tank-t34',
        descriptionRu: 'Легендарный танк T34 в миниатюре.',
        subcategoryId: militarySubcat.id,
        dimensions: '30x15x12 см',
        weightKg: 1.2,
        recommendedAge: '6+',
        material: 'ABS-пластик, металл',
        packagingType: 'Цветная коробка с окном',
        moq: 50,
        priceMinUsd: 12.00,
        priceMaxUsd: 15.00,
        availability: 'in_stock',
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'TB-015' },
      update: {},
      create: {
        sku: 'TB-015',
        nameRu: 'EXCAVATOR PRO',
        nameEn: 'EXCAVATOR PRO',
        nameUz: 'EXCAVATOR PRO',
        slug: 'excavator-pro',
        descriptionRu: 'Игрушечный экскаватор с подвижной стрелой.',
        subcategoryId: constructionSubcat.id,
        dimensions: '35x12x18 см',
        weightKg: 1.5,
        recommendedAge: '3+',
        material: 'ABS-пластик',
        packagingType: 'Цветная коробка',
        moq: 60,
        priceMinUsd: 10.00,
        priceMaxUsd: 14.00,
        availability: 'in_stock',
      },
    }),
    prisma.product.upsert({
      where: { sku: 'TB-101' },
      update: {},
      create: {
        sku: 'TB-101',
        nameRu: 'Замок принцессы',
        nameEn: 'Princess Castle',
        nameUz: 'Malika qalʼasi',
        slug: 'princess-castle',
        descriptionRu: 'Большой игровой набор с замком.',
        subcategoryId: princessSubcat.id,
        dimensions: '50x40x60 см',
        weightKg: 3.5,
        recommendedAge: '3+',
        material: 'ABS-пластик',
        packagingType: 'Цветная коробка с ручкой',
        moq: 20,
        priceMinUsd: 35.00,
        priceMaxUsd: 45.00,
        availability: 'in_stock',
        isFeatured: true,
        isNew: true,
      },
    }),
    prisma.product.upsert({
      where: { sku: 'TB-201' },
      update: {},
      create: {
        sku: 'TB-201',
        nameRu: 'Песочный набор "Замок"',
        nameEn: 'Sandbox Set "Castle"',
        nameUz: 'Qumdon toʻplami "Qalʼa"',
        slug: 'sandbox-castle',
        descriptionRu: 'Набор формочек для строительства песочных замков.',
        subcategoryId: sandboxSubcat.id,
        dimensions: '30x25x15 см',
        weightKg: 0.6,
        recommendedAge: '2+',
        material: 'PP-пластик',
        packagingType: 'Сетка с картонной вставкой',
        moq: 100,
        priceMinUsd: 4.50,
        priceMaxUsd: 6.00,
        availability: 'in_stock',
        isNew: true,
      },
    }),
  ]);

  console.log('✅ Products created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
