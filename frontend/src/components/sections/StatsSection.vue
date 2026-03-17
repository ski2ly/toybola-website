<script setup>
import { Container } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const stats = ref([
  { value: 0, endValue: 15, suffix: '+', label: 'лет на рынке' },
  { value: 0, endValue: 71, suffix: 'M+', label: 'игрушек произведено' },
  { value: 0, endValue: 1000, suffix: '+', label: 'сотрудников' },
  { value: 0, endValue: 12, suffix: '', label: 'стран экспорта' },
])

const statsSectionRef = ref(null)
const hasAnimated = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          animateStats()
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsSectionRef.value) {
    observer.observe(statsSectionRef.value)
  }
})

const animateStats = () => {
  stats.value.forEach((stat, index) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.endValue,
      duration: 2,
      ease: 'power2.out',
      delay: index * 0.15,
      onUpdate: () => {
        stat.value = Math.round(obj.val)
      }
    })
  })
}
</script>

<template>
  <section ref="statsSectionRef" class="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/50 relative overflow-hidden">
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center group">
          <div class="relative inline-block mb-5">
            <div class="relative w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style="background: linear-gradient(135deg, #E31E24 0%, #FF6B6B 50%, #0072CE 100%);">
              <svg class="w-8 h-8 md:w-9 md:h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="stats[0].icon" />
              </svg>
            </div>
          </div>
          <div class="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-blue">
              {{ stat.value }}{{ stat.suffix }}
            </span>
          </div>
          <div class="text-gray-600 text-sm md:text-base font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
