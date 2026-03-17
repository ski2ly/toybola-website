<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'
import { gsap } from 'gsap'

const router = useRouter()
const route = useRoute()
const catalogStore = useCatalogStore()
const authStore = useAuthStore()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)
const headerRef = ref(null)
const lastScrollY = ref(0)
const isScrolled = ref(false)
const scrollHandler = ref(null)

// Secret admin access - 5 clicks on logo
const logoClickCount = ref(0)
const logoClickTimer = ref(null)

const resetLogoClicks = () => {
  logoClickCount.value = 0
}

onMounted(async () => {
  await catalogStore.fetchCategories()

  // Анимация хедера при загрузке
  gsap.from(headerRef.value, {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Обработка скролла для хедера
  scrollHandler.value = handleScroll
  window.addEventListener('scroll', scrollHandler.value, { passive: true })
})

// Очистка при размонтировании компонента
onUnmounted(() => {
  if (scrollHandler.value) {
    window.removeEventListener('scroll', scrollHandler.value)
  }
})

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isScrolled.value = currentScrollY > 50
  
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    // Скролл вниз - скрываем хедер
    gsap.to(headerRef.value, {
      y: -100,
      duration: 0.3,
      ease: 'power2.out'
    })
  } else {
    // Скролл вверх - показываем хедер
    gsap.to(headerRef.value, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
  
  lastScrollY.value = currentScrollY
}

const isActiveRoute = (path) => {
  return route.path === path
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'catalog',
      query: { search: searchQuery.value }
    })
  }
}

const handleLogoClick = () => {
  // Secret admin access logic
  logoClickCount.value++

  // Clear existing timer
  if (logoClickTimer.value) {
    clearTimeout(logoClickTimer.value)
  }

  // Check if 5 clicks reached
  if (logoClickCount.value >= 5) {
    // Navigate to admin
    if (authStore.isAuthenticated) {
      router.push('/admin')
    } else {
      router.push('/admin/login')
    }
    resetLogoClicks()
  } else {
    // Reset counter after 2 seconds
    logoClickTimer.value = setTimeout(resetLogoClicks, 2000)
  }
}

const navigateTo = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}

