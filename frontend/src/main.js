import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)

app.mount('#app')

// ============================================
// CUSTOM CURSOR (как на minixcollection)
// ============================================
let cursorAnimationFrame = null

function initCustomCursor() {
  // Создаем элементы курсора только для десктопов
  if (window.innerWidth >= 1024) {
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)

    let cursorX = 0, cursorY = 0

    // Мгновенное движение курсора без задержек
    function animateCursor() {
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      cursorAnimationFrame = requestAnimationFrame(animateCursor)
    }
    animateCursor()

    // Отслеживание движения мыши
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
    }, { passive: true })

    // Эффект импульсов при наведении на интерактивные элементы
    function addHoverEffect(el) {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered')
      })
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered')
      })
    }

    // Находим все интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')
    interactiveElements.forEach(el => addHoverEffect(el))

    // Скрываем системный курсор над canvas и видео
    const noCursorElements = document.querySelectorAll('video, canvas, iframe')
    noCursorElements.forEach(el => {
      el.style.cursor = 'none'
    })
  }
}

// Инициализация курсора после загрузки DOM
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor)
  } else {
    initCustomCursor()
  }
}

// Пересоздаем курсор при изменении размера окна
let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    // Cancel previous animation loop
    if (cursorAnimationFrame) {
      cancelAnimationFrame(cursorAnimationFrame)
      cursorAnimationFrame = null
    }
    const cursorElements = document.querySelectorAll('.custom-cursor')
    cursorElements.forEach(el => el.remove())
    if (window.innerWidth >= 1024) {
      initCustomCursor()
    }
  }, 250)
})

// ============================================
// SCROLL REVEAL ANIMATION (GSAP enhanced)
// ============================================
function reveal() {
  const reveals = document.querySelectorAll('.reveal')
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight
    const elementTop = reveals[i].getBoundingClientRect().top
    const elementVisible = 150
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active')
    }
  }
}

window.addEventListener('scroll', reveal, { passive: true })
// Trigger once on load
reveal()

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function initScrollProgress() {
  const progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  progressBar.style.width = '0%'
  document.body.appendChild(progressBar)

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + '%'
  }, { passive: true })
}

initScrollProgress()

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach(img => {
    img.src = img.src
  })
} else {
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js'
  document.body.appendChild(script)
}

// ============================================
// PRELOAD CRITICAL ASSETS
// ============================================
function preloadCriticalAssets() {
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.as = 'style'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
  document.head.appendChild(fontLink)
}

preloadCriticalAssets()

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href !== '#') {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })
})
