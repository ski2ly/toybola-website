# 📁 Структура папок для изображений

## Куда загружать файлы

### 1. Логотипы
**Папка:** `frontend/public/images/logo/`

| Файл | Описание | Размер (рекомендуемый) |
|------|----------|------------------------|
| `logo-full.svg` | Полный логотип Toybola | 200x50 px |
| `logo-full.png` | Полный логотип (PNG) | 200x50 px |
| `logo-toy.svg` | Часть "Toy" | 100x50 px |
| `logo-toy.png` | Часть "Toy" (PNG) | 100x50 px |
| `logo-bola.svg` | Часть "Bola" | 100x50 px |
| `logo-bola.png` | Часть "Bola" (PNG) | 100x50 px |
| `favicon.ico` | Иконка для браузера | 32x32 px |

### 2. Фоны (Backgrounds)
**Папка:** `frontend/public/images/backgrounds/`

| Файл | Описание | Размер (рекомендуемый) |
|------|----------|------------------------|
| `hero-bg.jpg` | Фон для главного экрана | 1920x800 px |
| `hero-bg.webp` | Фон (WebP формат) | 1920x800 px |
| `pattern.svg` | Паттерн/узор | Любой |
| `gradient.jpg` | Градиентный фон | 1920x1080 px |

### 3. Изображения продуктов
**Папка:** `frontend/public/images/products/`

| Файл | Описание |
|------|----------|
| `placeholder.png` | Заглушка для товаров без фото |
| `tb-007-1.jpg` | Фото продукта TB-007 (вид 1) |
| `tb-007-2.jpg` | Фото продукта TB-007 (вид 2) |
| ... | ... |

**Формат именования:** `{sku}-{номер}.jpg`

### 4. Загруженные файлы (Backend)
**Папка:** `backend/uploads/products/`

Сюда загружаются изображения через админ-панель.

---

## 📐 Рекомендации по размерам

### Логотипы
- **Формат:** SVG (предпочтительно) или PNG с прозрачным фоном
- **Размер:** 200x50 px для полного логотипа
- **Цвета:** Фирменные цвета Toybola (красный, синий, жёлтый)

### Фоны
- **Hero секция:** 1920x800 px
- **Full-width фон:** 1920x1080 px
- **Формат:** JPG (фото), WebP (оптимизированный), SVG (паттерны)
- **Размер файла:** < 500 KB

### Изображения продуктов
- **Основное фото:** 800x800 px (квадрат)
- **Дополнительные:** 800x800 px
- **Формат:** JPG или WebP
- **Размер файла:** < 200 KB
- **Фон:** Белый или прозрачный

---

## 🎨 Пример структуры файлов

```
frontend/public/images/
├── logo/
│   ├── logo-full.svg
│   ├── logo-toy.svg
│   ├── logo-bola.svg
│   └── favicon.ico
│
├── backgrounds/
│   ├── hero-bg.jpg
│   ├── hero-bg.webp
│   └── pattern.svg
│
└── products/
    ├── placeholder.png
    ├── tb-007-1.jpg
    ├── tb-007-2.jpg
    ├── tb-008-1.jpg
    └── ...
```

---

## 🔄 Как использовать в коде

### В Vue компонентах

```vue
<template>
  <!-- Логотип -->
  <img src="/images/logo/logo-full.svg" alt="Toybola" />
  
  <!-- Фон -->
  <div class="hero" style="background-image: url('/images/backgrounds/hero-bg.jpg')" />
  
  <!-- Продукт -->
  <img :src="`/images/products/${product.sku}-1.jpg`" :alt="product.name" />
</template>
```

### В TailwindCSS

```css
/* В tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/images/backgrounds/hero-bg.jpg')",
      }
    }
  }
}
```

---

## 📤 Загрузка через админ-панель

1. Войдите в админ-панель: http://localhost:5173/admin/login
2. Перейдите в "Продукты" → Редактирование продукта
3. Нажмите "Загрузить изображение"
4. Файл сохранится в `backend/uploads/products/`

---

## 🎯 Следующие шаги

1. **Поместите файлы логотипов** в `frontend/public/images/logo/`
2. **Поместите фоновые изображения** в `frontend/public/images/backgrounds/`
3. **Поместите фото продуктов** в `frontend/public/images/products/`
4. **Обновите код** для использования новых изображений

---

## 💡 Советы

✅ Используйте **WebP** формат для лучшей оптимизации
✅ Создавайте **SVG** версии логотипов для масштабирования
✅ Сжимайте изображения через **TinyPNG** или **Squoosh**
✅ Используйте **ленивую загрузку** (lazy loading) для продуктов
