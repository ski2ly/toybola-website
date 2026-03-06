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
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <!-- Stats Cards -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-xl text-gray-500">Загрузка...</div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link
          to="/admin/products"
          class="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <div class="text-4xl mb-4">📦</div>
          <h3 class="font-semibold text-lg mb-2 text-gray-900">Управление продуктами</h3>
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
