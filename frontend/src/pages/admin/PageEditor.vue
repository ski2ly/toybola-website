<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import axios from 'axios'

const props = defineProps({
  page: {
    type: String,
    required: true
  }
})

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const pageNames = {
  about: 'О компании',
  contacts: 'Контакты',
  production: 'Производство'
}

const pageTitle = pageNames[props.page] || props.page
const blocks = ref([])
const loading = ref(true)

const blockTypes = [
  { value: 'hero', label: 'Hero (главный баннер)' },
  { value: 'stats', label: 'Статистика' },
  { value: 'partners', label: 'Партнеры' },
  { value: 'factory', label: 'Производство' },
  { value: 'export', label: 'Экспорт' },
  { value: 'contact_form', label: 'Форма связи' },
  { value: 'text', label: 'Текстовый блок' },
  { value: 'image', label: 'Изображение' },
  { value: 'products', label: 'Продукты' }
]

const bgColorOptions = [
  { value: 'white', label: 'Белый' },
  { value: 'gray', label: 'Серый' },
  { value: 'gradient', label: 'Градиент' }
]

const paddingOptions = [
  { value: 'sm', label: 'Маленький' },
  { value: 'md', label: 'Средний' },
  { value: 'lg', label: 'Большой' },
  { value: 'xl', label: 'Очень большой' }
]

const editingBlock = ref(null)
const showAddBlock = ref(false)
const newBlock = ref({
  blockType: 'text',
  title: '',
  content: '{}',
  bgColor: 'white',
  paddingTop: 'lg',
  paddingBottom: 'lg'
})

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/page-blocks/${props.page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    blocks.value = response.data
  } catch (error) {
    console.error('Error loading page blocks:', error)
    blocks.value = []
  } finally {
    loading.value = false
  }
})

const addBlock = async () => {
  try {
    const maxOrder = blocks.value.length > 0 ? Math.max(...blocks.value.map(b => b.order || 0)) : 0
    const response = await axios.post(
      `${API_URL}/admin/page-blocks`,
      {
        ...newBlock.value,
        page: props.page,
        order: maxOrder + 1,
        isEnabled: true
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    blocks.value.push(response.data)
    showAddBlock.value = false
    newBlock.value = {
      blockType: 'text',
      title: '',
      content: '{}',
      bgColor: 'white',
      paddingTop: 'lg',
      paddingBottom: 'lg'
    }
  } catch (error) {
    console.error('Error adding block:', error)
  }
}

const updateBlock = async (block) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/page-blocks/${block.id}`,
      block,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    Object.assign(block, response.data)
    editingBlock.value = null
  } catch (error) {
    console.error('Error updating block:', error)
  }
}

const deleteBlock = async (blockId) => {
  if (!confirm('Удалить этот блок?')) return
  try {
    await axios.delete(`${API_URL}/admin/page-blocks/${blockId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    blocks.value = blocks.value.filter(b => b.id !== blockId)
  } catch (error) {
    console.error('Error deleting block:', error)
  }
}

const toggleBlockStatus = async (block) => {
  try {
    const response = await axios.patch(
      `${API_URL}/admin/page-blocks/${block.id}/status`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    block.isEnabled = response.data.isEnabled
  } catch (error) {
    console.error('Error toggling block:', error)
  }
}

const moveBlock = async (index, direction) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= blocks.value.length) return

  const temp = blocks.value[index].order
  blocks.value[index].order = blocks.value[newIndex].order
  blocks.value[newIndex].order = temp

  await updateBlock(blocks.value[index])
  await updateBlock(blocks.value[newIndex])

  blocks.value.sort((a, b) => a.order - b.order)
}
</script>

<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-gray-900 mb-2">Редактирование: {{ pageTitle }}</h1>
          <p class="text-gray-600">Управление блоками страницы</p>
        </div>
        <button
          @click="showAddBlock = true"
          class="px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Добавить блок
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-xl text-gray-600">Загрузка...</div>
      </div>

      <!-- Blocks List -->
      <div v-else class="space-y-4">
        <div
          v-for="(block, index) in blocks"
          :key="block.id"
          :class="[
            'bg-white rounded-xl shadow-md overflow-hidden transition-all',
            !block.isEnabled && 'opacity-50'
          ]"
        >
          <!-- Block Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <div class="flex items-center gap-4">
              <span class="text-sm font-semibold text-gray-500">#{{ index + 1 }}</span>
              <h3 class="text-lg font-bold text-gray-900">{{ block.title }}</h3>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {{ blockTypes.find(t => t.value === block.blockType)?.label || block.blockType }}
              </span>
              <span :class="[
                'px-3 py-1 text-xs rounded-full',
                block.isEnabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              ]">
                {{ block.isEnabled ? 'Активен' : 'Скрыт' }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="moveBlock(index, -1)"
                :disabled="index === 0"
                class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Вверх"
              >
                ↑
              </button>
              <button
                @click="moveBlock(index, 1)"
                :disabled="index === blocks.length - 1"
                class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Вниз"
              >
                ↓
              </button>
              <button
                @click="toggleBlockStatus(block)"
                class="p-2 rounded-lg hover:bg-gray-100"
                :title="block.isEnabled ? 'Скрыть' : 'Показать'"
              >
                {{ block.isEnabled ? '👁️' : '👁️‍🗨️' }}
              </button>
              <button
                @click="editingBlock = editingBlock === block.id ? null : block.id"
                class="p-2 rounded-lg hover:bg-gray-100"
                title="Редактировать"
              >
                ✏️
              </button>
              <button
                @click="deleteBlock(block.id)"
                class="p-2 rounded-lg hover:bg-red-50 text-red-600"
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- Block Edit Form -->
          <div v-if="editingBlock === block.id" class="p-4 space-y-4 border-t">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  v-model="block.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="Название блока"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Тип блока</label>
                <select
                  v-model="block.blockType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option v-for="type in blockTypes" :key="type.value" :value="type.value">
                    {{ type.label }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Контент (JSON)</label>
              <textarea
                v-model="block.content"
                rows="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-sm"
                placeholder='{"title": "Заголовок", "text": "Текст"}'
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Фон</label>
                <select
                  v-model="block.bgColor"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option v-for="opt in bgColorOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Отступ сверху</label>
                <select
                  v-model="block.paddingTop"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Отступ снизу</label>
                <select
                  v-model="block.paddingBottom"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option v-for="opt in paddingOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button
                @click="updateBlock(block)"
                class="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Сохранить
              </button>
              <button
                @click="editingBlock = null"
                class="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="blocks.length === 0" class="bg-white rounded-xl shadow-md p-12 text-center">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Нет блоков</h3>
          <p class="text-gray-600 mb-6">Добавьте первый блок для редактиения страницы</p>
          <button
            @click="showAddBlock = true"
            class="px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Добавить блок
          </button>
        </div>
      </div>

      <!-- Add Block Modal -->
      <div v-if="showAddBlock" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
          <h3 class="text-xl font-bold text-gray-900 mb-4">Добавить новый блок</h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Название</label>
              <input
                v-model="newBlock.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="Название блока"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Тип блока</label>
              <select
                v-model="newBlock.blockType"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option v-for="type in blockTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Контент (JSON)</label>
              <textarea
                v-model="newBlock.content"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono text-sm"
                placeholder='{"title": "Заголовок", "text": "Текст"}'
              ></textarea>
            </div>

            <div class="flex gap-2 pt-2">
              <button
                @click="addBlock"
                class="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Добавить
              </button>
              <button
                @click="showAddBlock = false"
                class="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
