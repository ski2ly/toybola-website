<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Section, Button } from '@/components/ui'

const router = useRouter()

const features = [
  {
    icon: 'factory',
    title: 'Современное производство',
    description: 'Передовые технологии и автоматизированные линии'
  },
  {
    icon: 'quality',
    title: 'Контроль качества',
    description: 'Многоступенчатая система проверки каждой игрушки'
  },
  {
    icon: 'eco',
    title: 'Безопасные материалы',
    description: 'Только сертифицированные и экологичные материалы'
  },
  {
    icon: 'design',
    title: 'Собственный дизайн',
    description: 'Уникальные разработки и кастомизация продукции'
  }
]

const iconPaths = {
  factory: 'M19 13v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5M5 13a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2m-6-4a2 2 0 11-4 0 2 2 0 014 0z',
  quality: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  eco: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  design: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
}
</script>

<template>
  <Section variant="alternate" padding="xl">
    <Container size="xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Image/Video Side -->
        <div class="relative animate-fade-in-left">
          <div class="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              alt="Производство Toybola"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-6 left-6 text-white">
              <div class="text-4xl font-bold mb-1">71M+</div>
              <div class="text-blue-100">игрушек произведено</div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-4 -left-4 w-24 h-24 bg-brand-red/20 rounded-full blur-2xl"></div>
          <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-blue/20 rounded-full blur-2xl"></div>
        </div>

        <!-- Content Side -->
        <div class="animate-fade-in-right">
          <Heading size="3xl" class="mb-6">
            Производство мирового уровня
          </Heading>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Toybola — крупнейший производитель игрушек в Центральной Азии.
            Мы сочетаем современные технологии с многолетним опытом для создания
            качественной и безопасной продукции.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex gap-4 animate-fade-in-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPaths[feature.icon]" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">{{ feature.title }}</h4>
                <p class="text-sm text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <Button variant="secondary" size="lg" @click="router.push('/about')">
            Узнать больше
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Button>
        </div>
      </div>
    </Container>
  </Section>
</template>
