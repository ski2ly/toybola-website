<script setup>
import { Container } from '@/components/ui'
import { Calendar, Package, Users, Globe } from 'lucide-vue-next'

const props = defineProps({
  block: {
    type: Object,
    default: () => ({
      content: {
        stats: [
          { value: 15, suffix: '+', label: { ru: 'лет на рынке' } },
          { value: 71, suffix: 'M+', label: { ru: 'игрушек произведено' } },
          { value: 1000, suffix: '+', label: { ru: 'сотрудников' } },
          { value: 12, suffix: '', label: { ru: 'стран экспорта' } }
        ]
      }
    })
  }
})

const content = props.block?.content || {}
const stats = content.stats || [
  { value: 15, suffix: '+', label: { ru: 'лет на рынке', en: 'years on market', uz: 'bozorda yil' } },
  { value: 71, suffix: 'M+', label: { ru: 'игрушек произведено', en: 'toys produced', uz: 'ishlab chiqarilgan oʻyinchoqlar' } },
  { value: 1000, suffix: '+', label: { ru: 'сотрудников', en: 'employees', uz: 'xodimlar' } },
  { value: 12, suffix: '', label: { ru: 'стран экспорта', en: 'export countries', uz: 'eksport mamlakatlari' } }
]

const icons = [Calendar, Package, Users, Globe]
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/50 relative overflow-hidden">
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center group">
          <div class="relative inline-block mb-5">
            <div class="relative w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300" style="background: linear-gradient(135deg, #E31E24 0%, #FF6B6B 50%, #0072CE 100%);">
              <component :is="icons[index]" class="w-8 h-8 md:w-9 md:h-9 text-white" />
            </div>
          </div>
          <div class="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-blue">
              {{ stat.value }}{{ stat.suffix }}
            </span>
          </div>
          <div class="text-gray-600 text-sm md:text-base font-medium">{{ stat.label.ru }}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
