<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from 'axios'
import { Badge, Button } from '@/components/ui'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const page = ref(1)
const totalPages = ref(1)
const total = ref(0)

// Edit modal
const showEditModal = ref(false)
const editingProduct = ref(null)
const formData = ref({
  sku: '',
  nameRu: '',
  nameEn: '',
  nameUz: '',
  descriptionRu: '',
  descriptionEn: '',
  dimensions: '',
  weightKg: null,
  recommendedAge: '',
  material: '',
  moq: 1,
  priceMinUsd: null,
  priceMaxUsd: null,
  availability: 'in_stock',
  isFeatured: false,
  isNew: false
})

const showAdvanced = ref(false)

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: page.value,
        limit: 20,
        search: searchQuery.value
      }
    })
    products.value = response.data.data || response.data
    if (response.data.meta) {
      page.value = response.data.meta.page
      totalPages.value = response.data.meta.totalPages
      total.value = response.data.meta.total
    }
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
    await axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Ошибка при удалении')
  }
}

const openEditModal = (product) => {
  editingProduct.value = product
  formData.value = {
    sku: product.sku,
    nameRu: product.nameRu,
    nameEn: product.nameEn || '',
    nameUz: product.nameUz || '',
    descriptionRu: product.descriptionRu || '',
    descriptionEn: product.descriptionEn || '',
    dimensions: product.dimensions || '',
    weightKg: product.weightKg,
    recommendedAge: product.recommendedAge || '',
    material: product.material || '',
    moq: product.moq,
    priceMinUsd: product.priceMinUsd,
    priceMaxUsd: product.priceMaxUsd,
    availability: product.availability,
    isFeatured: product.isFeatured,
    isNew: product.isNew
  }
  showEditModal.value = true
  showAdvanced.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingProduct.value = null
}

