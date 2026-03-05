<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const file = ref(null)
const uploading = ref(false)
const result = ref(null)
const error = ref(null)
const updateExisting = ref(true)
const createCategories = ref(true)

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  result.value = null
  error.value = null
}

const handleUpload = async () => {
  if (!file.value) {
    error.value = 'Выберите файл'
    return
  }

  uploading.value = true
  error.value = null
  result.value = null

  try {
    const formData = new FormData()
    formData.append('file', file.value)
    formData.append('updateExisting', updateExisting.value)
    formData.append('createCategories', createCategories.value)

    const response = await axios.post(`${API_URL}/import/excel`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    result.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка при загрузке'
  } finally {
    uploading.value = false
  }
}

const downloadTemplate = () => {
  // Создаем пример Excel файла
  const headers = [
    'sku', 'name_ru', 'name_en', 'category', 'subcategory',
    'description_ru', 'age', 'material', 'weight_kg', 'dimensions',
    'packaging', 'moq', 'price_min_usd', 'price_max_usd', 'image_url'
  ]
  
  const example = [
    'TB-007', 'RIFLE AK', 'RIFLE AK', 'Транспорт', 'Военная техника',
    'Игрушечная винтовка', '3+', 'ABS-пластик', '0.8', '45x15x10 см',
    'Цветная коробка', '100', '5.50', '8.00', 'https://...'
  ]

  const csvContent = [headers.join(','), example.join(',')].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'import_template.csv'
  a.click()
  window.URL.revokeObjectURL(url)
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
            <router-link to="/admin" class="text-gray-600 hover:text-brand-blue">Dashboard</router-link>
            <router-link to="/admin/products" class="text-gray-600 hover:text-brand-blue">Продукты</router-link>
            <router-link to="/admin/categories" class="text-gray-600 hover:text-brand-blue">Категории</router-link>
            <router-link to="/admin/products/import" class="text-brand-blue font-medium">Импорт Excel</router-link>
          </nav>
        </div>
        <router-link to="/admin/login" class="px-4 py-2 text-gray-600 hover:text-red-600">
          Выход
        </router-link>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Импорт каталога из Excel</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Upload Section -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Загрузка файла</h2>

          <!-- File Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Excel файл (.xlsx, .xls)
            </label>
            <input
              type="file"
              @change="handleFileChange"
              accept=".xlsx,.xls"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <p class="mt-2 text-sm text-gray-500">
              Макс. размер: 10 MB
            </p>
          </div>

          <!-- Options -->
          <div class="space-y-3 mb-6">
            <label class="flex items-center">
              <input
                v-model="updateExisting"
                type="checkbox"
                class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
              />
              <span class="ml-2 text-sm text-gray-700">
                Обновлять существующие продукты (по SKU)
              </span>
            </label>
            <label class="flex items-center">
              <input
                v-model="createCategories"
                type="checkbox"
                class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
              />
              <span class="ml-2 text-sm text-gray-700">
                Создавать новые категории если не найдены
              </span>
            </label>
          </div>

          <!-- Buttons -->
          <div class="flex gap-4">
            <button
              @click="handleUpload"
              :disabled="!file || uploading"
              class="flex-grow px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ uploading ? 'Загрузка...' : 'Начать импорт' }}
            </button>
            <button
              @click="downloadTemplate"
              class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Шаблон CSV
            </button>
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
          >
            {{ error }}
          </div>
        </div>

        <!-- Result Section -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Результаты импорта</h2>

          <div v-if="!result && !error" class="text-center py-12 text-gray-500">
            <div class="text-4xl mb-4">📊</div>
            <p>Результаты появятся здесь после импорта</p>
          </div>

          <div v-if="result" class="space-y-4">
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="font-semibold text-green-800 mb-2">
                {{ result.success ? '✅ Импорт завершен' : '⚠️ Импорт завершен с ошибками' }}
              </div>
              <div class="text-sm text-green-700">
                <div>Файл: {{ result.fileName }}</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">{{ result.created }}</div>
                <div class="text-sm text-blue-700">Создано</div>
              </div>
              <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="text-2xl font-bold text-yellow-600">{{ result.updated }}</div>
                <div class="text-sm text-yellow-700">Обновлено</div>
              </div>
            </div>

            <div v-if="result.errors?.length > 0" class="mt-4">
              <h3 class="font-semibold mb-2">Ошибки ({{ result.errors.length }})</h3>
              <div class="max-h-64 overflow-y-auto space-y-2">
                <div
                  v-for="(err, index) in result.errors"
                  :key="index"
                  class="p-3 bg-red-50 border border-red-200 rounded text-sm"
                >
                  <span class="font-medium">Строка {{ err.row }}:</span> {{ err.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Инструкция по заполнению</h2>
        <div class="prose max-w-none text-gray-700">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-50">
                <th class="border p-2 text-left">Колонка</th>
                <th class="border p-2 text-left">Обязательно</th>
                <th class="border p-2 text-left">Описание</th>
                <th class="border p-2 text-left">Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border p-2 font-mono text-sm">sku</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Артикул товара (уникальный)</td>
                <td class="border p-2 font-mono text-sm">TB-007</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">name_ru</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Название на русском</td>
                <td class="border p-2">RIFLE AK</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">category</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Категория</td>
                <td class="border p-2">Транспорт</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">subcategory</td>
                <td class="border p-2 text-green-600">✅ Да</td>
                <td class="border p-2">Подкатегория</td>
                <td class="border p-2">Военная техника</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">age</td>
                <td class="border p-2 text-gray-400">Нет</td>
                <td class="border p-2">Возрастная группа</td>
                <td class="border p-2">3+</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">material</td>
                <td class="border p-2 text-gray-400">Нет</td>
                <td class="border p-2">Материал</td>
                <td class="border p-2">ABS-пластик</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">price_min_usd</td>
                <td class="border p-2 text-gray-400">Нет</td>
                <td class="border p-2">Минимальная цена</td>
                <td class="border p-2">5.50</td>
              </tr>
              <tr>
                <td class="border p-2 font-mono text-sm">moq</td>
                <td class="border p-2 text-gray-400">Нет</td>
                <td class="border p-2">Минимальный заказ</td>
                <td class="border p-2">100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
