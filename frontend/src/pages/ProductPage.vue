<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { productsService } from '@/services'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const selectedImage = ref(0)

onMounted(async () => {
  try {
    const response = await productsService.getBySlug(route.params.slug)
    product.value = response.data
    if (product.value.images?.length > 0) {
      selectedImage.value = product.value.images.findIndex(img => img.isPrimary) || 0
    }
  } catch (error) {
    console.error('Error loading product:', error)
  } finally {
    loading.value = false
  }
})

const priceRange = computed(() => {
  if (!product.value) return ''
  const { priceMinUsd, priceMaxUsd } = product.value
  if (priceMinUsd && priceMaxUsd && priceMinUsd !== priceMaxUsd) {
    return `$${priceMinUsd} - $${priceMaxUsd}`
  }
  return priceMinUsd ? `$${priceMinUsd}` : 'По запросу'
})
</script>

<template>
  <DefaultLayout>
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-xl">Загрузка...</div>
    </div>

    <div v-else-if="product" class="bg-white min-h-screen py-8">
      <div class="container mx-auto px-4">
        <!-- Breadcrumb -->
        <div class="text-sm text-gray-500 mb-6">
          <router-link to="/" class="hover:text-brand-blue">Главная</router-link>
          <span class="mx-2">/</span>
          <a href="https://ctgtb.uz" target="_blank" rel="noopener noreferrer" class="hover:text-brand-blue">Каталог ↗</a>
          <span class="mx-2">/</span>
          <span class="text-gray-900">{{ product.nameRu }}</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Images -->
          <div>
            <!-- Main Image -->
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                :src="product.images?.[selectedImage]?.imageUrl || '/images/placeholder.png'"
                :alt="product.nameRu"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Thumbnails -->
            <div v-if="product.images?.length > 1" class="flex gap-2">
              <button
                v-for="(image, index) in product.images"
                :key="image.id"
                @click="selectedImage = index"
                :class="[
                  'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                  selectedImage === index ? 'border-brand-blue' : 'border-gray-200'
                ]"
              >
                <img :src="image.imageUrl" :alt="image.altText" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <!-- SKU & Title -->
            <div class="text-sm text-gray-500 mb-2">{{ product.sku }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ product.nameRu }}</h1>

            <!-- Price -->
            <div class="text-2xl font-bold text-brand-blue mb-6">
              {{ priceRange }}
            </div>

            <!-- Description -->
            <div class="prose mb-6">
              <p class="text-gray-700">{{ product.descriptionRu }}</p>
            </div>

            <!-- Specifications -->
            <div class="border-t border-b py-6 mb-6">
              <dl class="space-y-3">
                <div v-if="product.recommendedAge" class="flex">
                  <dt class="w-40 text-gray-500">Возраст</dt>
                  <dd class="font-medium">{{ product.recommendedAge }}</dd>
                </div>
                <div v-if="product.material" class="flex">
                  <dt class="w-40 text-gray-500">Материал</dt>
                  <dd class="font-medium">{{ product.material }}</dd>
                </div>
                <div v-if="product.dimensions" class="flex">
                  <dt class="w-40 text-gray-500">Размеры</dt>
                  <dd class="font-medium">{{ product.dimensions }}</dd>
                </div>
                <div v-if="product.weightKg" class="flex">
                  <dt class="w-40 text-gray-500">Вес</dt>
                  <dd class="font-medium">{{ product.weightKg }} кг</dd>
                </div>
                <div v-if="product.packagingType" class="flex">
                  <dt class="w-40 text-gray-500">Упаковка</dt>
                  <dd class="font-medium">{{ product.packagingType }}</dd>
                </div>
                <div class="flex">
                  <dt class="w-40 text-gray-500">MOQ</dt>
                  <dd class="font-medium">{{ product.moq }} шт</dd>
                </div>
                <div class="flex">
                  <dt class="w-40 text-gray-500">Наличие</dt>
                  <dd class="font-medium">
                    <span
                      :class="[
                        'px-2 py-1 rounded text-sm',
                        product.availability === 'in_stock' ? 'bg-green-100 text-green-800' :
                        product.availability === 'low_stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ product.availability === 'in_stock' ? 'В наличии' :
                         product.availability === 'low_stock' ? 'Мало' : 'Нет' }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- CTA Buttons -->
            <div class="space-y-3">
              <button class="w-full py-4 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Запросить цену
              </button>
              <button class="w-full py-4 border-2 border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                Добавить в список
              </button>
            </div>
          </div>
        </div>

        <!-- Attributes -->
        <div v-if="product.attributes?.length > 0" class="mt-12 border-t pt-8">
          <h2 class="text-xl font-bold mb-4">Характеристики</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="attr in product.attributes"
              :key="attr.id"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="text-sm text-gray-500">{{ attr.attributeName }}</div>
              <div class="font-medium">{{ attr.attributeValue }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="text-6xl mb-4">😕</div>
        <h1 class="text-2xl font-bold mb-2">Товар не найден</h1>
        <a href="https://ctgtb.uz" target="_blank" rel="noopener noreferrer" class="text-brand-blue hover:underline">
          Вернуться в каталог ↗
        </a>
      </div>
    </div>
  </DefaultLayout>
</template>
