<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '@/stores/catalog'

const catalogStore = useCatalogStore()

const emit = defineEmits(['filter-change'])

const ageOptions = [
  { value: '0-3', label: '0-3 года' },
  { value: '3+', label: '3+' },
  { value: '6+', label: '6+' },
  { value: '12+', label: '12+' }
]

const availabilityOptions = [
  { value: 'in_stock', label: 'В наличии' },
  { value: 'low_stock', label: 'Мало' },
  { value: 'out_of_stock', label: 'Нет' }
]

const handleFilterChange = (key, value) => {
  catalogStore.setFilter(key, value)
  emit('filter-change', { key, value })
}

const clearFilters = () => {
  catalogStore.resetFilters()
  emit('filter-change', {})
}

const hasActiveFilters = computed(() => {
  const filters = catalogStore.filters
  return Object.values(filters).some(v => v !== null && v !== '')
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Фильтры</h2>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm text-brand-red hover:underline"
      >
        Сбросить
      </button>
    </div>

    <!-- Search -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Поиск
      </label>
      <input
        :value="catalogStore.filters.search"
        @input="handleFilterChange('search', $event.target.value)"
        type="text"
        placeholder="SKU или название"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
    </div>

    <!-- Age Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Возраст
      </label>
      <div class="space-y-2">
        <label
          v-for="option in ageOptions"
          :key="option.value"
          class="flex items-center cursor-pointer"
        >
          <input
            type="radio"
            :value="option.value"
            :checked="catalogStore.filters.age === option.value"
            @change="handleFilterChange('age', option.value)"
            class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
          />
          <span class="ml-2 text-sm text-gray-700">{{ option.label }}</span>
        </label>
        <label class="flex items-center cursor-pointer">
          <input
            type="radio"
            value=""
            :checked="catalogStore.filters.age === null"
            @change="handleFilterChange('age', null)"
            class="w-4 h-4 text-brand-blue focus:ring-brand-blue"
          />
          <span class="ml-2 text-sm text-gray-500">Любой</span>
        </label>
      </div>
    </div>

    <!-- Availability Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Наличие
      </label>
      <select
        :value="catalogStore.filters.availability || ''"
        @change="handleFilterChange('availability', $event.target.value || null)"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
      >
        <option value="">Любое</option>
        <option
          v-for="option in availabilityOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Price Range -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Цена, $
      </label>
      <div class="flex gap-2">
        <input
          :value="catalogStore.filters.priceMin || ''"
          @input="handleFilterChange('priceMin', $event.target.value ? Number($event.target.value) : null)"
          type="number"
          placeholder="От"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <input
          :value="catalogStore.filters.priceMax || ''"
          @input="handleFilterChange('priceMax', $event.target.value ? Number($event.target.value) : null)"
          type="number"
          placeholder="До"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>
    </div>
  </div>
</template>
