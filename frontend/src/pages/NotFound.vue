<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center px-4">
      <h1 class="text-9xl font-bold text-gray-200">404</h1>
      <h2 class="text-3xl font-semibold mt-4 mb-2">Страница не найдена</h2>
      <p class="text-gray-600 mb-8">
        Страница, которую вы ищете, не существует или была перемещена.
      </p>
      <div class="flex gap-4 justify-center">
        <router-link
          to="/"
          class="px-6 py-3 bg-[#FF6B00] text-white rounded-lg hover:bg-[#ff8533] transition-colors"
        >
          На главную
        </router-link>
        <a
          href="https://ctgtb.uz"
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          В каталог ↗
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Страница 404 - не найдено
</script>