// Магнитный эффект для кнопок
const handleMagneticHover = (e) => {
  const button = e.currentTarget
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const handleMagneticLeave = (e) => {
  gsap.to(e.currentTarget, {
    x: 0,
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}
</script>

<template>
  <header 
    ref="headerRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl' : 'bg-white/90 backdrop-blur-md'
    ]"
  >
    <div class="container mx-auto px-4">
      <!-- Top bar с контактами -->
      <div v-if="isScrolled" class="hidden md:block border-b border-gray-100 py-2">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-6 text-gray-600">
            <a href="tel:+998950952222" class="flex items-center gap-2 hover:text-brand-red transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +998 95 095-22-22
            </a>
            <a href="mailto:support@toybola.uz" class="flex items-center gap-2 hover:text-brand-red transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              support@toybola.uz
            </a>
          </div>
          <div class="flex items-center gap-2">
            <!-- B2B портал убран -->
          </div>
        </div>
      </div>
      
      <!-- Main header bar -->
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div
          @click="handleLogoClick"
          class="flex-shrink-0 cursor-pointer group"
        >
          <div class="flex items-center gap-3">
            <img
              src="/images/logo/logotoybola_main.svg"
              alt="Toybola"
              class="h-10 md:h-12 object-contain transition-all duration-300 group-hover:scale-110"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            />
            <div class="text-2xl md:text-3xl font-black hidden items-center gap-1" style="display:none">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">Toy</span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">bola</span>
            </div>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <button
            @click="navigateTo('/')"
            :class="[
              'relative px-4 py-2 font-semibold transition-all duration-300 rounded-lg',
              isActiveRoute('/')
                ? 'text-brand-red bg-brand-red/5'
                : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
            ]"
            @mouseenter="handleMagneticHover"
            @mouseleave="handleMagneticLeave"
          >
            Главная
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue transition-all duration-300',
                isActiveRoute('/') ? 'w-full' : 'w-0 group-hover:w-full'
              ]"
            ></span>
          </button>

          <button
            @click="navigateTo('/about')"
            :class="[
              'relative px-4 py-2 font-semibold transition-all duration-300 rounded-lg',
              isActiveRoute('/about')
                ? 'text-brand-red bg-brand-red/5'
                : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
            ]"
            @mouseenter="handleMagneticHover"
            @mouseleave="handleMagneticLeave"
          >
            О компании
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue transition-all duration-300',
                isActiveRoute('/about') ? 'w-full' : 'w-0'
              ]"
            ></span>
          </button>

          <a
            href="https://ctgtb.uz"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'relative px-4 py-2 font-semibold transition-all duration-300 rounded-lg',
              'text-gray-700 hover:text-brand-red hover:bg-gray-50'
            ]"
            @mouseenter="handleMagneticHover"
            @mouseleave="handleMagneticLeave"
          >
            Каталог
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue transition-all duration-300 w-0 hover:w-full"
            ></span>
          </a>

          <button
            @click="navigateTo('/contacts')"
            :class="[
              'relative px-4 py-2 font-semibold transition-all duration-300 rounded-lg',
              isActiveRoute('/contacts')
                ? 'text-brand-red bg-brand-red/5'
                : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
            ]"
            @mouseenter="handleMagneticHover"
            @mouseleave="handleMagneticLeave"
          >
            Контакты
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-red to-brand-blue transition-all duration-300',
                isActiveRoute('/contacts') ? 'w-full' : 'w-0'
              ]"
            ></span>
          </button>
        </nav>

        <!-- Search and Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search (Desktop) - Скрыт -->
          <!-- <div class="hidden md:flex relative group">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Поиск товаров..."
              class="w-56 px-5 py-2.5 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-gray-50 group-hover:bg-white"
            />
            <button
              @click="handleSearch"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-blue transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div> -->

          <!-- Language -->
          <div class="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button class="px-3 py-1.5 text-xs font-bold bg-white rounded-md text-brand-red shadow-sm">RU</button>
            <button class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-brand-red transition-colors">EN</button>
            <button class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-brand-red transition-colors">UZ</button>
          </div>

          <!-- Admin Link -->
          <button
            v-if="authStore.isAuthenticated"
            @click="navigateTo('/admin')"
            class="hidden md:flex px-5 py-2.5 bg-gradient-to-r from-brand-blue to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-brand-blue transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:shadow-brand-blue/30 transform hover:-translate-y-0.5"
          >
            Админка
          </button>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden py-6 border-t border-gray-100 animate-fade-in-up"
      >
        <div class="flex flex-col space-y-3">
          <button
            @click="navigateTo('/')"
            :class="[
              'px-4 py-3 rounded-xl text-left font-semibold transition-all',
              isActiveRoute('/') ? 'bg-brand-red/5 text-brand-red' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            Главная
          </button>
          <button
            @click="navigateTo('/about')"
            :class="[
              'px-4 py-3 rounded-xl text-left font-semibold transition-all',
              isActiveRoute('/about') ? 'bg-brand-red/5 text-brand-red' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            О компании
          </button>
          <a
            href="https://ctgtb.uz"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'px-4 py-3 rounded-xl text-left font-semibold transition-all',
              'text-gray-700 hover:bg-gray-50'
            ]"
          >
            Каталог ↗
          </a>
          <button
            @click="navigateTo('/contacts')"
            :class="[
              'px-4 py-3 rounded-xl text-left font-semibold transition-all',
              isActiveRoute('/contacts') ? 'bg-brand-red/5 text-brand-red' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            Контакты
          </button>

          <!-- Mobile Search - Скрыт -->
          <!-- <div class="relative pt-2">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Поиск товаров..."
              class="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue transition-all"
            />
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div> -->

          <!-- Mobile Language -->
          <div class="flex items-center gap-2 pt-2">
            <button class="px-4 py-2 text-sm font-bold bg-brand-red text-white rounded-lg">RU</button>
            <button class="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-600 rounded-lg">EN</button>
            <button class="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-600 rounded-lg">UZ</button>
          </div>

          <!-- Mobile Admin -->
          <button
            v-if="authStore.isAuthenticated"
            @click="navigateTo('/admin')"
            class="w-full py-3 bg-brand-blue text-white rounded-xl font-semibold"
          >
            Админ-панель
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
