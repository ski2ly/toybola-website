<script setup>
import { onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import FactorySection from '@/components/sections/FactorySection.vue'
import ExportSection from '@/components/sections/ExportSection.vue'
import ContactFormSection from '@/components/sections/ContactFormSection.vue'

const catalogStore = useCatalogStore()

onMounted(async () => {
  await catalogStore.fetchCategories()
  await catalogStore.fetchFeatured(8)
  await catalogStore.fetchNew(8)
})
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Stats Section -->
    <StatsSection />

    <!-- Categories Section -->
    <CategoriesSection :categories="catalogStore.categories" />

    <!-- Featured Products -->
    <ProductsSection
      title="Хиты продаж"
      subtitle="Наши самые популярные товары"
      :products="catalogStore.featuredProducts"
      variant="alternate"
    />

    <!-- Factory Section -->
    <FactorySection />

    <!-- Export Section -->
    <ExportSection />

    <!-- New Products -->
    <ProductsSection
      title="Новинки"
      subtitle="Последние поступления в наш каталог"
      :products="catalogStore.newProducts"
      variant="default"
    />

    <!-- Contact Form Section -->
    <ContactFormSection />
  </DefaultLayout>
</template>
