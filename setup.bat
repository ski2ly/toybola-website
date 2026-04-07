@echo off
REM Toybola B2B Catalog - Setup Script for Windows
REM Автоматическая настройка проекта

echo.
echo 🚀 Toybola B2B Catalog - Настройка проекта
echo ==========================================

REM Проверка Docker
echo.
echo 📦 Проверка Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker не найден. Установите Docker Desktop.
    exit /b 1
)
echo ✅ Docker найден

REM Проверка Node.js
echo.
echo 🟢 Проверка Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не найден. Установите Node.js 20+.
    exit /b 1
)
echo ✅ Node.js найден

REM Создание .env файлов если не существуют
echo.
echo ⚙️  Настройка переменных окружения...
if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✅ Создан backend/.env (заполните значения перед production!)
) else (
    echo ℹ️  backend/.env уже существует
)

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo ✅ Создан frontend/.env
) else (
    echo ℹ️  frontend/.env уже существует
)

REM Запуск Docker контейнеров
echo.
echo 🐳 Запуск Docker контейнеров...
docker-compose up -d

if errorlevel 1 (
    echo ❌ Ошибка запуска Docker
    exit /b 1
)
echo ✅ Docker контейнеры запущены

REM Ожидание готовности PostgreSQL
echo.
echo ⏳ Ожидание готовности PostgreSQL...
timeout /t 5 /nobreak >nul

REM Установка зависимостей Backend
echo.
echo 📦 Установка зависимостей Backend...
cd backend
call npm install

if errorlevel 1 (
    echo ❌ Ошибка установки зависимостей Backend
    exit /b 1
)

REM Генерация Prisma клиента
echo.
echo 🔧 Генерация Prisma клиента...
call npx prisma generate

REM Применение миграций
echo.
echo 🗄️ Применение миграций...
if not exist "prisma\migrations" (
    call npx prisma migrate dev --name init
) else (
    call npx prisma migrate deploy
)

REM Seed данных
echo.
echo 🌱 Seed данных...
call npx prisma db seed

cd ..

REM Установка зависимостей Frontend
echo.
echo 📦 Установка зависимостей Frontend...
cd frontend
call npm install

if errorlevel 1 (
    echo ❌ Ошибка установки зависимостей Frontend
    exit /b 1
)

cd ..

echo.
echo ==========================================
echo ✅ Настройка завершена!
echo.
echo 📍 Frontend: http://localhost:5173
echo 📍 Backend:  http://localhost:3000
echo 📍 Swagger:  http://localhost:3000/api/docs
echo.
echo 🔐 Админ-панель:
echo    Email: admin@toybola.com
echo    Password: значение ADMIN_PASSWORD из backend/.env
echo.
echo 🚀 Для запуска выполните:
echo    cd backend ^&^& npm run start:dev
echo    cd frontend ^&^& npm run dev
echo ==========================================

pause
