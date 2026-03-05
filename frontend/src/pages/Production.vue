<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="bg-gray-100 min-h-screen py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-8">Производство</h1>
        <div class="bg-white rounded-lg shadow p-8">
          <p class="text-lg text-gray-700 mb-4">
            Современный завод Toybola оснащен передовым оборудованием для производства
            высококачественных игрушек.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="text-3xl mb-4">🏭</div>
              <h3 class="font-semibold text-lg mb-2">Цех литья</h3>
              <p class="text-gray-600 text-sm">
                Автоматизированные линии литья пластмасс под давлением
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="text-3xl mb-4">🎨</div>
              <h3 class="font-semibold text-lg mb-2">Цех покраски</h3>
              <p class="text-gray-600 text-sm">
                Экологичные краски на водной основе, безопасные для детей
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="text-3xl mb-4">📦</div>
              <h3 class="font-semibold text-lg mb-2">Упаковка</h3>
              <p class="text-gray-600 text-sm">
                Автоматическая линия упаковки и паллетизации
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
