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

  // ============================================
  // Создаем блоки страниц (Page Builder)
  // ============================================

  // Главная страница (home)
  await prisma.pageBlock.createMany({
    data: [
      {
        page: 'home',
        blockType: 'hero',
        title: 'Hero секция',
        isEnabled: true,
        order: 1,
        bgColor: 'gradient',
        paddingTop: 'none',
        paddingBottom: 'none',
        content: JSON.stringify({
          title: { ru: 'Игрушки от производителя', en: 'Toys from manufacturer', uz: 'Ishlab chiqaruvchidan oʻyinchoqlar' },
          subtitle: { ru: 'Крупнейший производитель игрушек в Центральной Азии', en: 'Largest toy manufacturer in Central Asia', uz: 'Markaziy Osiyodagi eng yirik oʻyinchoqlar ishlab chiqaruvchisi' },
          backgroundImage: '/images/backgrounds/background.svg',
          buttons: [
            { text: { ru: 'В каталог', en: 'To catalog', uz: 'Katalogga' }, url: '/catalog', variant: 'primary' },
            { text: { ru: 'О компании', en: 'About us', uz: 'Kompaniya haqida' }, url: '/about', variant: 'secondary' }
          ]
        })
      },
      {
        page: 'home',
        blockType: 'stats',
        title: 'Статистика',
        isEnabled: true,
        order: 2,
        bgColor: 'gradient',
        paddingTop: 'lg',
        paddingBottom: 'lg',
        content: JSON.stringify({
          stats: [
            { value: 15, suffix: '+', label: { ru: 'лет на рынке', en: 'years on market', uz: 'bozorda yil' } },
            { value: 71, suffix: 'M+', label: { ru: 'игрушек произведено', en: 'toys produced', uz: 'ishlab chiqarilgan oʻyinchoqlar' } },
            { value: 1000, suffix: '+', label: { ru: 'сотрудников', en: 'employees', uz: 'xodimlar' } },
            { value: 12, suffix: '', label: { ru: 'стран экспорта', en: 'export countries', uz: 'eksport mamlakatlari' } }
          ]
        })
      },
      {
        page: 'home',
        blockType: 'partners',
        title: 'Наши партнеры',
        isEnabled: true,
        order: 3,
        bgColor: 'gradient',
        paddingTop: 'lg',
        paddingBottom: 'lg',
        content: JSON.stringify({
          title: { ru: 'Наши партнеры', en: 'Our partners', uz: 'Bizning hamkorlar' },
          subtitle: { ru: 'Мы сотрудничаем с ведущими компаниями по всему миру', en: 'We cooperate with leading companies worldwide', uz: 'Biz butun dunyo boʻylab yetakchi kompaniyalar bilan hamkorlik qilamiz' }
        })
      },
      {
        page: 'home',
        blockType: 'factory',
        title: 'Производство',
        isEnabled: true,
        order: 4,
        bgColor: 'alternate',
        paddingTop: 'xl',
        paddingBottom: 'xl',
        content: JSON.stringify({
          title: { ru: 'Производство мирового уровня', en: 'World-class production', uz: 'Jahon darajasidagi ishlab chiqarish' },
          description: { ru: 'Toybola — крупнейший производитель игрушек в Центральной Азии', en: 'Toybola is the largest toy manufacturer in Central Asia', uz: 'Toybola Markaziy Osiyodagi eng yirik oʻyinchoqlar ishlab chiqaruvchisi' },
          features: [
            { title: { ru: 'Современное производство', en: 'Modern production', uz: 'Zamonaviy ishlab chiqarish' }, description: { ru: 'Передовые технологии и автоматизированные линии', en: 'Advanced technologies and automated lines', uz: 'Zamonaviy texnologiyalar va avtomatlashtirilgan liniyalar' } },
            { title: { ru: 'Контроль качества', en: 'Quality control', uz: 'Sifat nazorati' }, description: { ru: 'Многоступенчатая система проверки каждой игрушки', en: 'Multi-level inspection system for each toy', uz: 'Har bir oʻyinchoqni koʻp bosqichli tekshirish tizimi' } },
            { title: { ru: 'Безопасные материалы', en: 'Safe materials', uz: 'Xavfsiz materiallar' }, description: { ru: 'Только сертифицированные и экологичные материалы', en: 'Only certified and eco-friendly materials', uz: 'Faqat sertifikatlangan va ekologik toza materiallar' } },
            { title: { ru: 'Собственный дизайн', en: 'Original design', uz: 'Original dizayn' }, description: { ru: 'Уникальные разработки и кастомизация продукции', en: 'Unique developments and product customization', uz: 'Nozik ishlanmalar va mahsulotlarni sozlash' } }
          ]
        })
      },
      {
        page: 'home',
        blockType: 'export',
        title: 'География экспорта',
        isEnabled: true,
        order: 5,
        bgColor: 'gradient',
        paddingTop: 'xl',
        paddingBottom: 'xl',
        content: JSON.stringify({
          title: { ru: 'География экспорта', en: 'Export geography', uz: 'Eksport geografiyasi' },
          subtitle: { ru: 'Наша продукция представлена в 12 странах мира', en: 'Our products are available in 12 countries', uz: 'Bizning mahsulotlarimiz 12 mamlakatda mavjud' },
          countries: [
            { name: 'Казахстан', flag: '🇰🇿', count: '2.5M+' },
            { name: 'Россия', flag: '🇷🇺', count: '15M+' },
            { name: 'Узбекистан', flag: '🇺🇿', count: '8M+' },
            { name: 'Кыргызстан', flag: '🇰🇬', count: '1.2M+' },
            { name: 'Таджикистан', flag: '🇹🇯', count: '900K+' },
            { name: 'Туркменистан', flag: '🇹🇲', count: '600K+' },
            { name: 'Азербайджан', flag: '🇦🇿', count: '1.8M+' },
            { name: 'Грузия', flag: '🇬🇪', count: '700K+' },
            { name: 'Армения', flag: '🇦🇲', count: '500K+' },
            { name: 'Беларусь', flag: '🇧🇾', count: '2M+' },
            { name: 'Польша', flag: '🇵🇱', count: '3M+' },
            { name: 'Германия', flag: '🇩🇪', count: '5M+' }
          ]
        })
      },
      {
        page: 'home',
        blockType: 'contact_form',
        title: 'Контактная форма',
        isEnabled: true,
        order: 6,
        bgColor: 'gradient',
        paddingTop: 'xl',
        paddingBottom: 'xl',
        content: JSON.stringify({
          title: { ru: 'Свяжитесь с нами', en: 'Contact us', uz: 'Biz bilan bogʻlaning' },
          subtitle: { ru: 'Заполните форму и мы свяжемся с вами в ближайшее время', en: 'Fill out the form and we will contact you soon', uz: 'Formani toʻldiring va biz tez orada siz bilan bogʻlaymiz' }
        })
      }
    ],
  });

  console.log('✅ Page blocks created');

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
