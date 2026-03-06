<script setup>
import { useRouter } from 'vue-router'
import { Container, Heading, Card, Grid, Section } from '@/components/ui'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const navigateToCategory = (slug) => {
  router.push(`/catalog/${slug}`)
}
</script>

<template>
  <Section padding="lg">
    <Container>
      <div class="text-center mb-12 animate-fade-in-up">
        <Heading size="3xl" align="center" class="mb-4">
          Категории продукции
        </Heading>
        <p class="text-xl text-gray-600">
          Широкий ассортимент для любого возраста
        </p>
      </div>

      <Grid columns="responsive" gap="lg">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="animate-fade-in-up"
          @click="navigateToCategory(category.slug)"
        >
          <Card variant="interactive" padding="lg" class="text-center cursor-pointer">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3 class="font-semibold text-xl mb-2 text-gray-900">
              {{ category.nameRu }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ category._count?.subcategories || 0 }} подкатегорий
            </p>
          </Card>
        </div>
      </Grid>
    </Container>
  </Section>
</template>
