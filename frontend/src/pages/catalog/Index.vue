<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Container, Section, Heading, Grid, Card, Button, Badge } from '@/components/ui'
import ProductCard from '@/components/catalog/ProductCard.vue'
import { useIntersectionObserver } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()

const selectedCategory = ref(null)
const selectedSubcategory = ref(null)
const selectedAge = ref(null)
const sortBy = ref('name')
const searchQuery = ref('')

const ageOptions = [
  { value: '0-3', label: '0-3 года' },
  { value: '3+', label: '3+' },
  { value: '6+', label: '6+' },
  { value: '12+', label: '12+' }
]

const sortOptions = [
  { value: 'name', label: 'По названию' },
  { value: 'price-asc', label: 'Сначала дешевые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
  { value: 'newest', label: 'Новинки' },
  { value: 'featured', label: 'Хиты продаж' }
]

const target = ref(null)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && catalogStore.pagination.page < catalogStore.pagination.totalPages) {
      loadMore()
    }
  },
  { threshold: 0.1 }
)

onMounted(async () => {
  await catalogStore.fetchCategories()
  await fetchProducts()
})

const fetchProducts = async (page = 1) => {
  const params = {
    page,
    limit: 12,
    category: selectedCategory.value,
    subcategory: selectedSubcategory.value,
    age: selectedAge.value,
    search: searchQuery.value,
    sort: sortBy.value
  }
  
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === '') {
      delete params[key]
    }
  })
  
  await catalogStore.fetchProducts(params)
}

const loadMore = async () => {
  const nextPage = catalogStore.pagination.page + 1
  await fetchProducts(nextPage)
}

const handleCategorySelect = (categorySlug) => {
  selectedCategory.value = selectedCategory.value === categorySlug ? null : categorySlug
  selectedSubcategory.value = null
  fetchProducts()
}

const handleSubcategorySelect = (subcategorySlug) => {
  selectedSubcategory.value = selectedSubcategory.value === subcategorySlug ? null : subcategorySlug
  fetchProducts()
}

const handleAgeSelect = (age) => {
  selectedAge.value = selectedAge.value === age ? null : age
  fetchProducts()
}

const handleSortChange = () => {
  fetchProducts()
}

const handleSearch = () => {
  fetchProducts()
}

const clearFilters = () => {
  selectedCategory.value = null
  selectedSubcategory.value = null
  selectedAge.value = null
  searchQuery.value = ''
  sortBy.value = 'name'
  fetchProducts()
}

