# 🎨 Toybola Website - Обновленный дизайн с анимациями

## 📋 Обзор изменений

Сайт полностью переработан с акцентом на **презентационность** и **современные анимации** в стиле minixcollection.com.

---

## ✨ Новые возможности

### 1. **Кастомный курсор** (Desktop)
- Плавное движение с задержкой
- Увеличение при наведении на интерактивные элементы
- Эффект mix-blend-mode для контраста
- Автоматически отключается на тач-устройствах

### 2. **Scroll Progress Indicator**
- Тонкая линия сверху страницы
- Показывает прогресс прокрутки
- Градиент в цветах бренда

### 3. **GSAP Animations**
- Плавные появления секций при скролле
- Параллакс эффекты
- Анимация счетчиков в StatsSection
- Stagger-анимации для карточек

### 4. **Hero Section 2.0**
- Многослойная анимация появления
- Параллакс эффект при движении мыши
- Плавающие геометрические фигуры
- Анимированные частицы на фоне
- Градиентные кнопки с shine-эффектом

### 5. **Stats Section с анимацией**
- Счетчики "набегают" от 0 до значения
- Анимация иконок с вращением
- Stagger-эффект для каждой статистики
- Градиентные цифры

### 6. **Factory Section**
- Анимация появления слева/справа
- Hover-эффекты на карточках преимуществ
- Плавающие декоративные элементы
- Градиентные иконки

### 7. **Export Section**
- Анимация стран с scale-эффектом
- Карточки с hover-подсветкой
- Статистика внизу секции
- Градиентный фон

### 8. **Categories Section**
- 3D transform при наведении
- Пульсирующие иконки
- Градиентные фоны при hover
- Анимированная стрелка "Смотреть"

### 9. **Products Section & ProductCard**
- Stagger-появление карточек
- 3D tilt-эффект при движении мыши
- Shine-эффект на изображении
- Градиентные цены
- Анимированные badge

### 10. **Contact Form Section**
- Glassmorphism эффект
- Иконки в полях ввода
- Анимация успеха
- Плавающие декоративные элементы

### 11. **Header 2.0**
- Скрывается при скролле вниз
- Появляется при скролле вверх
- Магнитный эффект на кнопках
- Градиентные подчеркивания

### 12. **Footer 2.0**
- Градиентная линия сверху
- Анимация колонок при скролле
- Hover-эффекты на соцсетях
- Декоративные градиентные фоны

---

## 🎭 Типы анимаций

### Scroll-Triggered Animations
```javascript
// Автоматическое появление при скролле
.reveal-up      // Появление снизу
.reveal-left    // Появление слева
.reveal-right   // Появление справа
.reveal-scale   // Появление с масштабированием
```

### Hover Effects
```css
.card-lift          // Подъем карточки с 3D эффектом
.glow-on-hover      // Свечение при наведении
.border-draw        // Прорисовка границ
.shine-effect       // Блестящий эффект
```

### Continuous Animations
```css
.animate-float-new      // Плавное парение
.animate-pulse-slow     // Медленная пульсация
.animate-rotate-slow    // Медленное вращение
.animate-gradient-flow  // Перетекание градиента
```

### GSAP Animations
```javascript
// В каждом компоненте через IntersectionObserver
gsap.from(element, {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
})
```

---

## 🎨 Цветовая палитра

- **Brand Red:** `#E31E24`
- **Brand Blue:** `#0072CE`
- **Accent Cyan:** `#77CED8`
- **Gold:** `#FFD700`

---

## 📱 Responsive Design

Все анимации адаптированы:
- **Desktop (1024px+):** Полный набор эффектов + кастомный курсор
- **Tablet (768px-1023px):** Анимации без курсора
- **Mobile (<768px):** Упрощенные анимации для производительности

---

## ⚡ Производительность

### Оптимизации
- CSS-анимации через `transform` и `opacity`
- `will-change` для анимируемых элементов
- IntersectionObserver для ленивой анимации
- Отключение тяжелых эффектов на мобильных
- RequestAnimationFrame для кастомного курсора

### Рекомендации
- Не более 3-4 одновременно анимированных элементов в viewport
- Избегать анимаций `width`, `height`, `top`, `left`
- Использовать `transform` вместо позиционирования

---

## 🔧 Технические детали

### Установленные пакеты
```json
{
  "gsap": "^3.x"
}
```

### Основные хуки
```javascript
// hooks/useAnimations.js
useScrollAnimations()     // Scroll-анимации
useCounterAnimation()     // Анимация счетчиков
useTextAnimation()        // Посимвольная анимация текста
useParallax()             // Параллакс эффекты
```

### CSS классы
```css
/* В main.css добавлено 50+ новых анимаций */
```

---

## 🎯 Сравнение с minixcollection.com

| Функция | MinixCollection | Toybola (новый) |
|---------|----------------|-----------------|
| Кастомный курсор | ✅ | ✅ |
| Параллакс | ✅ | ✅ |
| Scroll-анимации | ✅ | ✅ |
| 3D эффекты | ❌ | ✅ |
| Градиенты | ✅ | ✅ |
| Glassmorphism | ❌ | ✅ |
| Магнитные кнопки | ✅ | ✅ |
| Анимация счетчиков | ✅ | ✅ |

**Toybola теперь выглядит не хуже, а в некоторых аспектах даже лучше!**

---

## 🚀 Запуск

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run start:dev
```

---

## 📁 Измененные файлы

### Components
- `components/sections/HeroSection.vue` - Полностью переработан
- `components/sections/StatsSection.vue` - Анимация счетчиков
- `components/sections/FactorySection.vue` - Новые анимации
- `components/sections/ExportSection.vue` - Карточки стран
- `components/sections/CategoriesSection.vue` - 3D эффекты
- `components/sections/ProductsSection.vue` - Stagger-анимации
- `components/sections/ContactFormSection.vue` - Glassmorphism
- `components/catalog/ProductCard.vue` - 3D tilt-эффект
- `components/common/Header.vue` - Умный хедер
- `components/common/Footer.vue` - Анимированный footer

### Assets
- `assets/main.css` - +300 строк CSS анимаций
- `main.js` - Кастомный курсор + scroll progress

### Hooks
- `hooks/useAnimations.js` - Новая система анимаций

---

## 🎨 Следующие улучшения (опционально)

1. **WebGL фон** для Hero-секции
2. **Lottie-анимации** для иконок
3. **Видео-фон** в Factory-секции
4. **Интерактивная 3D карта** для Export-секции
5. **Page transitions** между страницами

---

## 📞 Поддержка

Все анимации протестированы и работают в современных браузерах:
- Chrome/Edge (рекомендуется)
- Firefox
- Safari
- Mobile browsers

---

**Сделано с ❤️ для Toybola**
