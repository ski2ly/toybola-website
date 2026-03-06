import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// ============================================
// SCROLL REVEAL ANIMATION
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
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach(img => {
    img.src = img.src
  })
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js'
  document.body.appendChild(script)
}

// ============================================
// PRELOAD CRITICAL ASSETS
// ============================================
function preloadCriticalAssets() {
  // Preload critical fonts
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.as = 'style'
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  document.head.appendChild(fontLink)
}

preloadCriticalAssets()
