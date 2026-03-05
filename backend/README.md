# Toybola Backend API

Backend для B2B каталога Toybola на NestJS.

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

```bash
cp .env.example .env
```

Отредактируйте `.env` и укажите ваши параметры базы данных.

### 3. Запуск базы данных (Docker)

```bash
# Из корня проекта
docker-compose up -d
```

### 4. Миграции и seed

```bash
# Генерация Prisma клиента
npx prisma generate

# Применение миграций
npx prisma migrate dev --name init

# Seed данных (тестовые продукты)
npx prisma db seed
```

### 5. Запуск разработки

```bash
npm run start:dev
```

API доступно на: `http://localhost:3000`

## 📚 API Documentation

Swagger документация: `http://localhost:3000/api/docs`

### Основные endpoints

#### Public API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/v1/products` | Список продуктов с фильтрами |
| GET | `/api/v1/products/:slug` | Детали продукта по slug |
| GET | `/api/v1/products/sku/:sku` | Поиск по SKU |
| GET | `/api/v1/categories` | Список категорий |
| GET | `/api/v1/categories/:slug` | Категория с подкатегориями |

#### Admin API (требуется авторизация)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/api/v1/auth/login` | Вход администратора |
| GET | `/api/v1/admin/products` | Список продуктов |
| POST | `/api/v1/admin/products` | Создать продукт |
| PUT | `/api/v1/admin/products/:id` | Обновить продукт |
| DELETE | `/api/v1/admin/products/:id` | Удалить продукт |
| POST | `/api/v1/import/excel` | Импорт Excel |

## 🔐 Авторизация

### Вход

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@toybola.com",
  "password": "admin123"
}
```

### Использование токена

Добавьте заголовок к запросам:
```
Authorization: Bearer <your-token>
```

## 📦 Импорт Excel

Формат файла:

| sku | name_ru | name_en | category | subcategory | description_ru | age | material | weight_kg | dimensions | packaging | moq | price_min_usd | price_max_usd |
|-----|---------|---------|----------|-------------|----------------|-----|----------|-----------|------------|-----------|-----|---------------|---------------|
| TB-007 | RIFLE AK | RIFLE AK | Транспорт | Военная техника | Описание | 3+ | ABS | 0.8 | 45x15x10 | Коробка | 100 | 5.50 | 8.00 |

### Загрузка через API

```bash
POST /api/v1/import/excel
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <excel-file>
updateExisting: true
createCategories: true
```

## 🗄️ База данных

### Prisma Studio (UI для БД)

```bash
npx prisma studio
```

Откроется на `http://localhost:5555`

### Создание миграций

```bash
npx prisma migrate dev --name <migration-name>
```

### Сброс базы данных

```bash
npx prisma migrate reset
```

## 🧪 Тесты

```bash
# Unit тесты
npm run test

# E2E тесты
npm run test:e2e

# Покрытие
npm run test:cov
```

## 📁 Структура проекта

```
src/
├── admin/           # Admin panel API
├── auth/            # Authentication (JWT)
├── categories/      # Categories module
├── import/          # Excel import
├── prisma/          # Prisma service
├── products/        # Products module
├── utils/           # Utilities
├── app.module.ts
└── main.ts
```

## 🔧 Команды

| Команда | Описание |
|---------|----------|
| `npm run start` | Запуск продакшена |
| `npm run start:dev` | Запуск разработки с watch |
| `npm run start:debug` | Запуск с отладкой |
| `npm run build` | Сборка проекта |
| `npm run lint` | Линтинг |
| `npm run prisma:generate` | Генерация Prisma клиента |
| `npm run prisma:migrate` | Применение миграций |
| `npm run prisma:seed` | Seed данных |
| `npm run prisma:studio` | Prisma Studio UI |

## 📝 Тестовые учетные данные

- **Email:** `admin@toybola.com`
- **Пароль:** `admin123`

## 🚨 Troubleshooting

### Ошибка подключения к БД

Убедитесь, что Docker контейнер запущен:
```bash
docker-compose ps
```

### Ошибка миграций

Сбросьте базу и примените миграции заново:
```bash
npx prisma migrate reset
```

### Порт 3000 занят

Измените порт в `.env`:
```
PORT=3001
```