const submitEdit = async () => {
  try {
    const payload = {
      ...formData.value,
      weightKg: formData.value.weightKg ? Number(formData.value.weightKg) : null,
      priceMinUsd: formData.value.priceMinUsd ? Number(formData.value.priceMinUsd) : null,
      priceMaxUsd: formData.value.priceMaxUsd ? Number(formData.value.priceMaxUsd) : null,
      moq: Number(formData.value.moq) || 1
    }
    
    await axios.put(`${API_URL}/products/${editingProduct.value.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    closeEditModal()
    fetchProducts()
  } catch (error) {
    console.error('Error saving product:', error)
    alert('Ошибка при сохранении: ' + (error.response?.data?.message || error.message))
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Продукты</h1>
        <p class="text-gray-600">Управление каталогом товаров (всего: {{ total }})</p>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Поиск по названию или SKU..."
            class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8]"
          />
          <Button @click="handleSearch" variant="primary">Найти</Button>
          <Button @click="() => { searchQuery = ''; fetchProducts() }" variant="outline">Сброс</Button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Товар
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="5" class="px-6 py-12 text-center">
                  <div class="text-gray-500">Загрузка...</div>
                </td>
              </tr>
              <tr v-else-if="products.length === 0">
                <td colspan="5" class="px-6 py-12 text-center">
                  <div class="text-6xl mb-4">📦</div>
                  <div class="text-gray-500">Продуктов пока нет</div>
                  <p class="text-sm text-gray-400 mt-2">Загрузите товары через импорт Excel</p>
                </td>
              </tr>
              <tr
                v-for="product in products"
                :key="product.id"
                class="hover:bg-gray-50 transition-all animate-slide-in-right"
              >
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ product.nameRu }}</div>
                  <div v-if="product.descriptionRu" class="text-sm text-gray-500 truncate max-w-xs">
                    {{ product.descriptionRu }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <code class="text-sm bg-gray-100 px-2 py-1 rounded">{{ product.sku }}</code>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="product.priceMinUsd" class="text-sm text-gray-900">
                    ${{ product.priceMinUsd }} - ${{ product.priceMaxUsd || product.priceMinUsd }}
                  </div>
                  <div v-else class="text-sm text-gray-400">—</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2">
                    <Badge v-if="product.isFeatured" variant="info">Хит</Badge>
                    <Badge v-if="product.isNew" variant="success">Новинка</Badge>
                    <Badge
                      :variant="product.availability === 'in_stock' ? 'success' : product.availability === 'low_stock' ? 'warning' : 'danger'"
                    >
                      {{ product.availability === 'in_stock' ? 'В наличии' : product.availability === 'low_stock' ? 'Мало' : 'Нет' }}
                    </Badge>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openEditModal(product)"
                    class="text-[#77CED8] hover:text-[#5FB8C2] transition-colors mr-4 inline-flex items-center gap-1"
                    title="Редактировать"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="text-red-600 hover:text-red-900 transition-colors inline-flex items-center"
                    title="Удалить"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-6">
        <div class="text-sm text-gray-600">
          Страница {{ page }} из {{ totalPages }}
        </div>
        <div class="flex gap-2">
          <Button
            @click="handlePageChange(page - 1)"
            :disabled="page <= 1"
            variant="outline"
          >
            Назад
          </Button>
          <Button
            @click="handlePageChange(page + 1)"
            :disabled="page >= totalPages"
            variant="outline"
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      @click="closeEditModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        @click.stop
        class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in-up"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900">
            Редактировать продукт
          </h2>
          <button
            @click="closeEditModal"
            class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <!-- Basic Info -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#77CED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Основная информация
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Артикул (SKU)
                </label>
                <input
                  v-model="formData.sku"
                  type="text"
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Название (RU) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.nameRu"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Название (EN)
                </label>
                <input
                  v-model="formData.nameEn"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Название (UZ)
                </label>
                <input
                  v-model="formData.nameUz"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Price & Stock -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#77CED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Цена и наличие
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Цена от ($)
                </label>
                <input
                  v-model="formData.priceMinUsd"
                  type="number"
                  step="0.01"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Цена до ($)
                </label>
                <input
                  v-model="formData.priceMaxUsd"
                  type="number"
                  step="0.01"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Мин. заказ (шт)
                </label>
                <input
                  v-model="formData.moq"
                  type="number"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Options -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#77CED8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
              </svg>
              Опции
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <label class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <input
                  v-model="formData.isFeatured"
                  type="checkbox"
                  class="w-4 h-4 text-[#77CED8] focus:ring-[#77CED8] rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Хит продаж</span>
              </label>
              <label class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                <input
                  v-model="formData.isNew"
                  type="checkbox"
                  class="w-4 h-4 text-[#77CED8] focus:ring-[#77CED8] rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Новинка</span>
              </label>
            </div>
          </div>

          <!-- Additional Fields Toggle -->
          <div class="pt-4 border-t">
            <button
              @click="showAdvanced = !showAdvanced"
              class="flex items-center gap-2 text-sm text-[#77CED8] hover:text-[#5FB8C2] transition-all font-medium"
            >
              <svg 
                :class="['w-4 h-4 transform transition-transform', showAdvanced ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
              {{ showAdvanced ? 'Скрыть дополнительные поля' : 'Показать дополнительные поля' }}
            </button>
            
            <div v-show="showAdvanced" class="mt-4 space-y-4 animate-fade-in">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Возраст
                  </label>
                  <input
                    v-model="formData.recommendedAge"
                    type="text"
                    placeholder="3+, 6+"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Материал
                  </label>
                  <input
                    v-model="formData.material"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Размеры (ДxШxВ см)
                  </label>
                  <input
                    v-model="formData.dimensions"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Вес (кг)
                  </label>
                  <input
                    v-model="formData.weightKg"
                    type="number"
                    step="0.001"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <Button @click="closeEditModal" variant="outline">
            Отмена
          </Button>
          <Button @click="submitEdit" variant="primary">
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
