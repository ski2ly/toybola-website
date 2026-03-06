<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Badge, Image } from '@/components/ui'

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

const availabilityConfig = computed(() => {
  switch (props.product.availability) {
    case 'in_stock':
      return { label: 'В наличии', variant: 'success' }
    case 'low_stock':
      return { label: 'Мало', variant: 'warning' }
    default:
      return { label: 'Нет', variant: 'danger' }
  }
})
</script>

<template>
  <div
    class="group cursor-pointer animate-fade-in-up"
    @click="navigateToProduct"
  >
    <Card variant="interactive" padding="none" class="overflow-hidden h-full">
      <!-- Image Container -->
      <div class="relative overflow-hidden">
        <Image
          :src="primaryImage"
          :alt="product.nameRu"
          aspect-ratio="square"
          class="transform group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        <!-- Overlay on hover -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge v-if="product.isNew" variant="danger" size="sm">NEW</Badge>
          <Badge v-if="product.isFeatured" variant="warning" size="sm" class="text-gray-900">HIT</Badge>
        </div>
        
        <!-- Availability Badge -->
        <div class="absolute top-3 right-3">
          <Badge :variant="availabilityConfig.variant" size="sm">
            {{ availabilityConfig.label }}
          </Badge>
        </div>

        <!-- View Button (appears on hover) -->
        <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            class="w-full py-3 bg-white/95 backdrop-blur-sm text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <span>Смотреть товар</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-5">
        <!-- SKU -->
        <div class="text-xs text-gray-400 font-mono mb-2">{{ product.sku }}</div>

        <!-- Name -->
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-red transition-colors duration-300 min-h-[3rem]">
          {{ product.nameRu }}
        </h3>

        <!-- Category -->
        <div class="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          {{ product.subcategory?.nameRu || product.category?.nameRu || 'Категория не указана' }}
        </div>

        <!-- Age & Material -->
        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
          <span v-if="product.recommendedAge" class="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ product.recommendedAge }}
          </span>
          <span v-if="product.material" class="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            {{ product.material }}
          </span>
        </div>

        <!-- Price and MOQ -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="text-xl font-bold text-brand-blue">
            {{ priceRange }}
          </div>
          <div class="text-xs text-gray-500 font-medium">
            MOQ: {{ product.moq }} шт
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
