<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCatalogStore } from '@/stores/catalog'
import ProductGrid from '@/components/catalog/ProductGrid.vue'

const route = useRoute()
const catalogStore = useCatalogStore()

onMounted(async () => {
  await catalogStore.fetchSubcategories(route.params.category)
  await catalogStore.fetchProducts({ category: route.params.category })
})
</script>

<template>
  <DefaultLayout>
    <div class="bg-gray-100 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4 capitalize">{{ route.params.category }}</h1>
        <ProductGrid
          :products="catalogStore.products"
          :loading="catalogStore.loading"
        />
      </div>
    </div>
  </DefaultLayout>
</template>
