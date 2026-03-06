<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'div'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'interactive'].includes(value)
  },
  padding: {
    type: String,
    default: 'default',
    validator: (value) => ['none', 'sm', 'default', 'lg'].includes(value)
  }
})

const variantClasses = computed(() => ({
  default: 'bg-white border border-gray-100 shadow-md',
  elevated: 'bg-white shadow-lg shadow-gray-200/50',
  interactive: 'bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1'
}))

const paddingClasses = computed(() => ({
  none: '',
  sm: 'p-4',
  default: 'p-6',
  lg: 'p-8'
}))
</script>

<template>
  <component :is="as" :class="[variantClasses[variant], paddingClasses[padding], 'rounded-2xl transition-all duration-300']">
    <slot />
  </component>
</template>
