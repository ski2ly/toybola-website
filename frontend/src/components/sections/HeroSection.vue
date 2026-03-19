<script setup>
import { useRouter } from 'vue-router'
import { Container, Button } from '@/components/ui'

const router = useRouter()
const props = defineProps({
  block: {
    type: Object,
    default: () => ({
      content: {
        title: { ru: 'Игрушки от производителя' },
        subtitle: { ru: 'Крупнейший производитель игрушек в Центральной Азии' },
        backgroundImage: '/images/backgrounds/background.svg',
        buttons: []
      }
    })
  }
})

const EXTERNAL_CATALOG_URL = 'https://ctgtb.uz'

const navigateToCatalog = () => {
  window.open(EXTERNAL_CATALOG_URL, '_blank')
}

const navigateToAbout = () => {
  router.push('/about')
}

const content = props.block?.content || {}
const title = content.title?.ru || 'Игрушки от производителя'
const subtitle = content.subtitle?.ru || 'Крупнейший производитель игрушек в Центральной Азии'
const backgroundImage = content.backgroundImage || '/images/backgrounds/background.svg'
</script>

<template>
  <section
    class="relative hero-section min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-fixed"
    :style="{ backgroundImage: `url('${backgroundImage}')` }"
  >
    <!-- Overlay с градиентом -->
    <div class="hero-bg-overlay absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-800/40 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

    <!-- Контент -->
    <div class="relative container mx-auto px-4 py-32">
      <div class="max-w-4xl">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          <span class="block">{{ title.split('от')[0] }}</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
            {{ title.split('от')[1] || title }}
          </span>
        </h1>
        <p class="text-xl text-blue-100 drop-shadow-md">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="wave-divider">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path d="M0 0L60 8C120 16 240 32 360 40C480 48 600 48 720 44C840 40 960 32 1080 40C1200 48 1320 72 1380 84L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
      </svg>
    </div>
  </section>
</template>
