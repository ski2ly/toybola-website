<script setup>
import { Container } from '@/components/ui'

const props = defineProps({
  block: {
    type: Object,
    default: () => ({
      content: {
        title: { ru: 'Заголовок' },
        text: { ru: 'Текстовый блок' }
      }
    })
  }
})

const content = props.block?.content || {}
const title = content.title?.ru || 'Заголовок'
const text = content.text?.ru || 'Текстовый блок'
</script>

<template>
  <section class="py-20 bg-white">
    <Container>
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">{{ title }}</h2>
        <div class="prose prose-lg text-gray-700">
          <p>{{ text }}</p>
        </div>
      </div>
    </Container>
  </section>
</template>
