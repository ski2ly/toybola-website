<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'

const router = useRouter()
const authStore = useAuthStore()
const stats = ref(null)
const loading = ref(true)

const token = localStorage.getItem('admin_token')

// Блоки для редактирования
const editableBlocks = ref([
  {
    id: 'partners',
    title: 'Наши партнеры',
    description: 'Управление логотипами и информацией о партнерах',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    color: 'from-brand-red to-red-500',
    route: '/admin/partners'
  },
  {
    id: 'news',
    title: 'Новости компании',
    description: 'Публикация новостей и объявлений',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    color: 'from-brand-blue to-blue-500',
    route: '/admin/news'
  },
  {
    id: 'about',
    title: 'О компании',
    description: 'Редактирование текста и статистики',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'from-green-500 to-emerald-600',
    route: '/admin/about'
  },
  {
    id: 'certificates',
    title: 'Сертификаты',
    description: 'Управление сертификатами и лицензиями',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    color: 'from-purple-500 to-purple-600',
    route: '/admin/certificates'
  },
])

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    stats.value = response.data
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-gray-900 mb-2">Панель управления</h1>
        <p class="text-gray-600">Редактирование контента презентационного сайта</p>
      </div>

      <!-- Блоки для редактирования -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <router-link
          v-for="block in editableBlocks"
          :key="block.id"
          :to="block.route"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div :class="`h-2 bg-gradient-to-r ${block.color}`"></div>
          <div class="p-6">
            <div :class="`w-14 h-14 bg-gradient-to-br ${block.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="block.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ block.title }}</h3>
            <p class="text-gray-600 text-sm">{{ block.description }}</p>
            <div class="mt-4 flex items-center text-brand-blue font-semibold text-sm group-hover:translate-x-2 transition-transform">
              <span>Редактировать</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Stats Cards (если доступны) -->
      <div v-if="stats && !loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Products -->
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#77CED8]">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Всего продуктов</div>
              <div class="text-4xl font-bold text-[#77CED8]">{{ stats?.totalProducts || 0 }}</div>
            </div>
            <div class="w-16 h-16 bg-[#77CED8]/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-[#77CED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#5FB8C2]">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Категории</div>
              <div class="text-4xl font-bold text-[#5FB8C2]">{{ stats?.totalCategories || 0 }}</div>
            </div>
            <div class="w-16 h-16 bg-[#5FB8C2]/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-[#5FB8C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- In Stock -->
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">В наличии</div>
              <div class="text-4xl font-bold text-green-600">{{ stats?.inventory?.inStock || 0 }}</div>
            </div>
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Out of Stock -->
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-gray-500 mb-1">Нет в наличии</div>
              <div class="text-4xl font-bold text-red-600">{{ stats?.inventory?.outOfStock || 0 }}</div>
            </div>
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !stats" class="text-center py-12">
        <div class="text-xl text-gray-500">Загрузка...</div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link
          to="/admin/products"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <div class="text-4xl mb-4">📦</div>
          <h3 class="font-semibold text-lg mb-2 text-gray-900">Управление продукты</h3>
          <p class="text-gray-600">Добавление, редактирование и удаление товаров</p>
        </router-link>

        <router-link
          to="/admin/import"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <div class="text-4xl mb-4">📊</div>
          <h3 class="font-semibold text-lg mb-2 text-gray-900">Импорт Excel</h3>
          <p class="text-gray-600">Массовая загрузка каталога из Excel файла</p>
        </router-link>

        <router-link
          to="/admin/crm"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <div class="text-4xl mb-4">💬</div>
          <h3 class="font-semibold text-lg mb-2 text-gray-900">Заявки CRM</h3>
          <p class="text-gray-600">Просмотр и управление заявками с сайта</p>
        </router-link>
      </div>
    </div>
  </AdminLayout>
</template>
