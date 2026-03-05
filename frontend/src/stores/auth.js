import { defineStore } from 'pinia'
import { authService } from '@/services'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('admin_token'),
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await authService.login(email, password)
        this.token = response.data.access_token
        this.user = response.data.user
        authService.setToken(this.token)
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Ошибка входа'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      authService.logout()
      this.token = null
      this.user = null
    },

    checkAuth() {
      if (this.token && !this.user) {
        // Токен есть, но пользователя нет - можно сделать запрос к /me
        // Пока просто считаем что авторизован
        return true
      }
      return !!this.token
    }
  }
})
