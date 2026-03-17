<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const router = useRouter()
const currentYear = new Date().getFullYear()
const footerRef = ref(null)
const hasAnimated = ref(false)
const observer = ref(null)

const navigateTo = (path) => {
  router.push(path)
}

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/toybolatoys/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCQBSmktBQ80WERmZF1JCngA', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@toybolatoys', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-3.92 1.98-6.09 1.69-2.92-.36-5.55-2.28-6.69-4.97-.85-1.96-.91-4.24-.17-6.24.97-2.64 3.27-4.68 6.02-5.32.63-.15 1.28-.23 1.93-.23v4.11c-.66-.09-1.34-.03-1.98.18-1.2.38-2.13 1.38-2.45 2.59-.35 1.29.03 2.71.96 3.66.93.95 2.34 1.33 3.64.98 1.24-.33 2.24-1.35 2.56-2.6.11-.42.16-.86.16-1.3V.02h-3.07z' },
  { name: 'Telegram', url: 'https://t.me/toybolatoys', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
  { name: 'Facebook', url: 'https://www.facebook.com/toybolatoys', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' }
]

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          animateFooter()
        }
      })
    },
    { threshold: 0.2 }
  )

  if (footerRef.value) {
    observer.value.observe(footerRef.value)
  }
})

// Очистка при размонтировании компонента
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

const animateFooter = () => {
  const tl = gsap.timeline()
  
  tl.from('.footer-column', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  })
  
  tl.from('.footer-social', {
    scale: 0,
    rotation: -180,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.4')
  
  tl.from('.footer-bottom', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
}
</script>

<template>
  <footer ref="footerRef" class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
    <!-- Декоративные элементы -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-red/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-blue/10 to-transparent rounded-full blur-3xl"></div>
    
    <!-- Градиентная линия сверху -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-brand-red"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Company Info -->
          <div class="footer-column">
            <div class="mb-6">
              <img
                src="/images/logo/logotoybola_main.svg"
                alt="Toybola"
                class="h-12 mb-4 object-contain brightness-0 invert transition-all duration-300 hover:scale-105 hover:brightness-125"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
              />
              <div class="text-3xl font-black hidden items-center gap-1" style="display:none">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">Toy</span>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-500">bola</span>
              </div>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              Крупнейший производитель игрушек в Центральной Азии.
              Экспорт в 12 стран мира.
            </p>
            
            <!-- Сертификаты -->
            <div class="flex gap-3">
              <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group" @click="navigateTo('/about')" title="Сертификаты качества">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group" @click="navigateTo('/about')" title="Экологичность">
                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-column">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-brand-red to-brand-blue rounded-full"></span>
              Навигация
            </h4>
            <ul class="space-y-3 text-sm">
              <li>
                <button @click="navigateTo('/')" class="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span class="w-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue group-hover:w-4 transition-all duration-300"></span>
                  <span>Главная</span>
                </button>
              </li>
              <li>
                <button @click="navigateTo('/about')" class="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span class="w-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue group-hover:w-4 transition-all duration-300"></span>
                  <span>О компании</span>
                </button>
              </li>
              <li>
                <a
                  href="https://ctgtb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                >
                  <span class="w-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue group-hover:w-4 transition-all duration-300"></span>
                  <span>Каталог ↗</span>
                </a>
              </li>
              <li>
                <button @click="navigateTo('/contacts')" class="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group">
                  <span class="w-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue group-hover:w-4 transition-all duration-300"></span>
                  <span>Контакты</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Categories -->
          <div class="footer-column">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-brand-red to-brand-blue rounded-full"></span>
              Категории
            </h4>
            <ul class="space-y-3 text-sm text-gray-400">
              <li class="hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <a
                  href="https://ctgtb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Транспорт ↗</span>
                </a>
              </li>
              <li class="hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <a
                  href="https://ctgtb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Наборы ↗</span>
                </a>
              </li>
              <li class="hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <a
                  href="https://ctgtb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Игрушки для улицы ↗</span>
                </a>
              </li>
              <li class="hover:text-white hover:translate-x-2 transition-all duration-300 cursor-pointer flex items-center gap-2 group">
                <a
                  href="https://ctgtb.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2"
                >
                  <span class="w-1.5 h-1.5 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Развивающие ↗</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contacts & Social -->
          <div class="footer-column">
            <h4 class="font-bold text-lg mb-6 flex items-center gap-2">
              <span class="w-1 h-6 bg-gradient-to-b from-brand-red to-brand-blue rounded-full"></span>
              Контакты
            </h4>
            <ul class="space-y-4 text-sm">
              <li class="flex items-start gap-3 group">
                <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-blue transition-all duration-300">
                  <svg class="w-4 h-4 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="text-gray-400 group-hover:text-white transition-colors">Узбекистан, Ташкент</span>
              </li>
              <li class="flex items-center gap-3 group">
                <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-blue transition-all duration-300">
                  <svg class="w-4 h-4 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <a href="tel:+998950952222" class="text-gray-400 hover:text-white transition-colors font-medium">+998 95 095 2222</a>
              </li>
              <li class="flex items-center gap-3 group">
                <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-brand-blue transition-all duration-300">
                  <svg class="w-4 h-4 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a href="mailto:support@toybola.uz" class="text-gray-400 hover:text-white transition-colors font-medium">support@toybola.uz</a>
              </li>
            </ul>

            <!-- Social Media -->
            <div class="flex gap-3 mt-8">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-brand-red hover:to-brand-blue transition-all duration-300 hover:scale-110 hover:-rotate-6 group"
                :title="social.name"
              >
                <svg class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.icon"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom border-t border-gray-800 py-6 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-4 text-sm text-gray-400">
          <p>&copy; {{ currentYear }} Toybola. Все права защищены.</p>
        </div>
        <div class="flex items-center gap-6 text-sm">
          <router-link to="/terms" class="text-gray-400 hover:text-white transition-all duration-300 hover:underline underline-offset-4">Условия использования</router-link>
          <span class="text-gray-700">•</span>
          <router-link to="/privacy" class="text-gray-400 hover:text-white transition-all duration-300 hover:underline underline-offset-4">Политика конфиденциальности</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
