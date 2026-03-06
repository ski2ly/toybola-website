<script setup>
import { Container, Heading, Section, Card } from '@/components/ui'

const countries = [
  { name: 'Казахстан', flag: '🇰🇿' },
  { name: 'Россия', flag: '🇷🇺' },
  { name: 'Узбекистан', flag: '🇺🇿' },
  { name: 'Кыргызстан', flag: '🇰🇬' },
  { name: 'Таджикистан', flag: '🇹🇯' },
  { name: 'Туркменистан', flag: '🇹🇲' },
  { name: 'Азербайджан', flag: '🇦🇿' },
  { name: 'Грузия', flag: '🇬🇪' },
  { name: 'Армения', flag: '🇦🇲' },
  { name: 'Беларусь', flag: '🇧🇾' },
  { name: 'Польша', flag: '🇵🇱' },
  { name: 'Германия', flag: '🇩🇪' }
]
</script>

<template>
  <Section padding="lg">
    <Container>
      <div class="text-center mb-12 animate-fade-in-up">
        <Heading size="3xl" align="center" class="mb-4">
          География экспорта
        </Heading>
        <p class="text-xl text-gray-600">
          Наша продукция представлена в 12 странах мира
        </p>
      </div>

      <Card variant="elevated" padding="lg">
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <div
            v-for="(country, index) in countries"
            :key="country.name"
            :style="{ animationDelay: `${index * 0.05}s` }"
            class="text-center group animate-fade-in"
          >
            <div class="text-5xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
              {{ country.flag }}
            </div>
            <div class="text-sm font-medium text-gray-700 group-hover:text-brand-blue transition-colors">
              {{ country.name }}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  </Section>
</template>
