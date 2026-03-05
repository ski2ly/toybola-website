<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  // TODO: Add API call
}
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="relative bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4 text-gray-900">Контакты</h1>
        <p class="text-gray-600">Свяжитесь с нами любым удобным способом</p>
      </div>
    </section>

    <!-- Contact Info & Form -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Contact Info -->
          <div>
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Свяжитесь с нами</h2>
            
            <div class="space-y-6 mb-12">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Адрес</h3>
                  <p class="text-gray-600">Узбекистан, Ташкент</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Телефон</h3>
                  <a href="tel:+998950952222" class="text-gray-600 hover:text-[#77CED8] transition-colors">+998 95 095 2222</a>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:support@toybola.uz" class="text-gray-600 hover:text-[#77CED8] transition-colors">support@toybola.uz</a>
                </div>
              </div>
            </div>
            
            <!-- Map Placeholder -->
            <div class="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 h-64 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <p class="text-gray-500">Карта будет добавлена</p>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Напишите нам</h2>
            
            <div class="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Имя -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Ваше имя"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                    />
                  </div>
                  
                  <!-- Телефон -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Номер телефона <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      required
                      placeholder="Ваш номер телефона"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                    />
                  </div>
                </div>
                
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Электронная почта
                    <span class="text-gray-400 text-xs">(необязательно)</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Ваш email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  />
                </div>
                
                <!-- Тема -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Тема обращения <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.topic"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
                  >
                    <option value="" disabled selected>Выберите тему</option>
                    <option value="cooperation">Сотрудничество / Дистрибьюция</option>
                    <option value="wholesale">Оптовый заказ</option>
                    <option value="question">Вопрос по продукции</option>
                    <option value="support">Техническая поддержка</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <!-- Сообщение -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение
                  </label>
                  <textarea
                    v-model="form.message"
                    rows="4"
                    placeholder="Опишите ваш вопрос или предложение..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all resize-none"
                  ></textarea>
                </div>
                
                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full py-4 bg-gradient-to-r from-[#77CED8] to-[#5FB8C2] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Отправить сообщение
                </button>
                
                <p class="text-xs text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
