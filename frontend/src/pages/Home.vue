<script setup>
import { ref } from 'vue'
import { useHomeSeo } from '@/composables/useSeo'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DynamicBlockRenderer from '@/components/sections/DynamicBlockRenderer.vue'

// SEO
useHomeSeo()

// Временные хардкод блоки (пока API не работает)
const blocks = ref([
  {
    id: 1,
    page: 'home',
    blockType: 'hero',
    title: 'Hero секция',
    isEnabled: true,
    order: 1,
    bgColor: 'gradient',
    paddingTop: 'none',
    paddingBottom: 'none',
    content: {
      title: { ru: 'Игрушки от производителя' },
      subtitle: { ru: 'Крупнейший производитель игрушек в Центральной Азии' },
      backgroundImage: '/images/backgrounds/background.svg'
    }
  },
  {
    id: 2,
    page: 'home',
    blockType: 'stats',
    title: 'Статистика',
    isEnabled: true,
    order: 2,
    bgColor: 'gradient',
    paddingTop: 'lg',
    paddingBottom: 'lg',
    content: {
      stats: [
        { value: 15, suffix: '+', label: { ru: 'лет на рынке' } },
        { value: 71, suffix: 'M+', label: { ru: 'игрушек произведено' } },
        { value: 1000, suffix: '+', label: { ru: 'сотрудников' } },
        { value: 12, suffix: '', label: { ru: 'стран экспорта' } }
      ]
    }
  },
  {
    id: 3,
    page: 'home',
    blockType: 'partners',
    title: 'Наши партнеры',
    isEnabled: true,
    order: 3,
    bgColor: 'gradient',
    paddingTop: 'lg',
    paddingBottom: 'lg',
    content: {
      title: { ru: 'Наши партнеры' },
      subtitle: { ru: 'Мы сотрудничаем с ведущими компаниями по всему миру' }
    }
  },
  {
    id: 4,
    page: 'home',
    blockType: 'factory',
    title: 'Производство',
    isEnabled: true,
    order: 4,
    bgColor: 'alternate',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    content: {
      title: { ru: 'Производство мирового уровня' },
      description: { ru: 'Toybola — крупнейший производитель игрушек в Центральной Азии' },
      features: [
        { title: { ru: 'Современное производство' }, description: { ru: 'Передовые технологии и автоматизированные линии' } },
        { title: { ru: 'Контроль качества' }, description: { ru: 'Многоступенчатая система проверки каждой игрушки' } },
        { title: { ru: 'Безопасные материалы' }, description: { ru: 'Только сертифицированные и экологичные материалы' } },
        { title: { ru: 'Собственный дизайн' }, description: { ru: 'Уникальные разработки и кастомизация продукции' } }
      ]
    }
  },
  {
    id: 5,
    page: 'home',
    blockType: 'export',
    title: 'География экспорта',
    isEnabled: true,
    order: 5,
    bgColor: 'gradient',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    content: {
      title: { ru: 'География экспорта' },
      subtitle: { ru: 'Наша продукция представлена в 12 странах мира' },
      countries: [
        { name: 'Казахстан', flag: '🇰🇿', count: '2.5M+' },
        { name: 'Россия', flag: '🇷🇺', count: '15M+' },
        { name: 'Узбекистан', flag: '🇺🇿', count: '8M+' },
        { name: 'Кыргызстан', flag: '🇰🇬', count: '1.2M+' },
        { name: 'Таджикистан', flag: '🇹🇯', count: '900K+' },
        { name: 'Туркменистан', flag: '🇹🇲', count: '600K+' },
        { name: 'Азербайджан', flag: '🇦🇿', count: '1.8M+' },
        { name: 'Грузия', flag: '🇬🇪', count: '700K+' },
        { name: 'Армения', flag: '🇦🇲', count: '500K+' },
        { name: 'Беларусь', flag: '🇧🇾', count: '2M+' },
        { name: 'Польша', flag: '🇵🇱', count: '3M+' },
        { name: 'Германия', flag: '🇩🇪', count: '5M+' }
      ]
    }
  },
  {
    id: 6,
    page: 'home',
    blockType: 'contact_form',
    title: 'Контактная форма',
    isEnabled: true,
    order: 6,
    bgColor: 'gradient',
    paddingTop: 'xl',
    paddingBottom: 'xl',
    content: {
      title: { ru: 'Свяжитесь с нами' },
      subtitle: { ru: 'Заполните форму и мы свяжемся с вами в ближайшее время' }
    }
  }
])

const enabledBlocks = blocks.value.filter(b => b.isEnabled)
</script>

<template>
  <DefaultLayout>
    <DynamicBlockRenderer
      v-for="block in enabledBlocks"
      :key="block.id"
      :block="block"
    />
  </DefaultLayout>
</template>
