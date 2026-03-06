<script setup>
import { Container } from '@/components/ui'

const stats = [
  { value: '15+', label: 'лет на рынке' },
  { value: '71M+', label: 'игрушек произведено' },
  { value: '1000+', label: 'сотрудников' },
  { value: '12', label: 'стран экспорта' },
]
</script>

<template>
  <section class="py-20 bg-gray-50">
    <Container>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center reveal"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="text-5xl md:text-6xl font-bold text-gradient mb-4">{{ stat.value }}</div>
          <div class="text-gray-600 text-lg">{{ stat.label }}</div>
        </div>
      </div>
    </Container>
  </section>
</template>
