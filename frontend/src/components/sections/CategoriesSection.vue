<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Card, Grid, Section } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const router = useRouter()
const sectionRef = ref(null)
const hasAnimated = ref(false)

const navigateToCategory = (slug) => {
  router.push(`/catalog/${slug}`)
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
  tl.from('.categories-heading', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  // Анимация подзаголовка
  tl.from('.categories-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  
  // Анимация карточек категорий
  tl.from('.category-card', {
    y: 60,
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, '-=0.4')
}

// Иконки для разных категорий
const categoryIcons = {
  default: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  transport: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  toys: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  education: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  sports: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
  creative: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
}

const getCategoryIcon = (name) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('транспорт') || lowerName.includes('авто')) return categoryIcons.transport
  if (lowerName.includes('кукл') || lowerName.includes('игрушк')) return categoryIcons.toys
  if (lowerName.includes('образоват') || lowerName.includes('развив')) return categoryIcons.education
  if (lowerName.includes('спорт') || lowerName.includes('актив')) return categoryIcons.sports
  if (lowerName.includes('творч') || lowerName.includes('арт')) return categoryIcons.creative
  return categoryIcons.default
}
</script>

<template>
  <Section ref="sectionRef" padding="xl" class="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
    <!-- Декоративные элементы -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-red/5 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-brand-blue/5 to-transparent rounded-full blur-3xl"></div>
    
    <Container size="xl">
      <div class="text-center mb-16">
        <div class="categories-heading inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-red/10 to-brand-blue/10 rounded-full mb-6">
          <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <span class="text-sm font-bold text-brand-red uppercase tracking-wider">КАТЕГОРИИ</span>
        </div>
        
        <Heading size="3xl" class="categories-heading mb-4">
          Категории продукции
        </Heading>
        <p class="categories-subtitle text-xl text-gray-600 max-w-2xl mx-auto">
          Широкий ассортимент для любого возраста
        </p>
      </div>

      <Grid columns="responsive" gap="xl">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          :class="`category-card group cursor-pointer`"
          @click="navigateToCategory(category.slug)"
        >
          <Card variant="interactive" padding="xl" class="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group/card">
            <!-- Градиентный фон при наведении -->
            <div class="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-brand-blue/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Декоративные круги -->
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-brand-red/10 to-transparent rounded-full blur-2xl group-hover/card:scale-150 transition-transform duration-700"></div>
            <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-brand-blue/10 to-transparent rounded-full blur-2xl group-hover/card:scale-150 transition-transform duration-700"></div>
            
            <!-- Иконка -->
            <div class="relative mb-6">
              <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl flex items-center justify-center shadow-xl group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-500">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getCategoryIcon(category.nameRu)" />
                </svg>
              </div>
              
              <!-- Пульсирующий эффект -->
              <div class="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br from-brand-red to-brand-blue rounded-2xl opacity-30 animate-pulse-ring"></div>
            </div>
            
            <!-- Название категории -->
            <h3 class="relative font-bold text-2xl mb-3 text-gray-900 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-brand-red group-hover/card:to-brand-blue transition-all duration-500">
              {{ category.nameRu }}
            </h3>
            
            <!-- Количество подкатегорий -->
            <p class="relative text-sm text-gray-500 font-medium mb-4">
              {{ category._count?.subcategories || 0 }} подкатегорий
            </p>
            
            <!-- Стрелка -->
            <div class="relative inline-flex items-center gap-2 text-brand-blue font-semibold opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
              <span>Смотреть</span>
              <svg class="w-4 h-4 transform group-hover/card:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
            
            <!-- Линия снизу -->
            <div class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-red to-brand-blue group-hover/card:w-full transition-all duration-500"></div>
          </Card>
        </div>
      </Grid>
    </Container>
  </Section>
</template>
