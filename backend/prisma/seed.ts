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
        descriptionEn: 'Toy cars and vehicles',
        descriptionUz: 'Oʻyinchoq mashinalar va texnika',
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
        descriptionEn: 'Play sets for children',
        descriptionUz: 'Bolalar uchun oʻyin toʻplamlari',
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
        descriptionEn: 'Toys for outdoor play',
        descriptionUz: 'Ochiq havoda oʻynash uchun oʻyinchoqlar',
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
        descriptionEn: 'Educational and learning toys',
        descriptionUz: 'Taʼlimiy va rivojlantiruvchi oʻyinchoqlar',
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
    // Транспорт подкатегории
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: transportCategory.id, slug: 'military' } },
      update: {},
      create: {
        categoryId: transportCategory.id,
        nameRu: 'Военная техника',
        nameEn: 'Military Equipment',
        nameUz: 'Harbiy texnika',
        slug: 'military',
        descriptionRu: 'Игрушечная военная техника',
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
        descriptionRu: 'Игрушечная строительная техника',
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
        descriptionRu: 'Игрушечные гоночные автомобили',
        sortOrder: 3,
      },
    }),
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: transportCategory.id, slug: 'offroad' } },
      update: {},
      create: {
        categoryId: transportCategory.id,
        nameRu: 'Внедорожники',
        nameEn: 'Off-road Vehicles',
        nameUz: 'Yoʻltanlamaslar',
        slug: 'offroad',
        descriptionRu: 'Игрушечные внедорожники',
        sortOrder: 4,
      },
    }),

    // Наборы подкатегории
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: setsCategory.id, slug: 'princess' } },
      update: {},
      create: {
        categoryId: setsCategory.id,
        nameRu: 'Наборы принцесс',
        nameEn: 'Princess Sets',
        nameUz: 'Malika toʻplamlari',
        slug: 'princess',
        descriptionRu: 'Игровые наборы с принцессами',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: setsCategory.id, slug: 'city' } },
      update: {},
      create: {
        categoryId: setsCategory.id,
        nameRu: 'Городские наборы',
        nameEn: 'City Sets',
        nameUz: 'Shahar toʻplamlari',
        slug: 'city',
        descriptionRu: 'Наборы для создания игрового города',
        sortOrder: 2,
      },
    }),

    // Уличные подкатегории
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: outdoorCategory.id, slug: 'sandbox' } },
      update: {},
      create: {
        categoryId: outdoorCategory.id,
        nameRu: 'Песочные наборы',
        nameEn: 'Sandbox Sets',
        nameUz: 'Qumdon toʻplamlari',
        slug: 'sandbox',
        descriptionRu: 'Наборы для игр в песочнице',
        sortOrder: 1,
      },
    }),
    prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: outdoorCategory.id, slug: 'sports' } },
      update: {},
      create: {
        categoryId: outdoorCategory.id,
        nameRu: 'Спортивные игрушки',
        nameEn: 'Sports Toys',
        nameUz: 'Sport oʻyinchoqlari',
        slug: 'sports',
        descriptionRu: 'Игрушки для активных игр',
        sortOrder: 2,
      },
    }),
  ]);

  console.log('✅ Subcategories created');

  // ============================================
  // Создаем тестовые продукты
  // ============================================
  const militarySubcat = subcategories[0];
  const constructionSubcat = subcategories[1];
  const princessSubcat = subcategories[4];
  const sandboxSubcat = subcategories[6];

  const products = await Promise.all([
    // Военная техника
    prisma.product.upsert({
      where: { sku: 'TB-007' },
      update: {},
      create: {
        sku: 'TB-007',
        nameRu: 'RIFLE AK',
        nameEn: 'RIFLE AK',
        nameUz: 'RIFLE AK',
        slug: 'rifle-ak',
        descriptionRu: 'Игрушечная винтовка AK для детей от 3 лет. Реалистичный дизайн, безопасные материалы.',
        descriptionEn: 'Toy AK rifle for children from 3 years. Realistic design, safe materials.',
        descriptionUz: '3 yoshdan boshlab bolalar uchun oʻyinchoq AK miltiq. Realistik dizayn, xavfsiz materiallar.',
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
        descriptionRu: 'Легендарный танк T34 в миниатюре. Детализированная модель с подвижными элементами.',
        descriptionEn: 'Legendary T34 tank in miniature. Detailed model with moving parts.',
        descriptionUz: 'Miniatyurada afsonaviy T34 tanki. Harakatlanuvchi qismlari bilan batafsil model.',
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

    // Строительная техника
    prisma.product.upsert({
      where: { sku: 'TB-015' },
      update: {},
      create: {
        sku: 'TB-015',
        nameRu: 'EXCAVATOR PRO',
        nameEn: 'EXCAVATOR PRO',
        nameUz: 'EXCAVATOR PRO',
        slug: 'excavator-pro',
        descriptionRu: 'Игрушечный экскаватор с подвижной стрелой и ковшом.',
        descriptionEn: 'Toy excavator with movable arm and bucket.',
        descriptionUz: 'Harakatlanuvchi strela va kovshli oʻyinchoq ekskavator.',
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
      where: { sku: 'TB-016' },
      update: {},
      create: {
        sku: 'TB-016',
        nameRu: 'DUMP TRUCK MAX',
        nameEn: 'DUMP TRUCK MAX',
        nameUz: 'DUMP TRUCK MAX',
        slug: 'dump-truck-max',
        descriptionRu: 'Самосвал с поднимающимся кузовом. Прочная конструкция.',
        descriptionEn: 'Dump truck with lifting body. Durable construction.',
        descriptionUz: 'Koʻtariladigan kuzovli samosval. Chidamli konstruktsiya.',
        subcategoryId: constructionSubcat.id,
        dimensions: '40x15x20 см',
        weightKg: 1.8,
        recommendedAge: '3+',
        material: 'ABS-пластик',
        packagingType: 'Цветная коробка',
        moq: 50,
        priceMinUsd: 11.00,
        priceMaxUsd: 16.00,
        availability: 'in_stock',
      },
    }),

    // Наборы принцесс
    prisma.product.upsert({
      where: { sku: 'TB-101' },
      update: {},
      create: {
        sku: 'TB-101',
        nameRu: 'Замок принцессы',
        nameEn: 'Princess Castle',
        nameUz: 'Malika qalʼasi',
        slug: 'princess-castle',
        descriptionRu: 'Большой игровой набор с замком, мебелью и аксессуарами.',
        descriptionEn: 'Large play set with castle, furniture and accessories.',
        descriptionUz: 'Qalʼa, mebel va aksessuarlar bilan katta oʻyin toʻplami.',
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
      where: { sku: 'TB-102' },
      update: {},
      create: {
        sku: 'TB-102',
        nameRu: 'Карета принцессы',
        nameEn: 'Princess Carriage',
        nameUz: 'Malika aravachasi',
        slug: 'princess-carriage',
        descriptionRu: 'Сказочная карета с лошадьми и куклой принцессы.',
        descriptionEn: 'Fairy-tale carriage with horses and princess doll.',
        descriptionUz: 'Otlar va malika qoʻgʻirchogʻi bilan ertak aravachasi.',
        subcategoryId: princessSubcat.id,
        dimensions: '45x25x35 см',
        weightKg: 2.2,
        recommendedAge: '3+',
        material: 'ABS-пластик, текстиль',
        packagingType: 'Цветная коробка',
        moq: 30,
        priceMinUsd: 25.00,
        priceMaxUsd: 32.00,
        availability: 'low_stock',
      },
    }),

    // Песочные наборы
    prisma.product.upsert({
      where: { sku: 'TB-201' },
      update: {},
      create: {
        sku: 'TB-201',
        nameRu: 'Песочный набор "Замок"',
        nameEn: 'Sandbox Set "Castle"',
        nameUz: 'Qumdon toʻplami "Qalʼa"',
        slug: 'sandbox-castle',
        descriptionRu: 'Набор формочек для строительства песочных замков. 12 предметов.',
        descriptionEn: 'Mold set for building sand castles. 12 pieces.',
        descriptionUz: 'Qum qalʼalari qurish uchun forma toʻplami. 12 ta buyum.',
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
    prisma.product.upsert({
      where: { sku: 'TB-202' },
      update: {},
      create: {
        sku: 'TB-202',
        nameRu: 'Набор "Юный строитель"',
        nameEn: 'Set "Young Builder"',
        nameUz: 'Toʻplam "Yosh quruvchi"',
        slug: 'young-builder',
        descriptionRu: 'Набор инструментов и формочек для песочницы. 15 предметов.',
        descriptionEn: 'Tool and mold set for sandbox. 15 pieces.',
        descriptionUz: 'Qumdon uchun asboblar va formalar toʻplami. 15 ta buyum.',
        subcategoryId: sandboxSubcat.id,
        dimensions: '35x28x18 см',
        weightKg: 0.8,
        recommendedAge: '3+',
        material: 'PP-пластик',
        packagingType: 'Ведро с ручкой',
        moq: 80,
        priceMinUsd: 7.00,
        priceMaxUsd: 9.50,
        availability: 'in_stock',
      },
    }),
  ]);

  console.log('✅ Products created');

  // ============================================
  // Создаем изображения для продуктов
  // ============================================
  const createdProducts = await prisma.product.findMany();
  
  for (const product of createdProducts) {
    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl: `/images/products/${product.sku.toLowerCase()}-1.jpg`,
        altText: `${product.nameRu} - основное изображение`,
        isPrimary: true,
        sortOrder: 0,
      },
    });
    
    // Добавляем второе изображение для некоторых продуктов
    if (['TB-007', 'TB-008', 'TB-101'].includes(product.sku)) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: `/images/products/${product.sku.toLowerCase()}-2.jpg`,
          altText: `${product.nameRu} - дополнительный вид`,
          isPrimary: false,
          sortOrder: 1,
        },
      });
    }
  }

  console.log('✅ Product images created');

  // ============================================
  // Создаем атрибуты для продуктов
  // ============================================
  const rifle = await prisma.product.findFirst({ where: { sku: 'TB-007' } });
  if (rifle) {
    await prisma.productAttribute.createMany({
      data: [
        { productId: rifle.id, attributeName: 'color', attributeValue: 'Black/Green' },
        { productId: rifle.id, attributeName: 'batteries', attributeValue: 'Not required' },
        { productId: rifle.id, attributeName: 'sound_effects', attributeValue: 'No' },
      ],
    });
  }

  const tank = await prisma.product.findFirst({ where: { sku: 'TB-008' } });
  if (tank) {
    await prisma.productAttribute.createMany({
      data: [
        { productId: tank.id, attributeName: 'color', attributeValue: 'Green' },
        { productId: tank.id, attributeName: 'moving_parts', attributeValue: 'Turret, tracks' },
        { productId: tank.id, attributeName: 'scale', attributeValue: '1:32' },
      ],
    });
  }

  console.log('✅ Product attributes created');

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
