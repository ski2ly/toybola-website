<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'div'
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['sm', 'default', 'lg', 'xl'].includes(value)
  }
})

const sizeClasses = computed(() => ({
  sm: 'mx-auto max-w-3xl px-4 sm:px-6 lg:px-8',
  default: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  lg: 'mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8',
  xl: 'mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8'
}))
</script>

<template>
  <component :is="as" :class="sizeClasses[size]">
    <slot />
  </component>
</template>
