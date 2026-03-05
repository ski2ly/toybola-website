# Toybola B2B Catalog - Quick Start Guide

## 🚀 Быстрый старт за 5 минут

### Шаг 1: Запуск базы данных

```bash
# Из корня проекта
docker-compose up -d

# Проверка статуса
docker-compose ps
```

### Шаг 2: Установка зависимостей

```bash
# Backend
cd backend
npm install

# Frontend (в новом терминале)
cd frontend
npm install
```

### Шаг 3: Настройка переменных окружения

```bash
# Backend (уже настроен по умолчанию)
cd backend
# Файл .env уже создан с тестовыми параметрами

# Frontend (уже настроен по умолчанию)
cd frontend
# Файл .env уже создан
```

### Шаг 4: Инициализация базы данных

```bash
cd backend

# Генерация Prisma клиента
npx prisma generate

# Применение миграций и seed данных
npx prisma migrate dev --name init
npx prisma db seed
```

### Шаг 5: Запуск приложения

```bash
# Терминал 1 - Backend (порт 3000)
cd backend
npm run start:dev

# Терминал 2 - Frontend (порт 5173)
cd frontend
npm run dev
```

### Шаг 6: Открытие приложения

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs
- **Prisma Studio:** http://localhost:5555 (опционально)

---

## 🔐 Тестовые учетные данные

### Админ-панель
- **Email:** `admin@toybola.com`
- **Пароль:** `admin123`

### База данных (PostgreSQL)
- **Host:** localhost
- **Port:** 5432
- **Database:** toybola_db
- **User:** toybola_user
- **Password:** toybola_pass

---

## 📁 Структура проекта

```
toybola-website/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── admin/       # Admin endpoints
│   │   ├── auth/        # Authentication
│   │   ├── categories/  # Categories API
│   │   ├── import/      # Excel import
│   │   ├── products/    # Products API
│   │   └── prisma/      # Database
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── uploads/         # Uploaded files
│
├── frontend/            # Vue 3 application
│   ├── src/
│   │   ├── components/
│   │   │   ├── catalog/
│   │   │   └── common/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── ...
│   │   ├── services/
│   │   ├── stores/
│   │   └── router/
│   └── public/
│
├── docker-compose.yml   # Docker configuration
└── README.md           # Этот файл
```

---

## 📊 API Endpoints

### Public API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/v1/products` | Список продуктов |
| GET | `/api/v1/products/:slug` | Продукт по slug |
| GET | `/api/v1/products/sku/:sku` | Поиск по SKU |
| GET | `/api/v1/categories` | Список категорий |

### Admin API (требуется авторизация)

| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/api/v1/auth/login` | Вход |
| GET | `/api/v1/admin/products` | Список продуктов |
| POST | `/api/v1/admin/products` | Создать продукт |
| POST | `/api/v1/import/excel` | Импорт Excel |

---

## 📦 Импорт Excel

### Формат файла

| Колонка | Обязательно | Пример |
|---------|-------------|--------|
| sku | ✅ | TB-007 |
| name_ru | ✅ | RIFLE AK |
| name_en | ✅ | RIFLE AK |
| category | ✅ | Транспорт |
| subcategory | ✅ | Военная техника |
| description_ru | ❌ | Описание |
| age | ❌ | 3+ |
| material | ❌ | ABS-пластик |
| weight_kg | ❌ | 0.8 |
| dimensions | ❌ | 45x15x10 см |
| packaging | ❌ | Цветная коробка |
| moq | ❌ | 100 |
| price_min_usd | ❌ | 5.50 |
| price_max_usd | ❌ | 8.00 |

### Как использовать:

1. Войдите в админ-панель: http://localhost:5173/admin/login
2. Перейдите в "Импорт Excel"
3. Загрузите файл .xlsx
4. Выберите опции:
   - ☐ Обновлять существующие продукты
   - ☐ Создавать новые категории
5. Нажмите "Начать импорт"

---

## 🛠️ Полезные команды

### Backend

```bash
cd backend

# Запуск разработки
npm run start:dev

# Сборка
npm run build

# Тесты
npm run test

# Prisma Studio (UI для БД)
npx prisma studio

# Сброс базы данных
npx prisma migrate reset
```

### Frontend

```bash
cd frontend

# Запуск разработки
npm run dev

# Сборка
npm run build

# Preview сборки
npm run preview

# Lint
npm run lint
```

### Docker

```bash
# Запуск всех сервисов
docker-compose up -d

# Остановка
docker-compose down

# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Удаление volumes (очистка БД)
docker-compose down -v
```

---

## 🚨 Troubleshooting

### Ошибка подключения к БД

```bash
# Проверьте, что контейнер запущен
docker-compose ps

# Если нет - запустите
docker-compose up -d

# Проверьте логи
docker-compose logs postgres
```

### Порт занят

Измените порт в соответствующем файле:
- Backend: `backend/.env` → `PORT=3001`
- Frontend: `frontend/vite.config.js` → `port: 5174`

### Ошибка миграций Prisma

```bash
cd backend

# Сброс и повторная миграция
npx prisma migrate reset
npx prisma migrate dev
npx prisma db seed
```

### Ошибка CORS

Убедитесь, что backend и frontend запущены на портах 3000 и 5173 соответственно,
или обновите настройки CORS в `backend/src/main.ts`.

---

## 📈 Следующие шаги

После запуска:

1. **Проверьте каталог:** http://localhost:5173/catalog
2. **Войдите в админку:** http://localhost:5173/admin/login
3. **Импортируйте тестовые данные:** через админ-панель
4. **Изучите API:** http://localhost:3000/api/docs

---

## 📞 Поддержка

Вопросы и предложения: `support@toybola.com`
