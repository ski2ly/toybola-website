<script setup>
import { ref } from 'vue'

defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  aspectRatio: {
    type: String,
    default: 'square'
  },
  objectFit: {
    type: String,
    default: 'cover'
  }
})

const imageLoaded = ref(false)
const imageError = ref(false)

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]'
}
</script>

<template>
  <div :class="[aspectRatioClasses[aspectRatio], 'relative overflow-hidden bg-gray-100']">
    <img
      v-if="!imageError"
      :src="src"
      :alt="alt"
      :class="[
        'w-full h-full transition-all duration-500',
        objectFit === 'cover' ? 'object-cover' : 'object-contain',
        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      ]"
      loading="lazy"
      @load="imageLoaded = true"
      @error="imageError = true"
    />
    <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100">
      <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
  </div>
</template>
