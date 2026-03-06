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
      limit: 50,
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
        this.categories = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchSubcategories(categorySlug) {
      try {
        const response = await categoriesService.getSubcategories(categorySlug)
        this.subcategories = response.data
      } catch (error) {
        this.error = error.message
      }
    },

    async fetchProducts(params = {}) {
      this.loading = true
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
        this.products = response.data.data
        this.pagination = {
          page: response.data.meta.page,
          limit: response.data.meta.perPage,
          total: response.data.meta.total,
          totalPages: response.data.meta.totalPages
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchFeatured(limit = 8) {
      try {
        const response = await productsService.getFeatured(limit)
        this.featuredProducts = response.data.data || response.data
      } catch (error) {
        this.error = error.message
      }
    },

    async fetchNew(limit = 8) {
      try {
        const response = await productsService.getNew(limit)
        this.newProducts = response.data.data || response.data
      } catch (error) {
        this.error = error.message
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
