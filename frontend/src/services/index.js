import api from './api'

export const productsService = {
  getAll(params = {}) {
    return api.get('/products', { params })
  },

  getBySlug(slug) {
    return api.get(`/products/${slug}`)
  },

  getBySku(sku) {
    return api.get(`/products/sku/${sku}`)
  },

  getFeatured(limit = 10) {
    return api.get('/products', { params: { featured: true, limit } })
  },

  getNew(limit = 10) {
    return api.get('/products', { params: { new: true, limit } })
  },

  // Admin methods
  adminGetAll(params = {}) {
    return api.get('/admin/products', { params })
  },

  adminGetOne(id) {
    return api.get(`/admin/products/${id}`)
  },

  adminCreate(data) {
    return api.post('/admin/products', data)
  },

  adminUpdate(id, data) {
    return api.put(`/admin/products/${id}`, data)
  },

  adminDelete(id) {
    return api.delete(`/admin/products/${id}`)
  }
}

export const categoriesService = {
  getAll(active = true) {
    return api.get('/categories', { params: { active } })
  },

  getBySlug(slug) {
    return api.get(`/categories/${slug}`)
  },

  getSubcategories(slug) {
    return api.get(`/categories/${slug}/subcategories`)
  },

  // Admin methods
  adminGetAll() {
    return api.get('/admin/categories')
  },

  adminCreate(data) {
    return api.post('/admin/categories', data)
  },

  adminUpdate(id, data) {
    return api.put(`/admin/categories/${id}`, data)
  },

  adminDelete(id) {
    return api.delete(`/admin/categories/${id}`)
  }
}

export const authService = {
  login(email, password) {
    return api.post('/auth/login', { email, password })
  },

  logout() {
    localStorage.removeItem('admin_token')
  },

  getToken() {
    return localStorage.getItem('admin_token')
  },

  setToken(token) {
    localStorage.setItem('admin_token', token)
  },

  isAuthenticated() {
    return !!localStorage.getItem('admin_token')
  }
}

export const importService = {
  uploadExcel(file, options = {}) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('updateExisting', options.updateExisting !== false)
    formData.append('createCategories', options.createCategories !== false)

    return api.post('/import/excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  getLogs() {
    return api.get('/import/logs')
  },

  getLog(id) {
    return api.get(`/import/logs/${id}`)
  }
}

export const contactFormService = {
  submit(data) {
    return api.post('/contact-form/submit', data)
  },

  getAll(params = {}) {
    return api.get('/admin/contact-form', { params })
  },

  updateStatus(id, status) {
    return api.patch(`/admin/contact-form/${id}/status`, { status })
  },

  delete(id) {
    return api.delete(`/admin/contact-form/${id}`)
  }
}
