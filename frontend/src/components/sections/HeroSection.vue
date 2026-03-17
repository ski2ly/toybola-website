<script setup>
import { useRouter } from 'vue-router'
import { Container, Button } from '@/components/ui'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const router = useRouter()
const heroContent = ref(null)
const floatingShapes = ref([])
const scrollArrow = ref(null)

const EXTERNAL_CATALOG_URL = 'https://ctgtb.uz'

const navigateToCatalog = () => {
  window.open(EXTERNAL_CATALOG_URL, '_blank')
}

const navigateToAbout = () => {
  router.push('/about')
}

const scrollToNextSection = () => {
  // Скролл к следующей секции
  const nextSection = document.querySelector('section:not(.hero-section)')
  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

onMounted(() => {
  // Анимация появления контента
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Анимация фона
  tl.from('.hero-bg-overlay', {
    opacity: 0,
    duration: 1.5
  })

  // Анимация заголовка
  tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2
  }, '-=1')

  // Анимация подзаголовка
  tl.from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 1
  }, '-=0.8')

  // Анимация кнопок
  tl.from('.hero-buttons > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
  }, '-=0.6')

  // Анимация стрелки
  tl.from('.scroll-arrow', {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, '-=0.4')

  // Анимация плавающих элементов
  floatingShapes.value.forEach((shape, index) => {
    gsap.to(shape, {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-180, 180)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5
    })
  })

  // Параллакс эффект при движении мыши
  const heroSection = document.querySelector('.hero-section')
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5
      const mouseY = e.clientY / window.innerHeight - 0.5

      gsap.to('.hero-parallax-layer', {
        x: mouseX * 50,
        y: mouseY * 50,
        duration: 1,
        ease: 'power2.out'
      })

      gsap.to('.hero-title', {
        x: mouseX * 30,
        duration: 0.8,
        ease: 'power2.out'
      })
    })
  }

  // Анимация стрелки при наведении
  if (scrollArrow.value) {
    scrollArrow.value.addEventListener('mouseenter', () => {
      gsap.to(scrollArrow.value, {
        y: 10,
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      gsap.to(scrollArrow.value.querySelector('svg'), {
        strokeWidth: 3,
        duration: 0.3
      })
    })

    scrollArrow.value.addEventListener('mouseleave', () => {
      gsap.to(scrollArrow.value, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
      gsap.to(scrollArrow.value.querySelector('svg'), {
        strokeWidth: 2,
        duration: 0.3
      })
    })

    scrollArrow.value.addEventListener('click', scrollToNextSection)
    scrollArrow.value.addEventListener('mousedown', () => {
      gsap.to(scrollArrow.value, {
        scale: 0.9,
        duration: 0.1
      })
    })
    scrollArrow.value.addEventListener('mouseup', () => {
      gsap.to(scrollArrow.value, {
        scale: 1.2,
        duration: 0.1
      })
    })
  }
})
</script>

<template>
  <section 
    ref="heroContent"
    class="relative hero-section min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-fixed"
    style="background-image: url('/images/backgrounds/background.svg');"
  >
    <!-- Overlay с градиентом -->
    <div class="hero-bg-overlay absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-800/40 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

    <!-- Плавающие декоративные элементы -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Круги -->
      <div 
        ref="floatingShapes"
        class="hero-parallax-layer absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-red/20 to-brand-blue/20 rounded-full blur-3xl"
      ></div>
      <div 
        ref="floatingShapes"
        class="hero-parallax-layer absolute bottom-40 left-20 w-[500px] h-[500px] bg-gradient-to-tr from-brand-blue/15 to-yellow-400/10 rounded-full blur-3xl"
      ></div>
      <div 
        ref="floatingShapes"
        class="hero-parallax-layer absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-brand-red/10 rounded-full blur-3xl"
      ></div>
      
      <!-- Геометрические фигуры -->
      <div class="hero-parallax-layer absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/10 rounded-lg rotate-45 animate-rotate-slow"></div>
      <div class="hero-parallax-layer absolute bottom-1/3 right-10 w-20 h-20 border-2 border-brand-red/20 rounded-full animate-float-new"></div>
      <div class="hero-parallax-layer absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-br from-brand-blue/30 to-transparent rounded-lg animate-float-new" style="animation-delay: 1s;"></div>
    </div>

    <!-- Частицы -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 20" 
        :key="i"
        class="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }"
      ></div>
    </div>

    <!-- Контент -->
    <Container class="relative z-10 py-32">
      <div class="max-w-5xl">
        <!-- Заголовок с эффектом появления -->
        <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white leading-tight drop-shadow-2xl">
          <span class="block overflow-hidden">
            <span class="inline-block hero-text-reveal">Игрушки от</span>
          </span>
          <span class="block overflow-hidden mt-2">
            <span class="inline-block hero-text-reveal text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200" style="animation-delay: 0.2s;">
              производителя
            </span>
          </span>
        </h1>

        <!-- Подзаголовок -->
        <p class="hero-subtitle text-xl md:text-3xl mb-12 text-blue-100 leading-relaxed drop-shadow-lg max-w-3xl">
          <span class="block overflow-hidden">
            <span class="inline-block blur-reveal">
              Крупнейший производитель игрушек в Центральной Азии.
            </span>
          </span>
          <span class="block overflow-hidden mt-2">
            <span class="inline-block blur-reveal text-blue-200 font-semibold" style="transition-delay: 0.3s;">
              Экспорт в 12 стран мира.
            </span>
          </span>
        </p>

        <!-- Кнопки -->
        <div class="hero-buttons flex flex-col sm:flex-row gap-6">
          <Button
            @click="navigateToCatalog"
            variant="primary"
            size="xl"
            class="ripple group relative overflow-hidden bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red border-0 shadow-2xl hover:shadow-brand-red/50 transition-all duration-500"
          >
            <span class="flex items-center gap-3 text-lg font-semibold">
              <span>Смотреть каталог</span>
              <svg class="w-6 h-6 transform group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>

          <Button
            @click="navigateToAbout"
            variant="outline"
            size="xl"
            class="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/25 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span class="flex items-center gap-2 text-lg font-medium">
              <span>О компании</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
          </Button>
        </div>

        <!-- Стрелка вниз -->
        <div
          ref="scrollArrow"
          class="scroll-arrow absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          title="Прокрутить вниз"
        >
          <svg
            class="w-8 h-8 text-white/60 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-white/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Листайте вниз
          </div>
        </div>
      </div>
    </Container>

    <!-- Wave Divider с анимацией -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path
          d="M0 0L60 16C120 32 240 64 360 80C480 96 600 96 720 88C840 80 960 64 1080 72C1200 80 1320 112 1380 128L1440 144V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
          fill="#f9fafb"
          class="animate-pulse-slow"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0 0L60 16C120 32 240 64 360 80C480 96 600 96 720 88C840 80 960 64 1080 72C1200 80 1320 112 1380 128L1440 144V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z;
              M0 0L60 8C120 16 240 32 360 40C480 48 600 48 720 44C840 40 960 32 1080 40C1200 48 1320 72 1380 84L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z;
              M0 0L60 16C120 32 240 64 360 80C480 96 600 96 720 88C840 80 960 64 1080 72C1200 80 1320 112 1380 128L1440 144V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z
            "
          />
        </path>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Дополнительные стили для анимаций */
.hero-text-reveal {
  animation: hero-text-reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes hero-text-reveal {
  0% {
    clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    opacity: 0;
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 1;
  }
}

.blur-reveal {
  opacity: 0;
  filter: blur(10px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.blur-reveal.active {
  opacity: 1;
  filter: blur(0);
}

/* Trigger blur reveal on mount */
.blur-reveal {
  opacity: 1;
  filter: blur(0);
}
</style>
