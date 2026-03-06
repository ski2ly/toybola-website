<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Grid, Button, Section } from '@/components/ui'
import ProductCard from '@/components/catalog/ProductCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  products: {
    type: Array,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'alternate'].includes(value)
  }
})

const router = useRouter()

const navigateToCatalog = () => {
  router.push('/catalog')
}
</script>

<template>
  <Section :variant="variant" padding="lg">
    <Container size="xl">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <div class="animate-fade-in-left">
          <div>
            <Heading size="3xl" class="mb-2">{{ title }}</Heading>
            <p v-if="subtitle" class="text-gray-600 text-lg">{{ subtitle }}</p>
          </div>
        </div>

        <div class="animate-fade-in-right">
          <Button @click="navigateToCatalog" variant="ghost" class="group">
            <span class="flex items-center gap-2">
              Смотреть все
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </Button>
        </div>
      </div>

      <Grid columns="responsive" gap="lg">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </Grid>

      <div class="text-center mt-8 md:hidden animate-fade-in-up">
        <Button @click="navigateToCatalog" variant="secondary" size="lg">
          Смотреть все товары
        </Button>
      </div>
    </Container>
  </Section>
</template>
