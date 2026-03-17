<script setup>
import { onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import PartnersSection from '@/components/sections/PartnersSection.vue'
import FactorySection from '@/components/sections/FactorySection.vue'
import ExportSection from '@/components/sections/ExportSection.vue'
import ContactFormSection from '@/components/sections/ContactFormSection.vue'

const catalogStore = useCatalogStore()

onMounted(async () => {
  await catalogStore.fetchCategories()
})
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Stats Section -->
    <StatsSection />

    <!-- Partners Section -->
    <PartnersSection />

    <!-- Factory Section -->
    <FactorySection />

    <!-- Export Section -->
    <ExportSection />

    <!-- Contact Form Section -->
    <ContactFormSection />
  </DefaultLayout>
</template>
