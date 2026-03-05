<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const page = ref(1)
const totalPages = ref(1)
const total = ref(0)

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/admin/products`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: page.value,
        limit: 20,
        search: searchQuery.value
      }
    })
    products.value = response.data.data
    page.value = response.data.meta.page
    totalPages.value = response.data.meta.totalPages
    total.value = response.data.meta.total
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  page.value = 1
  fetchProducts()
}

const handlePageChange = (newPage) => {
  page.value = newPage
  fetchProducts()
}

const deleteProduct = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить этот продукт?')) return

  try {
    await axios.delete(`${API_URL}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Ошибка при удалении')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-2xl font-bold text-brand-red">TOYBOLA Admin</div>
          <nav class="hidden md:flex gap-4">
            <router-link to="/admin" class="text-gray-600 hover:text-brand-blue">Dashboard</router-link>
            <router-link to="/admin/products" class="text-brand-blue font-medium">Продукты</router-link>
            <router-link to="/admin/categories" class="text-gray-600 hover:text-brand-blue">Категории</router-link>
            <router-link to="/admin/products/import" class="text-gray-600 hover:text-brand-blue">Импорт Excel</router-link>
          </nav>
        </div>
        <router-link to="/admin/login" class="px-4 py-2 text-gray-600 hover:text-red-600">
          Выход
        </router-link>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Продукты</h1>
        <button class="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Добавить продукт
        </button>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Поиск по SKU или названию..."
            class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            @click="handleSearch"
            class="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Поиск
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Наличие</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                Загрузка...
              </td>
            </tr>
            <tr v-else v-for="product in products" :key="product.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm font-mono text-gray-600">{{ product.sku }}</td>
              <td class="px-6 py-4">
                <div class="font-medium">{{ product.nameRu }}</div>
                <div class="text-sm text-gray-500">{{ product.slogan }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ product.subcategory?.nameRu }}
              </td>
              <td class="px-6 py-4 text-sm">
                ${{ product.priceMinUsd }} - ${{ product.priceMaxUsd }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    product.availability === 'in_stock' ? 'bg-green-100 text-green-800' :
                    product.availability === 'low_stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.availability === 'in_stock' ? 'В наличии' :
                     product.availability === 'low_stock' ? 'Мало' : 'Нет' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <button class="text-brand-blue hover:underline mr-3">Ред.</button>
                <button
                  @click="deleteProduct(product.id)"
                  class="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-6">
        <button
          @click="handlePageChange(page - 1)"
          :disabled="page === 1"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          ← Назад
        </button>
        <span class="text-gray-600">
          Страница {{ page }} из {{ totalPages }} ({{ total }} продуктов)
        </span>
        <button
          @click="handlePageChange(page + 1)"
          :disabled="page === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          Вперед →
        </button>
      </div>
    </main>
  </div>
</template>
