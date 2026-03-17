<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCatalogStore } from '@/stores/catalog'
import ProductGrid from '@/components/catalog/ProductGrid.vue'
import FilterPanel from '@/components/catalog/FilterPanel.vue'
import Pagination from '@/components/catalog/Pagination.vue'
import { gsap } from 'gsap'

const router = useRouter()
const route = useRoute()
const catalogStore = useCatalogStore()
const isRedirecting = ref(false)

// Каталог теперь находится на отдельном сайте
const EXTERNAL_CATALOG_URL = 'https://ctgtb.uz'

const redirectToCatalog = () => {
  isRedirecting.value = true

  // Анимация перед переходом
  const tl = gsap.timeline({
    onComplete: () => {
      window.location.href = EXTERNAL_CATALOG_URL
    }
  })

  tl.to('.catalog-redirect-overlay', {
    opacity: 1,
    duration: 0.3
  })
  .to('.catalog-redirect-content', {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: 'back.in(1.7)'
  })
}

onMounted(async () => {
  // Показываем страницу с информацией о переходе
})

watch(
  () => [route.query, catalogStore.filters],
  () => {
    catalogStore.fetchProducts()
  },
  { deep: true }
)

const handlePageChange = (page) => {
  catalogStore.setPage(page)
  catalogStore.fetchProducts({ page })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <DefaultLayout>
    <!-- Overlay для анимации перехода -->
    <div
      class="catalog-redirect-overlay fixed inset-0 bg-gradient-to-br from-brand-red to-brand-blue z-50 opacity-0 pointer-events-none flex items-center justify-center"
    >
      <div class="catalog-redirect-content text-center text-white">
        <svg class="w-20 h-20 mx-auto mb-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <p class="text-2xl font-bold">Переход в каталог...</p>
      </div>
    </div>

    <div class="bg-gray-100 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Header с кнопкой перехода -->
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue">
            Каталог продукции
          </h1>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
            Наш каталог теперь доступен на отдельном сайте с расширенным функционалом
          </p>
          
          <button
            @click="redirectToCatalog"
            class="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-red to-red-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-brand-red/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Перейти в каталог</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <p class="text-sm text-gray-500 mt-4">
            ctgtb.uz
          </p>
        </div>

        <div class="flex flex-col md:flex-col lg:flex-row gap-6">
          <!-- Sidebar with Filters -->
          <aside class="w-full lg:w-64 flex-shrink-0">
            <FilterPanel @filter-change="catalogStore.fetchProducts()" />
          </aside>

          <!-- Products Grid -->
          <main class="flex-grow">
            <ProductGrid
              :products="catalogStore.products"
              :loading="catalogStore.loading"
            />

            <!-- Pagination -->
            <Pagination
              v-if="catalogStore.pagination.totalPages > 1"
              :currentPage="catalogStore.pagination.page"
              :totalPages="catalogStore.pagination.totalPages"
              @change-page="handlePageChange"
            />
          </main>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>
