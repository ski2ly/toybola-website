<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Container, Section, Heading, Card, Button, Grid, Badge, Image } from '@/components/ui'
import ProductCard from '@/components/catalog/ProductCard.vue'
import { productsService } from '@/services'

const route = useRoute()
const router = useRouter()

const product = ref(null)
const relatedProducts = ref([])
const loading = ref(true)
const selectedImageIndex = ref(0)
const activeTab = ref('description')

onMounted(async () => {
  try {
    const response = await productsService.getBySlug(route.params.slug)
    product.value = response.data
    
    if (product.value.images?.length > 0) {
      selectedImageIndex.value = product.value.images.findIndex(img => img.isPrimary)
      if (selectedImageIndex.value === -1) selectedImageIndex.value = 0
    }
    
    // Load related products
    if (product.value.subcategoryId) {
      const relatedResponse = await productsService.getAll({
        subcategory: product.value.subcategoryId,
        limit: 4
      })
      relatedProducts.value = relatedResponse.data.data.filter(p => p.id !== product.value.id).slice(0, 4)
    }
  } catch (error) {
    console.error('Error loading product:', error)
  } finally {
    loading.value = false
  }
})

const images = computed(() => product.value?.images || [])
const currentImage = computed(() => images.value[selectedImageIndex.value]?.imageUrl || '/images/placeholder.png')

const priceRange = computed(() => {
  if (!product.value) return ''
  const { priceMinUsd, priceMaxUsd } = product.value
  if (priceMinUsd && priceMaxUsd && priceMinUsd !== priceMaxUsd) {
    return `$${priceMinUsd} - $${priceMaxUsd}`
  }
  return priceMinUsd ? `$${priceMinUsd}` : 'По запросу'
})

const availabilityConfig = computed(() => {
  if (!product.value) return {}
  switch (product.value.availability) {
    case 'in_stock':
      return { label: 'В наличии', variant: 'success' }
    case 'low_stock':
      return { label: 'Мало', variant: 'warning' }
    default:
      return { label: 'Нет в наличии', variant: 'danger' }
  }
})

const tabs = [
  { id: 'description', label: 'Описание' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'packaging', label: 'Упаковка' }
]

const navigateToCategory = (categorySlug) => {
  router.push(`/catalog/${categorySlug}`)
}
</script>

