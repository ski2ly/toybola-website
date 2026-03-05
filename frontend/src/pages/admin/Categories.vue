<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-4">
          <div class="text-2xl font-bold text-brand-red">TOYBOLA Admin</div>
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Категории</h1>
        <div class="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <div class="text-4xl mb-4">📁</div>
          <p>Управление категориями в разработке</p>
        </div>
      </main>
    </div>
  </DefaultLayout>
</template>
