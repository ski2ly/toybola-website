<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Grid, Button, Section } from '@/components/ui'
import ProductCard from '@/components/catalog/ProductCard.vue'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

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
const sectionRef = ref(null)
const hasAnimated = ref(false)

const EXTERNAL_CATALOG_URL = 'https://ctgtb.uz'

const navigateToCatalog = () => {
  window.open(EXTERNAL_CATALOG_URL, '_blank')
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          animateSection()
        }
      })
    },
    { threshold: 0.2 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

const animateSection = () => {
  const tl = gsap.timeline()
  
  // Анимация заголовка
  tl.from('.products-heading', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  // Анимация подзаголовка
  tl.from('.products-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  
  // Анимация кнопки
  tl.from('.products-button', {
    x: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.6')
  
  // Анимация карточек товаров
  tl.from('.product-card', {
    y: 80,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.4')
}
</script>

<template>
  <Section ref="sectionRef" :variant="variant" padding="xl">
    <Container size="xl">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
        <div class="products-heading">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-red/10 to-brand-blue/10 rounded-full mb-4">
            <div class="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
            <span class="text-xs font-bold text-brand-red uppercase tracking-wider">Каталог</span>
          </div>
          <Heading size="3xl" class="mb-3">{{ title }}</Heading>
          <p v-if="subtitle" class="products-subtitle text-gray-600 text-lg">{{ subtitle }}</p>
        </div>

        <div class="products-button">
          <Button @click="navigateToCatalog" variant="ghost" size="lg" class="group border-2 border-gray-200 hover:border-brand-blue hover:text-brand-blue transition-all duration-300">
            <span class="flex items-center gap-3 font-semibold">
              Смотреть все
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </Button>
        </div>
      </div>

      <Grid columns="responsive" gap="xl">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :class="`product-card`"
          :style="{ animationDelay: `${index * 0.1}s` }"
        />
      </Grid>

      <div class="text-center mt-12 md:hidden">
        <Button @click="navigateToCatalog" variant="secondary" size="xl" class="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red shadow-xl">
          Смотреть все товары
        </Button>
      </div>
    </Container>
  </Section>
</template>
