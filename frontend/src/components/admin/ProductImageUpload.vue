<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  productId: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'
const token = localStorage.getItem('admin_token')

const images = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)
const dragOver = ref(false)
const fileInput = ref(null)

const loadImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/${props.productId}/images`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    images.value = response.data || []
    emit('update:modelValue', images.value)
  } catch (error) {
    console.error('Error loading images:', error)
  }
}

const handleFileSelect = async (files) => {
  if (!files || files.length === 0) return

  uploading.value = true
  uploadProgress.value = 0

  const formData = new FormData()
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      formData.append('files', file)
    }
  })

  try {
    const response = await axios.post(
      `${API_URL}/products/${props.productId}/images`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
    )
    
    images.value = [...images.value, ...response.data]
    emit('update:modelValue', images.value)
    
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (error) {
    console.error('Error uploading images:', error)
    alert('Ошибка при загрузке изображений: ' + (error.response?.data?.message || error.message))
  } finally {
    uploading.value = false
    uploadProgress.value = 0
  }
}

const onDrop = async (e) => {
  e.preventDefault()
  dragOver.value = false
  await handleFileSelect(e.dataTransfer.files)
}

const onDragOver = (e) => {
  e.preventDefault()
  dragOver.value = true
}

const onDragLeave = () => {
  dragOver.value = false
}

const setPrimary = async (imageId) => {
  try {
    await axios.put(
      `${API_URL}/products/${props.productId}/images/${imageId}/primary`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    await loadImages()
  } catch (error) {
    console.error('Error setting primary image:', error)
  }
}

const deleteImage = async (imageId) => {
  if (!confirm('Вы уверены, что хотите удалить это изображение?')) return

  try {
    await axios.delete(
      `${API_URL}/products/${props.productId}/images/${imageId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    images.value = images.value.filter(img => img.id !== imageId)
    emit('update:modelValue', images.value)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
}

const getPrimaryImage = () => {
  return images.value.find(img => img.isPrimary) || images.value[0]
}

watch(() => props.productId, () => {
  loadImages()
})

onMounted(() => {
  loadImages()
})

defineExpose({ getPrimaryImage, loadImages })
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Изображения продукта</h3>
      <label
        class="inline-flex items-center px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': uploading }"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {{ uploading ? 'Загрузка...' : 'Загрузить фото' }}
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleFileSelect($event.target.files)"
          :disabled="uploading"
        />
      </label>
    </div>

    <!-- Upload Progress -->
    <div v-if="uploading" class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-brand-red h-2.5 rounded-full transition-all duration-300"
        :style="{ width: uploadProgress + '%' }"
      ></div>
      <p class="text-sm text-gray-600 mt-1">Загрузка: {{ uploadProgress }}%</p>
    </div>

    <!-- Drop Zone -->
    <div
      class="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
      :class="[
        dragOver ? 'border-brand-red bg-red-50' : 'border-gray-300 hover:border-brand-red hover:bg-gray-50',
        uploading ? 'opacity-50 pointer-events-none' : ''
      ]"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="mt-2 text-sm text-gray-600">
        <span class="font-medium text-brand-red">Нажмите для загрузки</span> или перетащите файлы
      </p>
      <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WEBP до 10MB</p>
    </div>

    <!-- Images Grid -->
    <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        class="relative group aspect-square rounded-lg overflow-hidden border-2 transition-colors"
        :class="image.isPrimary ? 'border-brand-red' : 'border-gray-200'"
      >
        <img
          :src="image.imageUrl"
          :alt="image.altText || 'Product image'"
          class="w-full h-full object-cover"
        />
        
        <!-- Primary Badge -->
        <div v-if="image.isPrimary" class="absolute top-2 left-2 px-2 py-1 bg-brand-red text-white text-xs rounded">
          Главное
        </div>

        <!-- Actions Overlay -->
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            v-if="!image.isPrimary"
            @click="setPrimary(image.id)"
            class="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            title="Сделать главным"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            @click="deleteImage(image.id)"
            class="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            title="Удалить"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Sort Order -->
        <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
          #{{ image.sortOrder }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!uploading" class="text-center py-12 text-gray-500">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-2">Нет изображений</p>
    </div>
  </div>
</template>
