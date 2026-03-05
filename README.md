# 🧸 Toybola B2B Catalog Platform

**Современная B2B платформа для каталога продукции Toybola**

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js)](https://vuejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-E0234E?logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)](https://www.postgresql.org/)

---

## 📋 Описание

Единая платформа для:
- ✅ Презентации бренда Toybola
- ✅ Масштабируемого каталога продукции (10,000+ товаров)
- ✅ Управления каталогом через Excel для нетехнического персонала
- ✅ B2B-клиентов и дистрибьюторов
- ✅ Мультиязычности (RU/EN/UZ)

---

## 🚀 Быстрый старт

### Требования
- Node.js 20+
- Docker + Docker Compose
- npm или pnpm

### Установка

```bash
# 1. Клонирование репозитория
git clone https://github.com/ski2ly/toybola-website.git
cd toybola-website

# 2. Запуск базы данных
docker-compose up -d

# 3. Установка зависимостей
cd backend && npm install
cd ../frontend && npm install

# 4. Миграции базы данных
cd backend
npx prisma migrate dev
npx prisma db seed

# 5. Запуск разработки
# Backend (порт 3000)
cd backend && npm run start:dev

# Frontend (порт 5173)
cd frontend && npm run dev
```

### 📍 После запуска

| Сервис | URL |
|--------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:3000 |
| **Swagger Docs** | http://localhost:3000/api/docs |
| **Prisma Studio** | http://localhost:5555 |

---

## 🔐 Учетные данные

### Админ-панель
- **URL:** http://localhost:5173/admin/login
- **Email:** `admin@toybola.com`
- **Пароль:** `admin123`

### База данных (PostgreSQL)
- **Host:** localhost
- **Port:** 5432
- **Database:** toybola_db
- **User:** toybola_user
- **Password:** toybola_pass

---

## 🏗️ Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend (Vue 3)              Backend (NestJS)             │
│  ┌─────────────────┐           ┌─────────────────┐          │
│  │  Vue 3 + Vite   │ ◄───────► │  NestJS + JWT   │          │
│  │  Pinia + Router │   REST    │  Prisma ORM     │          │
│  │  TailwindCSS    │   API     │  Excel Import   │          │
│  └─────────────────┘           └────────┬────────┘          │
│                                         │                    │
│                                         ▼                    │
│                                  ┌─────────────────┐         │
│                                  │   PostgreSQL    │         │
│                                  │   + Redis       │         │
│                                  └─────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Структура проекта

```
toybola-website/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── admin/          # Admin endpoints
│   │   ├── auth/           # JWT authentication
│   │   ├── categories/     # Categories API
│   │   ├── import/         # Excel import
│   │   ├── products/       # Products API
│   │   └── prisma/         # Database service
│   ├── prisma/
│   │   ├── schema.prisma   # DB schema
│   │   ├── migrations/     # DB migrations
│   │   └── seed.ts         # Seed data
│   └── uploads/            # Uploaded files
│
├── frontend/               # Vue 3 application
│   ├── src/
│   │   ├── components/
│   │   │   ├── catalog/    # Catalog components
│   │   │   └── common/     # Shared components
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/      # Admin pages
│   │   │   └── ...         # Public pages
│   │   ├── router/
│   │   ├── services/       # API services
│   │   ├── stores/         # Pinia stores
│   │   └── main.js
│   └── public/
│
├── docker-compose.yml      # Docker configuration
└── README.md
```

---

## 🔧 Технологический стек

### Frontend
| Технология | Версия | Назначение |
|------------|--------|------------|
| **Vue 3** | 3.4 | UI фреймворк |
| **Vite** | 5.0 | Сборка |
| **Pinia** | 2.1 | State management |
| **Vue Router** | 4.2 | Навигация |
| **TailwindCSS** | 3.4 | Стили |
| **Axios** | 1.6 | HTTP клиент |

### Backend
| Технология | Версия | Назначение |
|------------|--------|------------|
| **NestJS** | 10.3 | Фреймворк |
| **TypeScript** | 5.3 | Типизация |
| **Prisma** | 5.8 | ORM |
| **PostgreSQL** | 15 | База данных |
| **Redis** | 7 | Кеширование |
| **exceljs** | 4.4 | Импорт Excel |
| **bcrypt** | 5.1 | Хеширование |
| **JWT** | 10.2 | Авторизация |

---

## 📊 API Endpoints

### Public API (без авторизации)

```
GET    /api/v1/products              # Список продуктов с фильтрами
GET    /api/v1/products/:slug        # Продукт по slug
GET    /api/v1/products/sku/:sku     # Поиск по SKU
GET    /api/v1/categories            # Список категорий
GET    /api/v1/categories/:slug      # Категория с подкатегориями
```

### Admin API (требуется JWT)

```
POST   /api/v1/auth/login            # Вход
GET    /api/v1/admin/products        # Список продуктов
POST   /api/v1/admin/products        # Создать продукт
PUT    /api/v1/admin/products/:id    # Обновить продукт
DELETE /api/v1/admin/products/:id    # Удалить продукт
POST   /api/v1/import/excel          # Импорт Excel
GET    /api/v1/import/logs           # Логи импортов
```

---

## 📦 Импорт Excel

### Формат файла

| Колонка | Обяз. | Пример |
|---------|-------|--------|
| `sku` | ✅ | TB-007 |
| `name_ru` | ✅ | RIFLE AK |
| `name_en` | ✅ | RIFLE AK |
| `category` | ✅ | Транспорт |
| `subcategory` | ✅ | Военная техника |
| `description_ru` | ❌ | Описание |
| `age` | ❌ | 3+ |
| `material` | ❌ | ABS-пластик |
| `weight_kg` | ❌ | 0.8 |
| `moq` | ❌ | 100 |
| `price_min_usd` | ❌ | 5.50 |

### Логика работы

1. **Загрузка** через админ-панель
2. **Парсинг** Excel файла
3. **Поиск** продукта по SKU
4. **Обновление** если существует / **Создание** если новый
5. **Отчет** с количеством ошибок и успехов

---

## 🗄️ База данных

### Схема

```
categories (1) ──< (N) subcategories
                        │
                        │ (1)
                        │
                        ▼
                     (N) products
                        │
            ┌───────────┼───────────┐
            │           │           │
            ▼           ▼           ▼
       product_     product_    import_
       images       attributes   logs
```

### Основные таблицы

| Таблица | Описание |
|---------|----------|
| `categories` | Категории товаров |
| `subcategories` | Подкатегории |
| `products` | Продукты |
| `product_images` | Изображения |
| `product_attributes` | Характеристики |
| `admin_users` | Пользователи админки |
| `import_logs` | История импортов |

---

## 🎨 Компоненты Frontend

### Каталог
- `ProductCard.vue` — Карточка товара
- `ProductGrid.vue` — Сетка товаров
- `FilterPanel.vue` — Панель фильтров
- `Pagination.vue` — Пагинация

### Общие
- `Header.vue` — Шапка сайта
- `Footer.vue` — Подвал сайта

### Админка
- `Dashboard.vue` — Главная панель
- `Products.vue` — Управление продуктами
- `ImportExcel.vue` — Импорт Excel
- `Login.vue` — Вход

---

## 📝 Страницы сайта

### Публичные
- `/` — Главная (видео фон, каталог, форма связи)
- `/about` — О компании (слайдер ценностей, сертификаты)
- `/catalog` — Каталог (фильтры, пагинация)
- `/product/:slug` — Страница продукта
- `/contacts` — Контакты (форма, карта)
- `/terms` — Условия использования
- `/privacy` — Политика конфиденциальности

### Админ-панель
- `/admin` — Dashboard
- `/admin/products` — Продукты
- `/admin/products/import` — Импорт Excel
- `/admin/categories` — Категории

---

## 🧪 Тестирование

```bash
# Backend
cd backend
npm run test          # Unit тесты
npm run test:e2e      # E2E тесты
npm run test:cov      # Покрытие

# Frontend
cd frontend
npm run lint          # ESLint
```

---

## 📈 Roadmap

### Завершено ✅
- [x] Архитектура и проектирование
- [x] База данных и миграции
- [x] Backend API (Products, Categories, Auth)
- [x] Excel Import система
- [x] Frontend каталог
- [x] Admin панель
- [x] Страница "О компании" со слайдером
- [x] Страница "Контакты"
- [x] Страницы "Условия использования" и "Политика конфиденциальности"
- [x] Модальное окно заявки на работу

### В планах 🔜
- [ ] Загрузка изображений через админку
- [ ] Экспорт каталога (PDF/XLSX)
- [ ] Email уведомления
- [ ] SEO оптимизация
- [ ] Production деплой
- [ ] Интерактивная карта на странице контактов

---

## 🚨 Troubleshooting

### Ошибка подключения к БД

```bash
docker-compose ps          # Проверка статуса
docker-compose logs postgres  # Логи
docker-compose restart postgres
```

### Ошибка миграций Prisma

```bash
cd backend
npx prisma migrate reset   # Сброс
npx prisma migrate dev     # Повтор
npx prisma db seed         # Seed
```

### Порт занят

Измените в `.env` или `docker-compose.yml`

---

## 📞 Поддержка

- **API Docs:** http://localhost:3000/api/docs
- **Backend README:** `/backend/README.md`
- **Quick Start:** `/QUICKSTART.md`

---

## 📝 License

Copyright © 2025 Toybola. Все права защищены.

---

## 🔄 История изменений

### 2025-03-05
- ✅ Полное обновление страницы "О компании"
- ✅ Добавлен слайдер "Наши ценности" с drag-навигацией
- ✅ Добавлено модальное окно заявки на работу
- ✅ Обновлена страница "Контакты" с новой формой
- ✅ Добавлены страницы "Условия использования" и "Политика конфиденциальности"
- ✅ Обновлены все иконки на SVG
- ✅ Добавлен видео фон на главную страницу
- ✅ Обновлены контакты в Footer

### 2025-03-04
- ✅ Создан проект с нуля
- ✅ Настроена архитектура NestJS + Vue 3
- ✅ Реализован Excel импорт
- ✅ Создана админ-панель
