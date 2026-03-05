<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const catalogStore = useCatalogStore()
const authStore = useAuthStore()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

onMounted(async () => {
  await catalogStore.fetchCategories()
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ 
      name: 'catalog', 
      query: { search: searchQuery.value } 
    })
  }
}

const handleLogoClick = () => {
  router.push('/')
}

const navigateTo = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Top bar -->
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div 
          @click="handleLogoClick"
          class="flex-shrink-0 cursor-pointer"
        >
          <img 
            src="/images/logo/logotoybola_main.svg" 
            alt="Toybola"
            class="h-10 md:h-12 object-contain transition-transform duration-300 hover:scale-105"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
          />
          <div class="text-2xl md:text-3xl font-bold hidden" style="display:none">
            <span class="text-brand-red">Toy</span>
            <span class="text-brand-blue">bola</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <button 
            @click="navigateTo('/')"
            class="text-gray-700 hover:text-brand-red transition-colors font-medium relative group"
          >
            Главная
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            @click="navigateTo('/about')"
            class="text-gray-700 hover:text-brand-red transition-colors font-medium relative group"
          >
            О компании
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            @click="navigateTo('/catalog')"
            class="text-gray-700 hover:text-brand-red transition-colors font-medium relative group"
          >
            Каталог
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            @click="navigateTo('/contacts')"
            class="text-gray-700 hover:text-brand-red transition-colors font-medium relative group"
          >
            Свяжитесь с нами
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        <!-- Search and Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden md:flex relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Поиск"
              class="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
            />
            <button
              @click="handleSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>

          <!-- Language -->
          <div class="hidden md:flex space-x-2 text-sm">
            <button class="font-semibold text-brand-red">RU</button>
            <span class="text-gray-300">|</span>
            <button class="text-gray-600 hover:text-brand-red transition-colors">EN</button>
            <span class="text-gray-300">|</span>
            <button class="text-gray-600 hover:text-brand-red transition-colors">UZ</button>
          </div>

          <!-- Admin Link -->
          <button
            v-if="authStore.isAuthenticated"
            @click="navigateTo('/admin')"
            class="px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Админка
          </button>
          <button
            v-else
            @click="navigateTo('/admin/login')"
            class="text-gray-600 hover:text-brand-red transition-colors text-sm font-medium"
          >
            Вход
          </button>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
        <div class="flex flex-col space-y-4">
          <button 
            @click="navigateTo('/')"
            class="text-left text-gray-700 hover:text-brand-red font-medium"
          >
            Главная
          </button>
          <button 
            @click="navigateTo('/about')"
            class="text-left text-gray-700 hover:text-brand-red font-medium"
          >
            О компании
          </button>
          <button 
            @click="navigateTo('/catalog')"
            class="text-left text-gray-700 hover:text-brand-red font-medium"
          >
            Каталог
          </button>
          <button 
            @click="navigateTo('/contacts')"
            class="text-left text-gray-700 hover:text-brand-red font-medium"
          >
            Свяжитесь с нами
          </button>
          
          <!-- Mobile Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Поиск..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <!-- Mobile Language -->
          <div class="flex space-x-4 text-sm">
            <button class="font-semibold text-brand-red">RU</button>
            <button class="text-gray-600">EN</button>
            <button class="text-gray-600">UZ</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
