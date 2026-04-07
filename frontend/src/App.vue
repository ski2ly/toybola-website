<script setup>
import { RouterView } from 'vue-router'
import CustomCursor from '@/components/common/CustomCursor.vue'
import ScrollProgress from '@/components/common/ScrollProgress.vue'
</script>

<template>
  <div class="relative">
    <!-- Custom cursor -->
    <CustomCursor />

    <!-- Scroll progress -->
    <ScrollProgress />

    <!-- Loader - исчезает сам через CSS анимацию -->
    <div class="loader fixed inset-0 z-[9999] flex items-center justify-center">
      <!-- Фоновое изображение -->
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/images/backgrounds/background.svg');"></div>

      <!-- Градиент поверх фона -->
      <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(227, 30, 36, 0.92) 0%, rgba(0, 114, 206, 0.92) 100%);"></div>

      <!-- Логотип по центру -->
      <div class="relative z-10 text-center">
        <img
          src="/images/logo/logotoybola_main.svg"
          alt="Toybola"
          class="w-[220px] h-[220px] mx-auto animate-pulse"
          style="filter: drop-shadow(0 20px 40px rgba(0,0,0,0.3));"
          onerror="this.style.display='none'"
        />
      </div>
    </div>

    <RouterView />
  </div>
</template>

<style scoped>
.loader {
  animation: loaderFadeOut 500ms ease-in-out 1200ms forwards;
}

@keyframes loaderFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
