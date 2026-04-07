<script setup>
import { onMounted, onUnmounted } from 'vue'

let progressBar = null

onMounted(() => {
  progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  progressBar.style.width = '0%'
  document.body.appendChild(progressBar)

  function updateProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    progressBar.style.width = scrollPercent + '%'
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  if (progressBar) {
    progressBar.remove()
    progressBar = null
  }
})
</script>

<template>
  <!-- Progress bar is managed imperatively -->
</template>
