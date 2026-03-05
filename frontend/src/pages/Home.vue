<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCatalogStore } from '@/stores/catalog'
import ProductCard from '@/components/catalog/ProductCard.vue'

const router = useRouter()
const catalogStore = useCatalogStore()

onMounted(async () => {
  await catalogStore.fetchCategories()
  await catalogStore.fetchFeatured(8)
  await catalogStore.fetchNew(8)
})

const navigateToCategory = (slug) => {
  router.push(`/catalog/${slug}`)
}

const navigateToCatalog = () => {
  router.push('/catalog')
}

const navigateToAbout = () => {
  router.push('/about')
}

const stats = [
  { value: '15+', label: 'лет на рынке' },
  { value: '71M+', label: 'игрушек произведено' },
  { value: '1000+', label: 'сотрудников' },
  { value: '12', label: 'стран экспорта' },
]
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="relative hero-section min-h-[95vh] flex items-center overflow-hidden">
      <!-- Video Background -->
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="absolute inset-0 w-full h-full object-cover"
        style="object-position: top center;"
      >
        <source src="/images/backgrounds/videobg.mp4" type="video/mp4" />
      </video>
      
      <!-- Overlays -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
      
      <!-- Animated elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-40 left-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <!-- Content -->
      <div class="relative container mx-auto px-4 py-32">
        <div class="max-w-4xl">
          <!-- Headline -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg animate-fade-in-up">
            Игрушки от <span class="text-gradient-gold">производителя</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
            Крупнейший производитель игрушек в Центральной Азии.
            <br />
            <span class="text-blue-200">Экспорт в 12 стран мира.</span>
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button
              @click="navigateToCatalog"
              class="group btn-primary px-10 py-5 bg-brand-red text-white font-semibold rounded-xl shadow-lg"
            >
              <span class="flex items-center justify-center gap-3">
                <span>Смотреть каталог</span>
                <svg class="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </button>
            
            <button
              @click="navigateToAbout"
              class="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              О компании
            </button>
          </div>
        </div>
      </div>
      
      <!-- Wave Divider - 5% высоты -->
      <div class="wave-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
          <path d="M0 0L60 8C120 16 240 32 360 40C480 48 600 48 720 44C840 40 960 32 1080 40C1200 48 1320 72 1380 84L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center reveal"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4">{{ stat.value }}</div>
            <div class="text-gray-600 text-lg">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 reveal">
          <h2 class="text-4xl font-bold mb-4">Категории продукции</h2>
          <p class="text-xl text-gray-600">Широкий ассортимент для любого возраста</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="category in catalogStore.categories"
            :key="category.id"
            @click="navigateToCategory(category.slug)"
            class="bg-white rounded-xl shadow-elegant p-6 text-center cursor-pointer card-hover reveal border border-gray-100"
          >
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="font-semibold text-lg mb-2 text-gray-900">{{ category.nameRu }}</h3>
            <p class="text-sm text-gray-500">
              {{ category._count?.subcategories || 0 }} подкатегорий
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-12 reveal">
          <div>
            <h2 class="text-4xl font-bold mb-2">Хиты продаж</h2>
            <p class="text-gray-600">Наши самые популярные товары</p>
          </div>
          <button
            @click="navigateToCatalog"
            class="hidden md:flex items-center gap-2 text-brand-blue hover:text-blue-700 font-medium transition-colors group"
          >
            <span>Смотреть все</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in catalogStore.featuredProducts"
            :key="product.id"
            :product="product"
            class="reveal"
          />
        </div>
        
        <div class="text-center mt-8 md:hidden">
          <button
            @click="navigateToCatalog"
            class="px-8 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Смотреть все товары
          </button>
        </div>
      </div>
    </section>

    <!-- New Products -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-12 reveal">
          <div>
            <h2 class="text-4xl font-bold mb-2">Новинки</h2>
            <p class="text-gray-600">Последние поступления в наш каталог</p>
          </div>
          <button
            @click="navigateToCatalog"
            class="hidden md:flex items-center gap-2 text-brand-blue hover:text-blue-700 font-medium transition-colors group"
          >
            <span>Смотреть все</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in catalogStore.newProducts"
            :key="product.id"
            :product="product"
            class="reveal"
          />
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="relative py-20 bg-cover bg-center bg-fixed" style="background-image: url('/images/backgrounds/background.svg');">
      <!-- Overlay - более прозрачный -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>
      
      <div class="relative container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12 reveal">
            <h2 class="text-4xl font-bold mb-4 text-white">Свяжитесь с нами</h2>
            <p class="text-xl text-blue-100">Заполните форму и мы свяжемся с вами в ближайшее время</p>
          </div>
          
          <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 reveal">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Имя -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                  />
                </div>
                
                <!-- Телефон -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефона <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ваш номер телефона"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                  />
                </div>
              </div>
              
              <!-- Тема -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Тема обращения <span class="text-red-500">*</span>
                </label>
                <select
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                >
                  <option value="" disabled selected>Выберите тему</option>
                  <option value="cooperation">Сотрудничество / Дистрибьюция</option>
                  <option value="wholesale">Оптовый заказ</option>
                  <option value="question">Вопрос по продукции</option>
                  <option value="support">Техническая поддержка</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Электронная почта
                  <span class="text-gray-400 text-xs">(необязательно)</span>
                </label>
                <input
                  type="email"
                  placeholder="Ваш email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                />
              </div>
              
              <!-- Сообщение -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea
                  rows="4"
                  placeholder="Опишите ваш вопрос или предложение..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-none"
                ></textarea>
              </div>
              
              <!-- Submit Button -->
              <button
                type="submit"
                class="w-full py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl btn-primary"
              >
                Отправить сообщение
              </button>
              
              <p class="text-xs text-gray-500 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
