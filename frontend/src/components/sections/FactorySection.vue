<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Section, Button } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const router = useRouter()
const sectionRef = ref(null)
const imageRef = ref(null)

const features = [
  {
    icon: 'factory',
    title: 'Современное производство',
    description: 'Передовые технологии и автоматизированные линии',
    iconPath: 'M19 13v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5M5 13a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2m-6-4a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    icon: 'quality',
    title: 'Контроль качества',
    description: 'Многоступенчатая система проверки каждой игрушки',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    icon: 'eco',
    title: 'Безопасные материалы',
    description: 'Только сертифицированные и экологичные материалы',
    iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    icon: 'design',
    title: 'Собственный дизайн',
    description: 'Уникальные разработки и кастомизация продукции',
    iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  }
]

const iconPaths = {
  factory: 'M19 13v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5M5 13a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2m-6-4a2 2 0 11-4 0 2 2 0 014 0z',
  quality: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  eco: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  design: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
}

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
    { threshold: 0.3 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

const animateSection = () => {
  const tl = gsap.timeline()
  
  // Анимация заголовка
  tl.from('.factory-heading', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  // Анимация текста
  tl.from('.factory-text', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  
  // Анимация изображения
  tl.from('.factory-image', {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.8')
  
  // Анимация features
  features.forEach((_, index) => {
    tl.from(`.factory-feature-${index}`, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
  })
  
  // Анимация кнопки
  tl.from('.factory-button', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.4')
}
</script>

<template>
  <Section ref="sectionRef" variant="alternate" padding="xl">
    <Container size="xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Image/Video Side -->
        <div class="relative order-1 lg:order-2">
          <div class="factory-image relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              alt="Производство Toybola"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <!-- Статистика на изображении -->
            <div class="absolute bottom-8 left-8 right-8">
              <div class="flex items-end gap-6">
                <div>
                  <div class="text-5xl font-black text-white mb-1">71M+</div>
                  <div class="text-blue-200 text-sm font-medium">игрушек произведено</div>
                </div>
                <div class="flex-grow h-px bg-white/30 mb-3"></div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-white mb-1">15+</div>
                  <div class="text-blue-200 text-xs">лет</div>
                </div>
              </div>
            </div>
            
            <!-- Декоративные элементы -->
            <div class="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-brand-red/30 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div class="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-tr from-brand-blue/30 to-transparent rounded-full blur-2xl animate-pulse" style="animation-delay: 1s;"></div>
          </div>

          <!-- Плавающие элементы -->
          <div class="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float-new">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <div class="absolute -bottom-6 -right-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl animate-float-new" style="animation-delay: 0.5s;">
            <svg class="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        </div>

        <!-- Content Side -->
        <div class="order-2 lg:order-1">
          <div class="factory-heading mb-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-4">
              <div class="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold text-brand-red">Производство</span>
            </div>
            <Heading size="3xl" class="text-gradient-brand">
              Производство мирового уровня
            </Heading>
          </div>
          
          <p class="factory-text text-lg text-gray-600 mb-10 leading-relaxed">
            Toybola — крупнейший производитель игрушек в Центральной Азии.
            Мы сочетаем современные технологии с многолетним опытом для создания
            качественной и безопасной продукции.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div
              v-for="(feature, index) in features"
              :key="index"
              :class="`factory-feature-${index} flex gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 group cursor-default`"
            >
              <div class="w-14 h-14 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.iconPath" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1 group-hover:text-brand-red transition-colors">{{ feature.title }}</h4>
                <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <Button 
            variant="secondary" 
            size="lg" 
            @click="router.push('/about')"
            class="factory-button group bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red border-0 shadow-lg hover:shadow-xl hover:shadow-brand-red/30 transition-all duration-300"
          >
            <span class="flex items-center gap-2">
              <span>Узнать больше</span>
              <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </Container>
  </Section>
</template>
