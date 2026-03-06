<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'section'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'alternate', 'dark', 'gradient'].includes(value)
  },
  padding: {
    type: String,
    default: 'default',
    validator: (value) => ['none', 'sm', 'default', 'lg', 'xl'].includes(value)
  }
})

const variantClasses = computed(() => ({
  default: 'bg-white',
  alternate: 'bg-gray-50',
  dark: 'bg-gray-900 text-white',
  gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100'
}))

const paddingClasses = computed(() => ({
  none: '',
  sm: 'py-8',
  default: 'py-16',
  lg: 'py-24',
  xl: 'py-32'
}))
</script>

<template>
  <component :is="as" :class="[variantClasses[variant], paddingClasses[padding]]">
    <slot />
  </component>
</template>
