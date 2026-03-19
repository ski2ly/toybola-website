<script setup>
import { computed } from 'vue'
import HeroSection from './HeroSection.vue'
import StatsSection from './StatsSection.vue'
import PartnersSection from './PartnersSection.vue'
import FactorySection from './FactorySection.vue'
import ExportSection from './ExportSection.vue'
import ContactFormSection from './ContactFormSection.vue'
import TextBlockSection from './TextBlockSection.vue'
import ImageBlockSection from './ImageBlockSection.vue'
import ProductsSection from './ProductsSection.vue'

const blockComponents = {
  hero: HeroSection,
  stats: StatsSection,
  partners: PartnersSection,
  factory: FactorySection,
  export: ExportSection,
  contact_form: ContactFormSection,
  text: TextBlockSection,
  image: ImageBlockSection,
  products: ProductsSection,
}

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
})

const component = computed(() => {
  return blockComponents[props.block.blockType] || TextBlockSection
})
</script>

<template>
  <component :is="component" :block="block" />
</template>
