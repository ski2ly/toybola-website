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
    /**
     * Инициализация аутентификации при загрузке приложения
     * Проверяет валидность токена
     */
    initAuth() {
      const token = localStorage.getItem('admin_token')
      if (token) {
        try {
          // Проверяем валидность JWT токена
          const payload = JSON.parse(atob(token.split('.')[1]))
          const now = Date.now()
          
          // Проверяем истечение срока действия (с запасом 30 секунд)
          if (payload.exp && payload.exp * 1000 < now - 30000) {
            console.warn('Токен истек, выполняется выход')
            this.logout()
          } else {
            // Токен валиден, восстанавливаем пользователя
            this.user = {
              email: payload.email,
              role: payload.role || 'admin'
            }
          }
        } catch (error) {
          console.warn('Невалидный токен, выполняется выход:', error.message)
          this.logout()
        }
      }
    },

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
      localStorage.removeItem('admin_token')
    },

    checkAuth() {
      if (this.token && !this.user) {
        // Токен есть, но пользователя нет - пробуем восстановить
        this.initAuth()
      }
      return !!this.token
    }
  }
})
