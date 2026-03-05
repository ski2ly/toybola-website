<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load-more'])
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-gray-200 rounded-lg animate-pulse aspect-square"
      />
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-12"
    >
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        Ничего не найдено
      </h3>
      <p class="text-gray-500">
        Попробуйте изменить параметры поиска или фильтры
      </p>
    </div>
  </div>
</template>