<template>
  <DefaultLayout>
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p class="text-gray-600">Загрузка...</p>
      </div>
    </div>

    <div v-else-if="product" class="bg-gray-50 min-h-screen">
      <!-- Breadcrumb -->
      <Section padding="sm">
        <Container>
          <nav class="text-sm text-gray-500">
            <router-link to="/" class="hover:text-brand-blue transition-colors">Главная</router-link>
            <span class="mx-2">/</span>
            <a href="https://ctgtb.uz" target="_blank" rel="noopener noreferrer" class="hover:text-brand-blue transition-colors">Каталог ↗</a>
            <span v-if="product.subcategory" class="mx-2">/</span>
            <router-link v-if="product.subcategory" :to="`/catalog/${product.subcategory.categorySlug}`" class="hover:text-brand-blue transition-colors">
              {{ product.subcategory.categoryName }}
            </router-link>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ product.nameRu }}</span>
          </nav>
        </Container>
      </Section>

      <!-- Product Gallery & Info -->
      <Section padding="lg">
        <Container size="xl">
          <div class="animate-fade-in-up">
            <Card padding="lg" class="overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- Gallery -->
                <div class="space-y-4">
                  <!-- Main Image -->
                  <div class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                    <Image
                      :src="currentImage"
                      :alt="product.nameRu"
                      aspect-ratio="square"
                      class="transform group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <!-- Navigation Arrows -->
                    <button
                      v-if="images.length > 1 && selectedImageIndex > 0"
                      @click="selectedImageIndex--"
                      class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button
                      v-if="images.length > 1 && selectedImageIndex < images.length - 1"
                      @click="selectedImageIndex++"
                      class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Thumbnails -->
                  <div v-if="images.length > 1" class="grid grid-cols-4 gap-3">
                    <button
                      v-for="(image, index) in images"
                      :key="image.id"
                      @click="selectedImageIndex = index"
                      :class="[
                        'aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300',
                        selectedImageIndex === index
                          ? 'border-brand-blue ring-2 ring-brand-blue/20'
                          : 'border-gray-200 hover:border-gray-300'
                      ]"
                    >
                      <Image :src="image.imageUrl" :alt="image.altText || product.nameRu" aspect-ratio="square" />
                    </button>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex flex-col">
                  <!-- Header -->
                  <div class="mb-6">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="text-sm text-gray-500 font-mono">{{ product.sku }}</span>
                      <Badge :variant="availabilityConfig.variant">
                        {{ availabilityConfig.label }}
                      </Badge>
                    </div>
                    
                    <Heading level="1" size="3xl" class="mb-4">
                      {{ product.nameRu }}
                    </Heading>
                    
                    <div class="text-3xl font-bold text-brand-blue">
                      {{ priceRange }}
                    </div>
                  </div>

                  <!-- Quick Specs -->
                  <div class="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 mb-6">
                    <div v-if="product.recommendedAge" class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">Возраст</div>
                        <div class="font-medium">{{ product.recommendedAge }}</div>
                      </div>
                    </div>
                    
                    <div v-if="product.material" class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">Материал</div>
                        <div class="font-medium">{{ product.material }}</div>
                      </div>
                    </div>
                    
                    <div v-if="product.weightKg" class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7V3m-6 4l-3 9"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">Вес</div>
                        <div class="font-medium">{{ product.weightKg }} кг</div>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500">MOQ</div>
                        <div class="font-medium">{{ product.moq }} шт</div>
                      </div>
                    </div>
                  </div>

                  <!-- CTA Buttons -->
                  <div class="space-y-3 mt-auto">
                    <Button variant="primary" size="xl" class="w-full">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Запросить цену
                    </Button>
                    <Button variant="outline" size="lg" class="w-full">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                      Добавить в избранное
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <!-- Tabs Section -->
      <Section padding="lg" variant="alternate">
        <Container size="xl">
          <Card padding="lg">
            <!-- Tab Headers -->
            <div class="flex border-b border-gray-200 mb-6 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2',
                  activeTab === tab.id
                    ? 'border-brand-blue text-brand-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div
              :key="activeTab"
              class="animate-fade-in"
            >
              <div v-if="activeTab === 'description'" class="prose max-w-none">
                <p class="text-gray-700 text-lg leading-relaxed">
                  {{ product.descriptionRu }}
                </p>
              </div>

              <div v-if="activeTab === 'specs'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="product.dimensions" class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500">Размеры</span>
                  <span class="font-medium">{{ product.dimensions }}</span>
                </div>
                <div v-if="product.weightKg" class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500">Вес</span>
                  <span class="font-medium">{{ product.weightKg }} кг</span>
                </div>
                <div v-if="product.material" class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500">Материал</span>
                  <span class="font-medium">{{ product.material }}</span>
                </div>
                <div v-if="product.recommendedAge" class="flex justify-between py-3 border-b border-gray-100">
                  <span class="text-gray-500">Возраст</span>
                  <span class="font-medium">{{ product.recommendedAge }}</span>
                </div>
              </div>

              <div v-if="activeTab === 'packaging'">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="text-center p-6 bg-gray-50 rounded-xl">
                    <div class="text-3xl font-bold text-brand-blue mb-2">
                      {{ product.packagingType || 'Коробка' }}
                    </div>
                    <div class="text-sm text-gray-500">Тип упаковки</div>
                  </div>
                  <div class="text-center p-6 bg-gray-50 rounded-xl">
                    <div class="text-3xl font-bold text-brand-blue mb-2">
                      {{ product.moq }}
                    </div>
                    <div class="text-sm text-gray-500">Мин. заказ (шт)</div>
                  </div>
                  <div class="text-center p-6 bg-gray-50 rounded-xl">
                    <div class="text-3xl font-bold text-brand-blue mb-2">
                      от {{ product.priceMinUsd }}$
                    </div>
                    <div class="text-sm text-gray-500">Цена за шт</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <!-- Related Products -->
      <Section v-if="relatedProducts.length > 0" padding="lg">
        <Container size="xl">
          <div class="flex items-center justify-between mb-8">
            <Heading size="2xl">Похожие товары</Heading>
            <Button variant="ghost" @click="window.open('https://ctgtb.uz', '_blank')">
              Смотреть все
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </Button>
          </div>

          <Grid columns="responsive" gap="lg">
            <ProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :product="relatedProduct"
            />
          </Grid>
        </Container>
      </Section>
    </div>

    <!-- Not Found -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div class="text-7xl mb-6">😕</div>
        <Heading size="2xl" class="mb-4">Товар не найден</Heading>
        <p class="text-gray-600 mb-6">К сожалению, товар с таким адресом не существует</p>
        <Button @click="window.open('https://ctgtb.uz', '_blank')" variant="secondary">
          Вернуться в каталог ↗
        </Button>
      </div>
    </div>
  </DefaultLayout>
</template>
