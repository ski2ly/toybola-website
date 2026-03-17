<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Card, Badge, Image } from '@/components/ui'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cardRef = ref(null)

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

// Magnetic effect for card
const handleMousemove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  
  cardRef.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
}

const handleMouseleave = () => {
  if (!cardRef.value) return
  cardRef.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
}
</script>

<template>
  <div
    ref="cardRef"
    class="group cursor-pointer animate-fade-in-up"
    @click="navigateToProduct"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <Card variant="interactive" padding="none" class="overflow-hidden h-full card-lift border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
      <!-- Image Container -->
      <div class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          :src="primaryImage"
          :alt="product.nameRu"
          aspect-ratio="square"
          class="transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        <!-- Shine effect on hover -->
        <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <!-- Overlay on hover -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-2 z-10">
          <Badge v-if="product.isNew" variant="danger" size="sm" class="shadow-lg animate-pulse">NEW</Badge>
          <Badge v-if="product.isFeatured" variant="warning" size="sm" class="text-gray-900 shadow-lg">HIT</Badge>
        </div>

        <!-- Availability Badge -->
        <div class="absolute top-3 right-3 z-10">
          <Badge :variant="availabilityConfig.variant" size="sm" class="shadow-lg backdrop-blur-sm">
            {{ availabilityConfig.label }}
          </Badge>
        </div>

        <!-- Quick Actions (appears on hover) -->
        <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
          <button
            class="w-full py-3.5 bg-gradient-to-r from-brand-red to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-brand-red transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>Смотреть товар</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>

        <!-- Corner accent -->
        <div class="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-br from-brand-blue/20 to-brand-red/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      </div>

      <!-- Content -->
      <div class="p-5 bg-white">
        <!-- SKU -->
        <div class="text-xs text-gray-400 font-mono mb-2 flex items-center gap-2">
          <span class="inline-block w-6 h-px bg-gray-300"></span>
          {{ product.sku }}
        </div>

        <!-- Name -->
        <h3 class="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-red transition-colors duration-300 min-h-[3.5rem] text-lg leading-snug">
          {{ product.nameRu }}
        </h3>

        <!-- Category -->
        <div class="text-xs text-gray-500 mb-4 flex items-center gap-2 bg-gradient-to-r from-gray-50 to-transparent px-3 py-2 rounded-lg">
          <svg class="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          <span class="font-medium">{{ product.subcategory?.nameRu || product.category?.nameRu || 'Категория не указана' }}</span>
        </div>

        <!-- Age & Material -->
        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-5">
          <span v-if="product.recommendedAge" class="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100/50 px-3 py-1.5 rounded-lg border border-blue-100">
            <svg class="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="font-medium">{{ product.recommendedAge }}</span>
          </span>
          <span v-if="product.material" class="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-green-100/50 px-3 py-1.5 rounded-lg border border-green-100">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            <span class="font-medium">{{ product.material }}</span>
          </span>
        </div>

        <!-- Price and MOQ -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">
            {{ priceRange }}
          </div>
          <div class="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1.5 rounded-lg">
            MOQ: {{ product.moq }} шт
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
/* 3D transform for card hover */
.card-lift {
  transform-style: preserve-3d;
  will-change: transform;
}

.card-lift > * {
  transform: translateZ(0);
}
</style>
