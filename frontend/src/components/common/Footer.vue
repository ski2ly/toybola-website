<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const currentYear = new Date().getFullYear()

const navigateTo = (path) => {
  router.push(path)
}

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/toybolatoys/' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCQBSmktBQ80WERmZF1JCngA' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@toybolatoys' },
  { name: 'Telegram', url: 'https://t.me/toybolatoys' },
  { name: 'Facebook', url: 'https://www.facebook.com/toybolatoys' },
]
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <img 
            src="/images/logo/logotoybola_main.svg" 
            alt="Toybola"
            class="h-10 mb-4 object-contain brightness-0 invert transition-transform duration-300 hover:scale-105"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
          />
          <h3 class="text-2xl font-bold text-brand-red mb-4 hidden" style="display:none">TOYBOLA</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            Крупнейший производитель игрушек в Центральной Азии.
            Экспорт в 12 стран мира.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-4">Навигация</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <button @click="navigateTo('/')" class="text-gray-400 hover:text-white transition-colors link-underline">
                Главная
              </button>
            </li>
            <li>
              <button @click="navigateTo('/about')" class="text-gray-400 hover:text-white transition-colors link-underline">
                О компании
              </button>
            </li>
            <li>
              <button @click="navigateTo('/catalog')" class="text-gray-400 hover:text-white transition-colors link-underline">
                Каталог
              </button>
            </li>
            <li>
              <button @click="navigateTo('/contacts')" class="text-gray-400 hover:text-white transition-colors link-underline">
                Свяжитесь с нами
              </button>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-semibold mb-4">Категории</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li class="hover:text-white cursor-pointer transition-colors">Транспорт</li>
            <li class="hover:text-white cursor-pointer transition-colors">Наборы</li>
            <li class="hover:text-white cursor-pointer transition-colors">Игрушки для улицы</li>
            <li class="hover:text-white cursor-pointer transition-colors">Развивающие</li>
          </ul>
        </div>

        <!-- Contacts -->
        <div>
          <h4 class="font-semibold mb-4">Контакты</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Узбекистан, Ташкент</span>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:+998950952222" class="hover:text-white transition-colors">+998 95 095 2222</a>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:support@toybola.uz" class="hover:text-white transition-colors">support@toybola.uz</a>
            </li>
          </ul>
          
          <!-- Social Media -->
          <div class="flex gap-3 mt-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-red transition-all duration-300 hover:scale-110"
              :title="social.name"
            >
              <span class="sr-only">{{ social.name }}</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path v-if="social.name === 'Instagram'" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                <path v-else-if="social.name === 'YouTube'" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                <path v-else-if="social.name === 'TikTok'" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-3.92 1.98-6.09 1.69-2.92-.36-5.55-2.28-6.69-4.97-.85-1.96-.91-4.24-.17-6.24.97-2.64 3.27-4.68 6.02-5.32.63-.15 1.28-.23 1.93-.23v4.11c-.66-.09-1.34-.03-1.98.18-1.2.38-2.13 1.38-2.45 2.59-.35 1.29.03 2.71.96 3.66.93.95 2.34 1.33 3.64.98 1.24-.33 2.24-1.35 2.56-2.6.11-.42.16-.86.16-1.3V.02h-3.07z"/>
                <path v-else-if="social.name === 'Telegram'" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                <path v-else-if="social.name === 'Facebook'" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400">
          &copy; {{ currentYear }} Toybola. Все права защищены.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
          <router-link to="/terms" class="hover:text-white transition-colors">Условия использования</router-link>
          <router-link to="/privacy" class="hover:text-white transition-colors">Политика конфиденциальности</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
