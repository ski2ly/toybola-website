#!/bin/bash

# Toybola B2B Catalog - Setup Script
# Автоматическая настройка проекта

echo "🚀 Toybola B2B Catalog - Настройка проекта"
echo "=========================================="

# Проверка Docker
echo ""
echo "📦 Проверка Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не найден. Установите Docker Desktop."
    exit 1
fi
echo "✅ Docker найден"

# Проверка Node.js
echo ""
echo "🟢 Проверка Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js 20+."
    exit 1
fi
NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION"

# Создание .env файлов если не существуют
echo ""
echo "⚙️  Настройка переменных окружения..."
if [ ! -f "backend/.env" ]; then
  cp backend/.env.example backend/.env
  echo "✅ Создан backend/.env (заполните значения перед production!)"
else
  echo "ℹ️  backend/.env уже существует"
fi

if [ ! -f "frontend/.env" ]; then
  cp frontend/.env.example frontend/.env
  echo "✅ Создан frontend/.env"
else
  echo "ℹ️  frontend/.env уже существует"
fi

# Запуск Docker контейнеров
echo ""
echo "🐳 Запуск Docker контейнеров..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ Ошибка запуска Docker"
    exit 1
fi
echo "✅ Docker контейнеры запущены"

# Ожидание готовности PostgreSQL
echo ""
echo "⏳ Ожидание готовности PostgreSQL..."
for i in $(seq 1 30); do
    if docker exec toybola-postgres pg_isready -U toybola_user -d toybola_db > /dev/null 2>&1; then
        echo "✅ PostgreSQL готов"
        break
    fi
    echo "⏳ Ожидание PostgreSQL... ($i/30)"
    sleep 2
done

# Установка зависимостей Backend
echo ""
echo "📦 Установка зависимостей Backend..."
cd backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей Backend"
    exit 1
fi

# Генерация Prisma клиента
echo ""
echo "🔧 Генерация Prisma клиента..."
npx prisma generate

# Применение миграций
echo ""
echo "🗄️ Применение миграций..."
if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
    npx prisma migrate dev --name init
else
    npx prisma migrate deploy
fi

# Seed данных
echo ""
echo "🌱 Seed данных..."
npx prisma db seed

cd ..

# Установка зависимостей Frontend
echo ""
echo "📦 Установка зависимостей Frontend..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей Frontend"
    exit 1
fi

cd ..

echo ""
echo "=========================================="
echo "✅ Настройка завершена!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend:  http://localhost:3000"
echo "📍 Swagger:  http://localhost:3000/api/docs"
echo ""
echo "🔐 Админ-панель:"
echo "   Email: admin@toybola.com"
echo "   Password: значение ADMIN_PASSWORD из backend/.env"
echo ""
echo "🚀 Для запуска выполните:"
echo "   cd backend && npm run start:dev"
echo "   cd frontend && npm run dev"
echo "=========================================="
