<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-red/10 to-brand-blue/10 rounded-full mb-6">
            <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm font-bold text-brand-red uppercase tracking-wider">Контакты</span>
          </div>
          <h1 class="text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue">Свяжитесь с нами</h1>
          <p class="text-xl text-gray-600">Мы всегда готовы ответить на ваши вопросы и предложить лучшие решения для вашего бизнеса</p>
        </div>
      </div>
    </section>

    <!-- Contact Info & Form -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Контактная информация</h2>

            <div class="space-y-6 mb-12">
              <div class="flex items-start gap-4 group">
                <div @click="navigateTo('/about')" class="w-14 h-14 bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 cursor-pointer">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Адрес</h3>
                  <p class="text-gray-600">Узбекистан, Ташкент</p>
                  <button @click="navigateTo('/about')" class="text-sm text-brand-blue font-medium hover:underline mt-1">Показать на карте →</button>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div class="w-14 h-14 bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Телефон</h3>
                  <a href="tel:+998950952222" class="text-lg font-bold text-brand-blue hover:text-brand-red transition-colors">+998 95 095 2222</a>
                  <p class="text-sm text-gray-500">Пн-Пт: 9:00 - 18:00</p>
                </div>
              </div>

              <div class="flex items-start gap-4 group">
                <div class="w-14 h-14 bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@toybola.uz" class="text-lg font-bold text-brand-blue hover:text-brand-red transition-colors">support@toybola.uz</a>
                  <p class="text-sm text-gray-500">Ответим в течение 24 часов</p>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
              <h3 class="font-bold text-gray-900 mb-4">Мы в социальных сетях</h3>
              <div class="flex gap-3">
                <a href="https://www.instagram.com/toybolatoys/" target="_blank" class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.youtube.com/channel/UCQBSmktBQ80WERmZF1JCngA" target="_blank" class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@toybolatoys" target="_blank" class="w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-3.92 1.98-6.09 1.69-2.92-.36-5.55-2.28-6.69-4.97-.85-1.96-.91-4.24-.17-6.24.97-2.64 3.27-4.68 6.02-5.32.63-.15 1.28-.23 1.93-.23v4.11c-.66-.09-1.34-.03-1.98.18-1.2.38-2.13 1.38-2.45 2.59-.35 1.29.03 2.71.96 3.66.93.95 2.34 1.33 3.64.98 1.24-.33 2.24-1.35 2.56-2.6.11-.42.16-.86.16-1.3V.02h-3.07z"/></svg>
                </a>
                <a href="https://t.me/toybolatoys" target="_blank" class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Напишите нам</h2>

            <div class="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ваше имя <span class="text-red-500">*</span></label>
                    <input v-model="form.name" type="text" required placeholder="Ваше имя" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"/>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Телефон <span class="text-red-500">*</span></label>
                    <input v-model="form.phone" type="tel" required placeholder="Ваш номер телефона" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"/>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email <span class="text-gray-400 text-xs">(необязательно)</span></label>
                  <input v-model="form.email" type="email" placeholder="your@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Тема <span class="text-red-500">*</span></label>
                  <select v-model="form.topic" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all">
                    <option value="" disabled selected>Выберите тему</option>
                    <option value="cooperation">Сотрудничество / Дистрибьюция</option>
                    <option value="wholesale">Оптовый заказ</option>
                    <option value="question">Вопрос по продукции</option>
                    <option value="support">Техническая поддержка</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea v-model="form.message" rows="4" placeholder="Опишите ваш вопрос..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-none"></textarea>
                </div>
                <button type="submit" class="w-full py-4 bg-gradient-to-r from-brand-red to-red-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">Отправить сообщение</button>
                <p class="text-xs text-gray-500 text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
