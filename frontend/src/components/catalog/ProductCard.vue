<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const primaryImage = computed(() => {
  return props.product.images?.find(img => img.isPrimary)?.imageUrl || '/images/placeholder.png'
})

const priceRange = computed(() => {
  const { priceMinUsd, priceMaxUsd } = props.product
  if (priceMinUsd && priceMaxUsd && priceMinUsd !== priceMaxUsd) {
    return `$${priceMinUsd} - $${priceMaxUsd}`
  }
  return priceMinUsd ? `$${priceMinUsd}` : 'По запросу'
})

const navigateToProduct = () => {
  router.push(`/product/${props.product.slug}`)
}
</script>

<template>
  <div 
    @click="navigateToProduct"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img
        :src="primaryImage"
        :alt="product.nameRu"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span
          v-if="product.isNew"
          class="px-2 py-1 bg-brand-red text-white text-xs font-semibold rounded"
        >
          NEW
        </span>
        <span
          v-if="product.isFeatured"
          class="px-2 py-1 bg-brand-yellow text-gray-900 text-xs font-semibold rounded"
        >
          HIT
        </span>
      </div>
      <!-- Availability Badge -->
      <div class="absolute top-2 right-2">
        <span
          v-if="product.availability === 'in_stock'"
          class="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded"
        >
          В наличии
        </span>
        <span
          v-else-if="product.availability === 'low_stock'"
          class="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded"
        >
          Мало
        </span>
        <span
          v-else
          class="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded"
        >
          Нет
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- SKU -->
      <div class="text-xs text-gray-500 mb-1">{{ product.sku }}</div>
      
      <!-- Name -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
        {{ product.nameRu }}
      </h3>

      <!-- Category -->
      <div class="text-xs text-gray-500 mb-2">
        {{ product.subcategory?.nameRu }}
      </div>

      <!-- Age & Material -->
      <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <span v-if="product.recommendedAge">👶 {{ product.recommendedAge }}</span>
        <span v-if="product.material">• {{ product.material }}</span>
      </div>

      <!-- Price and MOQ -->
      <div class="flex items-center justify-between">
        <div class="text-lg font-bold text-brand-blue">
          {{ priceRange }}
        </div>
        <div class="text-xs text-gray-500">
          MOQ: {{ product.moq }} шт
        </div>
      </div>
    </div>
  </div>
</template>
