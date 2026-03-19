<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const primaryImage = computed(() => {
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images.find(img => img.isPrimary) || props.product.images[0]
  }
  return null
})

const imageUrl = computed(() => {
  return primaryImage.value?.imageUrl || null
})

const productUrl = computed(() => {
  return `/product/${props.product.slug}`
})

const navigateToProduct = () => {
  router.push(productUrl.value)
}
</script>

<template>
  <div
    class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    @click="navigateToProduct"
  >
    <!-- Image Container -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <!-- Product Image -->
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="product.nameRu"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      
      <!-- Fallback Placeholder SVG -->
      <div v-else class="w-full h-full flex items-center justify-center p-8">
        <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span
          v-if="product.isNew"
          class="px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-full"
        >
          NEW
        </span>
        <span
          v-if="product.isFeatured"
          class="px-3 py-1 bg-brand-blue text-white text-xs font-bold rounded-full"
        >
          HIT
        </span>
      </div>

      <!-- Availability Badge -->
      <div
        v-if="product.availability === 'in_stock'"
        class="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full"
      >
        В наличии
      </div>
      <div
        v-else-if="product.availability === 'low_stock'"
        class="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full"
      >
        Мало
      </div>
      <div
        v-else
        class="absolute top-3 right-3 px-3 py-1 bg-gray-500 text-white text-xs font-bold rounded-full"
      >
        Нет
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- SKU -->
      <div class="text-xs text-gray-500 mb-1">Арт. {{ product.sku }}</div>
      
      <!-- Name -->
      <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
        {{ product.nameRu }}
      </h3>

      <!-- Price Range -->
      <div v-if="product.priceMinUsd" class="flex items-baseline gap-2 mb-2">
        <span class="text-lg font-bold text-brand-red">
          ${{ product.priceMinUsd.toFixed(2) }}
        </span>
        <span v-if="product.priceMaxUsd && product.priceMaxUsd !== product.priceMinUsd" class="text-sm text-gray-500">
          - ${{ product.priceMaxUsd.toFixed(2) }}
        </span>
        <span class="text-xs text-gray-500">/ шт</span>
      </div>

      <!-- MOQ -->
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <span>Мин. заказ: {{ product.moq }} шт</span>
      </div>

      <!-- Age Recommendation -->
      <div v-if="product.recommendedAge" class="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ product.recommendedAge }}+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
