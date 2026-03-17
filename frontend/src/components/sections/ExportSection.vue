<script setup>
import { Container, Heading, Section, Card } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const countries = ref([
  { name: 'Казахстан', flag: '🇰🇿', count: '2.5M+' },
  { name: 'Россия', flag: '🇷🇺', count: '15M+' },
  { name: 'Узбекистан', flag: '🇺🇿', count: '8M+' },
  { name: 'Кыргызстан', flag: '🇰🇬', count: '1.2M+' },
  { name: 'Таджикистан', flag: '🇹🇯', count: '900K+' },
  { name: 'Туркменистан', flag: '🇹🇲', count: '600K+' },
  { name: 'Азербайджан', flag: '🇦🇿', count: '1.8M+' },
  { name: 'Грузия', flag: '🇬🇪', count: '700K+' },
  { name: 'Армения', flag: '🇦🇲', count: '500K+' },
  { name: 'Беларусь', flag: '🇧🇾', count: '2M+' },
  { name: 'Польша', flag: '🇵🇱', count: '3M+' },
  { name: 'Германия', flag: '🇩🇪', count: '5M+' }
])

const sectionRef = ref(null)
const hasAnimated = ref(false)

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
  tl.from('.export-heading', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  // Анимация подзаголовка
  tl.from('.export-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  
  // Анимация стран
  countries.value.forEach((_, index) => {
    tl.from(`.country-card-${index}`, {
      y: 30,
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, `-=${0.03}`)
  })
}
</script>

<template>
  <Section ref="sectionRef" padding="xl" class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-brand-red/5">
    <!-- Декоративные элементы -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-blue/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-red/10 to-transparent rounded-full blur-3xl"></div>
    
    <!-- Карта мира (декоративная) -->
    <div class="absolute inset-0 opacity-5">
      <svg viewBox="0 0 1440 720" class="w-full h-full">
        <path d="M120,120 Q200,80 280,120 T440,120 T600,120 T760,120 T920,120 T1080,120 T1240,120" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
    </div>

    <Container class="relative z-10">
      <div class="text-center mb-16">
        <div class="export-heading inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue/10 to-brand-red/10 rounded-full mb-6">
          <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm font-bold text-brand-blue">МЕЖДУРОДНОЕ ПРИСУТСТВИЕ</span>
        </div>
        
        <Heading size="3xl" class="export-heading mb-6">
          География экспорта
        </Heading>
        <p class="export-subtitle text-xl text-gray-600 max-w-2xl mx-auto">
          Наша продукция представлена в 
          <span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue">12 странах мира</span>
        </p>
      </div>

      <Card variant="elevated" padding="xl" class="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          <div
            v-for="(country, index) in countries"
            :key="country.name"
            :class="`country-card-${index} relative group cursor-pointer`"
          >
            <div class="relative p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 overflow-hidden">
              <!-- Градиент при наведении -->
              <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Флаг -->
              <div class="relative text-6xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                {{ country.flag }}
              </div>
              
              <!-- Название страны -->
              <div class="relative text-sm font-bold text-gray-800 group-hover:text-brand-blue transition-colors mb-1">
                {{ country.name }}
              </div>
              
              <!-- Объем экспорта -->
              <div class="relative text-xs font-medium text-gray-500 group-hover:text-brand-red transition-colors">
                {{ country.count }}
              </div>
              
              <!-- Декоративный элемент -->
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-brand-blue/20 to-brand-red/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Статистика внизу -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg">
          <div class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue mb-2">12</div>
          <div class="text-sm font-medium text-gray-600">стран экспорта</div>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg">
          <div class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red mb-2">15+</div>
          <div class="text-sm font-medium text-gray-600">лет на рынке</div>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-lg">
          <div class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue mb-2">71M+</div>
          <div class="text-sm font-medium text-gray-600">игрушек произведено</div>
        </div>
      </div>
    </Container>
  </Section>
</template>
