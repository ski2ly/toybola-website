<script setup>
import { Container } from '@/components/ui'

const props = defineProps({
  block: {
    type: Object,
    default: () => ({
      content: {
        imageUrl: '/images/placeholder.jpg',
        alt: 'Изображение',
        caption: { ru: 'Подпись' }
      }
    })
  }
})

const content = props.block?.content || {}
const imageUrl = content.imageUrl || '/images/placeholder.jpg'
const alt = content.alt || 'Изображение'
const caption = content.caption?.ru || ''
</script>

<template>
  <section class="py-20 bg-gray-50">
    <Container>
      <div class="max-w-4xl mx-auto text-center">
        <figure>
          <img :src="imageUrl" :alt="alt" class="w-full h-auto rounded-2xl shadow-lg" />
          <figcaption v-if="caption" class="mt-4 text-gray-600">{{ caption }}</figcaption>
        </figure>
      </div>
    </Container>
  </section>
</template>
