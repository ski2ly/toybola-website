<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'h2'
  },
  level: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2, 3, 4, 5, 6].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'].includes(value)
  },
  weight: {
    type: String,
    default: 'semibold',
    validator: (value) => ['normal', 'medium', 'semibold', 'bold'].includes(value)
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  }
})

const sizeClasses = computed(() => ({
  xs: 'text-xs',
  sm: 'text-sm',
  default: 'text-base',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl'
}))

const weightClasses = computed(() => ({
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}))

const alignClasses = computed(() => ({
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
}))
</script>

<template>
  <component
    :is="as"
    :class="[sizeClasses[size], weightClasses[weight], alignClasses[align]]"
  >
    <slot />
  </component>
</template>
