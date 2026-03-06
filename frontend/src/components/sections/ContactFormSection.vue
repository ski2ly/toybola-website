<script setup>
import { ref } from 'vue'
import { Container, Heading } from '@/components/ui'
import { contactFormService } from '@/services'

const form = ref({
  name: '',
  phone: '',
  email: '',
  topic: '',
  message: ''
})

const isSubmitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

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
    // Reset form
    form.value = {
      name: '',
      phone: '',
      email: '',
      topic: '',
      message: ''
    }
  } catch (error) {
    submitError.value = error.response?.data?.message || 'Ошибка отправки. Попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="relative py-20 bg-cover bg-center bg-fixed" style="background-image: url('/images/backgrounds/background.svg');">
    <!-- Overlay - более прозрачный -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>

    <Container class="relative">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12 reveal">
          <Heading size="3xl" align="center" class="mb-4 text-white">
            Свяжитесь с нами
          </Heading>
          <p class="text-xl text-blue-100">
            Заполните форму и мы свяжемся с вами в ближайшее время
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 reveal">
          <form class="space-y-6" @submit.prevent="handleSubmit" v-if="!submitted">
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
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
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
                />
              </div>
            </div>

            <!-- Тема -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Тема обращения <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.topic"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all bg-white"
              >
                <option value="" disabled selected>Выберите тему</option>
                <option value="cooperation">Сотрудничество / Дистрибьюция</option>
                <option value="wholesale">Оптовый заказ</option>
                <option value="question">Вопрос по продукции</option>
                <option value="support">Техническая поддержка</option>
                <option value="other">Другое</option>
              </select>
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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all"
              />
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
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full py-4 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl btn-primary"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Отправка...' : 'Отправить сообщение' }}
            </button>

            <p v-if="submitError" class="text-sm text-red-500 text-center bg-red-50 py-2 px-4 rounded-lg">
              {{ submitError }}
            </p>

            <p class="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </form>

          <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">✅</div>
            <Heading size="2xl" class="mb-4">Спасибо за заявку!</Heading>
            <p class="text-gray-600 text-lg">
              Наш менеджер свяжется с вами в ближайшее время
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
