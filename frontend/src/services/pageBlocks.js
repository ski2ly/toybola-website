import api from './api'

export const pageBlocksService = {
  async getByPage(page) {
    const response = await api.get(`/page-blocks?page=${page}`)
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/page-blocks/${id}`)
    return response.data
  },

  async create(blockData) {
    const response = await api.post('/page-blocks', blockData)
    return response.data
  },

  async update(id, blockData) {
    const response = await api.patch(`/page-blocks/${id}`, blockData)
    return response.data
  },

  async remove(id) {
    const response = await api.delete(`/page-blocks/${id}`)
    return response.data
  },

  async reorder(page, blockOrder) {
    const response = await api.post('/page-blocks/reorder', { page, blockOrder })
    return response.data
  },

  async toggleStatus(id) {
    const response = await api.post(`/page-blocks/${id}/toggle`)
    return response.data
  },
}
