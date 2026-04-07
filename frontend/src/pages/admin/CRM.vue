<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { contactFormService } from '@/services'
import { Badge } from '@/components/ui'

const submissions = ref([])
const stats = ref({ new: 0, in_progress: 0, completed: 0, total: 0 })
const loading = ref(true)
const selectedStatus = ref('all')
const selectedTopic = ref('all')

const statusOptions = [
  { value: 'all', label: 'Все', color: 'gray' },
  { value: 'new', label: 'Новые', color: 'blue' },
  { value: 'in_progress', label: 'В работе', color: 'yellow' },
  { value: 'completed', label: 'Завершено', color: 'green' },
  { value: 'archived', label: 'Архив', color: 'gray' },
]

const topicOptions = [
  { value: 'all', label: 'Все темы' },
  { value: 'cooperation', label: 'Сотрудничество' },
  { value: 'wholesale', label: 'Оптовый заказ' },
  { value: 'question', label: 'Вопрос по продукции' },
  { value: 'support', label: 'Техническая поддержка' },
  { value: 'other', label: 'Другое' },
]

const statusColors = {
  new: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Завершено',
  archived: 'Архив',
}

const topicLabels = {
  cooperation: 'Сотрудничество',
  wholesale: 'Оптовый заказ',
  question: 'Вопрос по продукции',
  support: 'Техническая поддержка',
  other: 'Другое',
}

const fetchStats = async () => {
  try {
    const response = await contactFormService.getStats()
    stats.value = response.data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const fetchSubmissions = async () => {
  loading.value = true
  try {
    const params = {}
    if (selectedStatus.value !== 'all') params.status = selectedStatus.value
    if (selectedTopic.value !== 'all') params.topic = selectedTopic.value

    const response = await contactFormService.getAll(params)
    submissions.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching submissions:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchSubmissions(), fetchStats()])
})

const updateStatus = async (id, status) => {
  try {
    await contactFormService.updateStatus(id, status)
    await fetchSubmissions()
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

const deleteSubmission = async (id) => {
  if (!confirm('Вы уверены что хотите удалить эту заявку?')) return
  
  try {
    await contactFormService.delete(id)
    await fetchSubmissions()
  } catch (error) {
    console.error('Error deleting submission:', error)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Заявки CRM</h1>
        <p class="text-gray-600">Управление заявками с контактной формы</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <div class="text-sm text-gray-500 mb-1">Новые</div>
          <div class="text-3xl font-bold text-blue-600">
            {{ stats.new }}
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <div class="text-sm text-gray-500 mb-1">В работе</div>
          <div class="text-3xl font-bold text-yellow-600">
            {{ stats.in_progress }}
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div class="text-sm text-gray-500 mb-1">Завершено</div>
          <div class="text-3xl font-bold text-green-600">
            {{ stats.completed }}
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-gray-500">
          <div class="text-sm text-gray-500 mb-1">Всего</div>
          <div class="text-3xl font-bold text-gray-600">
            {{ stats.total }}
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              v-model="selectedStatus"
              @change="fetchSubmissions"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8]"
            >
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Тема</label>
            <select
              v-model="selectedTopic"
              @change="fetchSubmissions"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8]"
            >
              <option v-for="option in topicOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Submissions Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Клиент
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тема
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сообщение
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-12 text-center">
                  <div class="text-gray-500">Загрузка...</div>
                </td>
              </tr>
              <tr v-else-if="submissions.length === 0">
                <td colspan="7" class="px-6 py-12 text-center">
                  <div class="text-6xl mb-4">📭</div>
                  <div class="text-gray-500">Заявок пока нет</div>
                </td>
              </tr>
              <tr
                v-for="submission in submissions"
                :key="submission.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{{ submission.id }}
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ submission.name }}</div>
                  <div class="text-sm text-gray-500">{{ submission.phone }}</div>
                  <div v-if="submission.email" class="text-sm text-gray-500">{{ submission.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge variant="info">
                    {{ topicLabels[submission.topic] || submission.topic }}
                  </Badge>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate" :title="submission.message">
                    {{ submission.message || '—' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <select
                    v-model="submission.status"
                    @change="updateStatus(submission.id, $event.target.value)"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer',
                      statusColors[submission.status]
                    ]"
                  >
                    <option value="new">Новая</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершено</option>
                    <option value="archived">Архив</option>
                  </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(submission.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="deleteSubmission(submission.id)"
                    class="text-red-600 hover:text-red-900 transition-colors"
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
    </div>
  </AdminLayout>
</template>
