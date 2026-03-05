<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['change-page'])

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('change-page', page)
  }
}

const pages = computed(() => {
  const range = []
  const current = props.currentPage
  const total = props.totalPages
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      range.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) range.push(i)
      range.push('...')
      range.push(total)
    } else if (current >= total - 3) {
      range.push(1)
      range.push('...')
      for (let i = total - 4; i <= total; i++) range.push(i)
    } else {
      range.push(1)
      range.push('...')
      for (let i = current - 1; i <= current + 1; i++) range.push(i)
      range.push('...')
      range.push(total)
    }
  }
  return range
})
</script>

<template>
  <div class="flex items-center justify-center gap-2 mt-8">
    <!-- Previous -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      ← Назад
    </button>

    <!-- Pages -->
    <div class="flex items-center gap-1">
      <button
        v-for="(page, index) in pages"
        :key="index"
        @click="typeof page === 'number' && goToPage(page)"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          page === currentPage
            ? 'bg-brand-blue text-white'
            : typeof page === 'number'
              ? 'border border-gray-300 hover:bg-gray-50'
              : 'cursor-default'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Вперед →
    </button>
  </div>
</template>
