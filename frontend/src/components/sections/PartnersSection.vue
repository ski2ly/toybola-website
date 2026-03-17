<script setup>
import { Container } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const partners = ref([])

onMounted(() => {
  // Анимация появления карточек партнеров
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power3.out'
            }
          )
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.partner-card').forEach(card => {
    observer.observe(card)
  })
})
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/50">
    <Container>
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-blue">
            Наши партнеры
          </span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Мы сотрудничаем с ведущими компаниями по всему миру
        </p>
      </div>

      <!-- Партнеры будут добавлены позже -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
        <!-- Placeholder для партнеров -->
        <div
          v-for="i in 8"
          :key="i"
          class="partner-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center min-h-[160px] border border-gray-100"
        >
          <div class="text-gray-300 text-center">
            <svg class="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span class="text-sm font-medium">Логотип партнера</span>
          </div>
        </div>
      </div>

      <!-- Сообщение для будущих партнеров -->
      <div class="text-center mt-12">
        <p class="text-gray-500 text-sm">
          Раздел находится в разработке. Скоро здесь появятся логотипы наших партнеров.
        </p>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.partner-card:hover {
  transform: translateY(-4px);
  border-color: rgba(227, 30, 36, 0.2);
}
</style>
