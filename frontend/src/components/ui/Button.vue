<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['sm', 'default', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => ({
  primary: 'bg-brand-red text-white hover:bg-red-700 shadow-lg hover:shadow-xl',
  secondary: 'bg-brand-blue text-white hover:bg-blue-700 shadow-md hover:shadow-lg',
  outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
  ghost: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700'
}))

const sizeClasses = computed(() => ({
  sm: 'px-4 py-2 text-sm',
  default: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
}))
</script>

<template>
  <component
    :is="as"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      loading && 'cursor-wait'
    ]"
    :disabled="disabled || loading"
  >
    <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
    </svg>
    <slot />
  </component>
</template>
