<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCatalogStore } from '@/stores/catalog'
import ProductGrid from '@/components/catalog/ProductGrid.vue'
import FilterPanel from '@/components/catalog/FilterPanel.vue'
import Pagination from '@/components/catalog/Pagination.vue'

const route = useRoute()
const catalogStore = useCatalogStore()

onMounted(async () => {
  await catalogStore.fetchProducts()
})

watch(
  () => [route.query, catalogStore.filters],
  () => {
    catalogStore.fetchProducts()
  },
  { deep: true }
)

const handlePageChange = (page) => {
  catalogStore.setPage(page)
  catalogStore.fetchProducts({ page })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <DefaultLayout>
    <div class="bg-gray-100 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">Каталог продукции</h1>
          <p class="text-gray-600">
            Найдено {{ catalogStore.pagination.total }} товаров
          </p>
        </div>

        <div class="flex flex-col md:flex-col lg:flex-row gap-6">
          <!-- Sidebar with Filters -->
          <aside class="w-full lg:w-64 flex-shrink-0">
            <FilterPanel @filter-change="catalogStore.fetchProducts()" />
          </aside>

          <!-- Products Grid -->
          <main class="flex-grow">
            <ProductGrid
              :products="catalogStore.products"
              :loading="catalogStore.loading"
            />

            <!-- Pagination -->
            <Pagination
              v-if="catalogStore.pagination.totalPages > 1"
              :currentPage="catalogStore.pagination.page"
              :totalPages="catalogStore.pagination.totalPages"
              @change-page="handlePageChange"
            />
          </main>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
