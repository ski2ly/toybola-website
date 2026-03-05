<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold text-brand-red">TOYBOLA Admin</div>
          <nav class="hidden md:flex gap-4">
            <router-link to="/admin" class="text-brand-blue font-medium">Dashboard</router-link>
            <router-link to="/admin/products" class="text-gray-600 hover:text-brand-blue">Продукты</router-link>
            <router-link to="/admin/categories" class="text-gray-600 hover:text-brand-blue">Категории</router-link>
            <router-link to="/admin/products/import" class="text-gray-600 hover:text-brand-blue">Импорт Excel</router-link>
          </nav>
        </div>
        <button
          @click="logout"
          class="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          Выход
        </button>
      </div>
    </header>

    <!-- Dashboard Content -->
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Dashboard</h1>

      <!-- Stats Cards -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-xl">Загрузка...</div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Products -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 mb-2">Всего продуктов</div>
          <div class="text-4xl font-bold text-brand-blue">{{ stats?.totalProducts || 0 }}</div>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 mb-2">Категории</div>
          <div class="text-4xl font-bold text-brand-yellow">{{ stats?.totalCategories || 0 }}</div>
        </div>

        <!-- In Stock -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 mb-2">В наличии</div>
          <div class="text-4xl font-bold text-green-600">{{ stats?.inventory?.inStock || 0 }}</div>
        </div>

        <!-- Out of Stock -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-sm text-gray-500 mb-2">Нет в наличии</div>
          <div class="text-4xl font-bold text-red-600">{{ stats?.inventory?.outOfStock || 0 }}</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <router-link
          to="/admin/products"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-2xl mb-4">📦</div>
          <h3 class="font-semibold text-lg mb-2">Управление продуктами</h3>
          <p class="text-gray-600">Добавление, редактирование и удаление товаров</p>
        </router-link>

        <router-link
          to="/admin/products/import"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-2xl mb-4">📊</div>
          <h3 class="font-semibold text-lg mb-2">Импорт Excel</h3>
          <p class="text-gray-600">Массовая загрузка каталога из Excel файла</p>
        </router-link>

        <router-link
          to="/admin/categories"
          class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div class="text-2xl mb-4">📁</div>
          <h3 class="font-semibold text-lg mb-2">Категории</h3>
          <p class="text-gray-600">Управление категориями и подкатегориями</p>
        </router-link>
      </div>
    </main>
  </div>
</template>