const hasActiveFilters = computed(() => {
  return selectedCategory.value || selectedSubcategory.value || selectedAge.value || searchQuery.value
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedCategory.value) count++
  if (selectedSubcategory.value) count++
  if (selectedAge.value) count++
  if (searchQuery.value) count++
  return count
})
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <Section variant="alternate" padding="lg">
      <Container>
        <div class="text-center max-w-3xl mx-auto animate-fade-in-up">
          <Heading level="1" size="3xl" align="center" class="mb-4">
            Каталог продукции
          </Heading>
          <p class="text-lg text-gray-600">
            {{ catalogStore.pagination.total }} товаров в наличии
          </p>
        </div>
      </Container>
    </Section>

    <!-- Filters and Products Section -->
    <Section padding="lg">
      <Container size="xl">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar Filters -->
          <aside class="w-full lg:w-72 flex-shrink-0 space-y-6">
            <!-- Search -->
            <Card padding="lg">
              <Heading size="lg" class="mb-4">Поиск</Heading>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="SKU или название..."
                  class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                />
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <Button
                v-if="searchQuery"
                @click="handleSearch"
                variant="secondary"
                size="sm"
                class="w-full mt-3"
              >
                Искать
              </Button>
            </Card>

            <!-- Categories -->
            <Card padding="lg">
              <Heading size="lg" class="mb-4">Категории</Heading>
              <div class="space-y-2">
                <button
                  v-for="category in catalogStore.categories"
                  :key="category.id"
                  @click="handleCategorySelect(category.slug)"
                  :class="[
                    'w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group',
                    selectedCategory.value === category.slug
                      ? 'bg-brand-blue text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  ]"
                >
                  <span class="font-medium">{{ category.nameRu }}</span>
                  <svg
                    :class="[
                      'w-4 h-4 transition-transform',
                      selectedCategory.value === category.slug ? 'rotate-90' : 'group-hover:translate-x-1'
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <!-- Subcategories -->
              <div v-if="selectedCategory" class="mt-4 pt-4 border-t border-gray-100">
                <Heading size="sm" class="mb-3 text-gray-600">Подкатегории</Heading>
                <div class="space-y-2">
                  <button
                    v-for="subcategory in catalogStore.subcategories"
                    :key="subcategory.id"
                    @click="handleSubcategorySelect(subcategory.slug)"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-lg transition-all text-sm',
                      selectedSubcategory.value === subcategory.slug
                        ? 'bg-brand-blue/10 text-brand-blue font-medium'
                        : 'hover:bg-gray-50 text-gray-600'
                    ]"
                  >
                    {{ subcategory.nameRu }}
                  </button>
                </div>
              </div>
            </Card>

            <!-- Age Filter -->
            <Card padding="lg">
              <Heading size="lg" class="mb-4">Возраст</Heading>
              <div class="space-y-2">
                <button
                  v-for="option in ageOptions"
                  :key="option.value"
                  @click="handleAgeSelect(option.value)"
                  :class="[
                    'w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3',
                    selectedAge.value === option.value
                      ? 'bg-brand-blue text-white'
                      : 'hover:bg-gray-50 text-gray-700'
                  ]"
                >
                  <span class="w-2 h-2 rounded-full" :class="selectedAge.value === option.value ? 'bg-white' : 'bg-gray-300'" />
                  <span class="font-medium">{{ option.label }}</span>
                </button>
              </div>
            </Card>

            <!-- Clear Filters -->
            <Button
              v-if="hasActiveFilters"
              @click="clearFilters"
              variant="outline"
              size="default"
              class="w-full"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Сбросить фильтры ({{ activeFiltersCount }})
            </Button>
          </aside>

          <!-- Main Content -->
          <main class="flex-1">
            <!-- Toolbar -->
            <Card padding="default" class="mb-6">
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-2 flex-wrap">
                  <Badge v-if="selectedCategory" variant="info">
                    {{ selectedCategory }}
                  </Badge>
                  <Badge v-if="selectedSubcategory" variant="info">
                    {{ selectedSubcategory }}
                  </Badge>
                  <Badge v-if="selectedAge" variant="info">
                    {{ selectedAge }}
                  </Badge>
                </div>
                
                <div class="flex items-center gap-3">
                  <label class="text-sm text-gray-600 whitespace-nowrap">Сортировать:</label>
                  <select
                    v-model="sortBy"
                    @change="handleSortChange"
                    class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                  >
                    <option
                      v-for="option in sortOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
            </Card>

            <!-- Products Grid -->
            <div v-if="catalogStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div
                v-for="i in 8"
                :key="i"
                class="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse"
              />
            </div>

            <Grid v-else-if="catalogStore.products.length > 0" columns="responsive" gap="lg">
              <ProductCard
                v-for="product in catalogStore.products"
                :key="product.id"
                :product="product"
              />
            </Grid>

            <!-- Empty State -->
            <div
              v-else
              class="text-center py-20 animate-fade-in"
            >
              <div class="text-7xl mb-6">🔍</div>
              <Heading size="xl" class="mb-3">Ничего не найдено</Heading>
              <p class="text-gray-600 mb-6">
                Попробуйте изменить параметры поиска или сбросить фильтры
              </p>
              <Button @click="clearFilters" variant="secondary">
                Сбросить все фильтры
              </Button>
            </div>

            <!-- Load More Trigger -->
            <div
              v-show="catalogStore.pagination.page < catalogStore.pagination.totalPages"
              ref="target"
              class="py-12 text-center"
            >
              <div v-if="catalogStore.loading" class="inline-block w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
            </div>
          </main>
        </div>
      </Container>
    </Section>
  </DefaultLayout>
</template>
