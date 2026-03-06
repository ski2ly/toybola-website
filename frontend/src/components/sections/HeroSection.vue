<script setup>
import { useRouter } from 'vue-router'
import { Container, Button } from '@/components/ui'

const router = useRouter()

const navigateToCatalog = () => {
  router.push('/catalog')
}

const navigateToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <section class="relative hero-section min-h-[95vh] flex items-center overflow-hidden bg-cover bg-center bg-fixed" style="background-image: url('/images/backgrounds/background.svg');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

    <!-- Animated elements -->
    <div class="absolute top-20 right-20 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-40 left-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>

    <!-- Content -->
    <Container class="relative z-10 py-32">
      <div class="max-w-4xl">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-lg animate-fade-in-up">
          Игрушки от <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">производителя</span>
        </h1>

        <p class="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed drop-shadow-md animate-fade-in-up" style="animation-delay: 0.2s;">
          Крупнейший производитель игрушек в Центральной Азии.
          <br />
          <span class="text-blue-200 font-medium">Экспорт в 12 стран мира.</span>
        </p>

        <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style="animation-delay: 0.4s;">
          <Button @click="navigateToCatalog" variant="primary" size="xl">
            <span class="flex items-center gap-3">
              <span>Смотреть каталог</span>
              <svg class="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </Button>

          <Button @click="navigateToAbout" variant="outline" size="xl" class="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50">
            О компании
          </Button>
        </div>
      </div>
    </Container>

    <!-- Wave Divider -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path d="M0 0L60 8C120 16 240 32 360 40C480 48 600 48 720 44C840 40 960 32 1080 40C1200 48 1320 72 1380 84L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
      </svg>
    </div>
  </section>
</template>
