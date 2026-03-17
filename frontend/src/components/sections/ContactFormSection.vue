<script setup>
import { ref, onMounted } from 'vue'
import { Container, Heading } from '@/components/ui'
import { contactFormService } from '@/services'
import { gsap } from 'gsap'

const form = ref({
  name: '',
  phone: '',
  email: '',
  topic: '',
  message: ''
})

const formContainerRef = ref(null)
const isSubmitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateForm()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  if (formContainerRef.value) {
    observer.observe(formContainerRef.value)
  }
})

const animateForm = () => {
  const tl = gsap.timeline()
  
  tl.from('.contact-heading', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  
  tl.from('.contact-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  
  tl.from('.contact-form-card', {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.6')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await contactFormService.submit({
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email || null,
      topic: form.value.topic,
      message: form.value.message || null
    })
    submitted.value = true
    
    // Анимация успеха
    gsap.from('.success-animation', {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
  } catch (error) {
    submitError.value = error.response?.data?.message || 'Ошибка отправки. Попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="relative py-24 bg-cover bg-center bg-fixed overflow-hidden" style="background-image: url('/images/backgrounds/background.svg');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-800/40 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

    <!-- Декоративные элементы -->
    <div class="absolute top-20 right-20 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-40 left-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>

    <!-- Плавающие элементы -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/10 rounded-full animate-float-new"></div>
      <div class="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-lg animate-float-new" style="animation-delay: 0.5s;"></div>
      <div class="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-brand-red/20 to-transparent rounded-full animate-float-new" style="animation-delay: 1s;"></div>
    </div>

    <Container class="relative z-10">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <div class="contact-heading inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm font-bold text-white uppercase tracking-wider">Контакты</span>
          </div>
          
          <Heading size="3xl" class="contact-heading mb-4 text-white drop-shadow-lg">
            Свяжитесь с нами
          </Heading>
          <p class="contact-subtitle text-xl text-blue-100 drop-shadow-md max-w-2xl mx-auto">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <div ref="formContainerRef" class="contact-form-card bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <form class="space-y-6" @submit.prevent="handleSubmit" v-if="!submitted">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Имя -->
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Ваше имя <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Ваше имя"
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Телефон -->
              <div class="group">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Номер телефона <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    class="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-gray-50 hover:bg-white"
                  />
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Тема -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Тема обращения <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="form.topic"
                  required
                  class="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>Выберите тему</option>
                  <option value="cooperation">Сотрудничество / Дистрибьюция</option>
                  <option value="wholesale">Оптовый заказ</option>
                  <option value="question">Вопрос по продукции</option>
                  <option value="support">Техническая поддержка</option>
                  <option value="other">Другое</option>
                </select>
                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Электронная почта
                <span class="text-gray-400 text-xs">(необязательно)</span>
              </label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Сообщение -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Сообщение
              </label>
              <div class="relative">
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Опишите ваш вопрос или предложение..."
                  class="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                ></textarea>
                <div class="absolute right-4 top-4 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="group w-full py-5 bg-gradient-to-r from-brand-red to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-brand-red transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-brand-red/30 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative"
              :disabled="isSubmitting"
            >
              <span class="relative z-10 flex items-center justify-center gap-3">
                {{ isSubmitting ? 'Отправка...' : 'Отправить сообщение' }}
                <svg v-if="!isSubmitting" class="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            <p v-if="submitError" class="text-sm text-red-500 text-center bg-red-50 py-3 px-4 rounded-xl border border-red-100">
              {{ submitError }}
            </p>

            <p class="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </form>

          <!-- Success Message -->
          <div v-else class="success-animation text-center py-16">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-xl">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <Heading size="2xl" class="mb-4 text-gray-900">Спасибо за заявку!</Heading>
            <p class="text-gray-600 text-lg">
              Наш менеджер свяжется с вами в ближайшее время
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
