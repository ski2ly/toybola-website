<script setup>
import { Container } from '@/components/ui'
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const stats = ref([
  {
    value: 0,
    endValue: 15,
    suffix: '+',
    label: 'лет на рынке',
    icon: 'M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  },
  {
    value: 0,
    endValue: 71,
    suffix: 'M+',
    label: 'игрушек произведено',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    value: 0,
    endValue: 1000,
    suffix: '+',
    label: 'сотрудников',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    value: 0,
    endValue: 12,
    suffix: '',
    label: 'стран экспорта',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="stat.icon" />
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
