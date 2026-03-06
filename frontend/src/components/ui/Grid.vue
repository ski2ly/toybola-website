<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'div'
  },
  columns: {
    type: [Number, String],
    default: 1,
    validator: (value) => [1, 2, 3, 4, 5, 6, 'responsive'].includes(value)
  },
  gap: {
    type: String,
    default: 'default',
    validator: (value) => ['sm', 'default', 'lg', 'xl'].includes(value)
  }
})

const columnsClasses = computed(() => {
  if (props.columns === 'responsive') {
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  const classMap = {
    1: 'grid-cols-1',
    2: 'grid grid-cols-1 sm:grid-cols-2',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }
  return classMap[props.columns] || classMap[1]
})

const gapClasses = computed(() => ({
  sm: 'gap-4',
  default: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10'
}))
</script>

<template>
  <component :is="as" :class="[columnsClasses, gapClasses[gap]]">
    <slot />
  </component>
</template>
