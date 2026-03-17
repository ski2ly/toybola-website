import { defineStore } from 'pinia'
import { categoriesService, productsService } from '@/services'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    categories: [],
    subcategories: [],
    products: [],
    featuredProducts: [],
    newProducts: [],
    filters: {
      category: null,
      subcategory: null,
      age: null,
      material: null,
      priceMin: null,
      priceMax: null,
      availability: null,
      search: ''
    },
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    },
    loading: false,
    error: null
  }),

  getters: {
    hasCategories: (state) => state.categories.length > 0,
    hasProducts: (state) => state.products.length > 0
  },

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await categoriesService.getAll()
        this.categories = response.data || []
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
        this.error = error.response?.data?.message || 'Ошибка загрузки категорий'
      } finally {
        this.loading = false
      }
    },

    async fetchSubcategories(categorySlug) {
      try {
        const response = await categoriesService.getSubcategories(categorySlug)
        this.subcategories = response.data || []
      } catch (error) {
        console.error('Ошибка загрузки подкатегорий:', error)
        this.error = error.response?.data?.message || 'Ошибка загрузки подкатегорий'
      }
    },

    async fetchProducts(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        const queryParams = {
          ...this.filters,
          ...params,
          page: params.page || this.pagination.page,
          limit: params.limit || this.pagination.limit
        }

        // Очистка null значений
        Object.keys(queryParams).forEach(key => {
          if (queryParams[key] === null || queryParams[key] === '') {
            delete queryParams[key]
          }
        })

        const response = await productsService.getAll(queryParams)
        
        // Безопасное извлечение данных
        const data = response.data?.data || response.data || []
        const meta = response.data?.meta || {}

        this.products = data
        this.pagination = {
          page: meta.page || this.pagination.page,
          limit: meta.perPage || this.pagination.limit,
          total: meta.total || 0,
          totalPages: meta.totalPages || Math.ceil((meta.total || 0) / (meta.perPage || this.pagination.limit))
        }
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error)
        this.error = error.response?.data?.message || 'Ошибка загрузки товаров'
        this.products = []
      } finally {
        this.loading = false
      }
    },

    async fetchFeatured(limit = 8) {
      try {
        const response = await productsService.getFeatured(limit)
        this.featuredProducts = response.data?.data || response.data || []
      } catch (error) {
        console.error('Ошибка загрузки рекомендуемых товаров:', error)
      }
    },

    async fetchNew(limit = 8) {
      try {
        const response = await productsService.getNew(limit)
        this.newProducts = response.data?.data || response.data || []
      } catch (error) {
        console.error('Ошибка загрузки новых товаров:', error)
      }
    },

    setFilter(key, value) {
      this.filters[key] = value
      this.pagination.page = 1
    },

    resetFilters() {
      this.filters = {
        category: null,
        subcategory: null,
        age: null,
        material: null,
        priceMin: null,
        priceMax: null,
        availability: null,
        search: ''
      }
      this.pagination.page = 1
    },

    setPage(page) {
      this.pagination.page = page
    }
  }
})
