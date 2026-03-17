import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/v1'

// Проверяем наличие API_URL в production
if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL не установлен, используется относительный путь')
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 секунд таймаут
})

// Interceptor для добавления токена
api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor для обработки ошибок
api.interceptors.response.use(
  response => response,
  error => {
    // Обработка 401 ошибки
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname
      // Не редиректим если уже на странице логина
      if (!currentPath.startsWith('/admin/login')) {
        localStorage.removeItem('admin_token')
        window.location.href = '/admin/login'
      }
    }
    
    // Обработка 403 ошибки
    if (error.response?.status === 403) {
      console.error('Доступ запрещен')
    }
    
    // Обработка 500 ошибки
    if (error.response?.status === 500) {
      console.error('Ошибка сервера')
    }
    
    return Promise.reject(error)
  }
)

export default api
