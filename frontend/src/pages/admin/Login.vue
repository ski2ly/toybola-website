<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login(email.value, password.value)
    router.push('/admin')
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full mx-4">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="text-3xl font-bold text-brand-red mb-2">TOYBOLA</div>
          <h1 class="text-xl text-gray-700">Вход в админ-панель</h1>
        </div>

        <!-- Error Message -->
        <div
          v-if="error"
          class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
        >
          {{ error }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="admin@toybola.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <div class="text-sm font-medium text-gray-700 mb-2">Тестовые данные:</div>
          <div class="text-sm text-gray-600">
            <div>Email: <code class="bg-white px-2 py-1 rounded">admin@toybola.com</code></div>
            <div class="mt-1">Пароль: <code class="bg-white px-2 py-1 rounded">admin123</code></div>
          </div>
        </div>

        <!-- Back to Site -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-brand-blue hover:underline text-sm">
            ← Вернуться на сайт
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
