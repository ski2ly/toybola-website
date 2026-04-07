<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

let cursorAnimationFrame = null
let cursorElement = null

onMounted(() => {
  if (window.innerWidth < 1024) return

  cursorElement = document.createElement('div')
  cursorElement.className = 'custom-cursor'
  document.body.appendChild(cursorElement)

  let cursorX = 0, cursorY = 0

  function animateCursor() {
    cursorElement.style.left = cursorX + 'px'
    cursorElement.style.top = cursorY + 'px'
    cursorAnimationFrame = requestAnimationFrame(animateCursor)
  }
  animateCursor()

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX
    cursorY = e.clientY
  }, { passive: true })

  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorElement.classList.add('hovered'))
    el.addEventListener('mouseleave', () => cursorElement.classList.remove('hovered'))
  })
})

onUnmounted(() => {
  if (cursorAnimationFrame) {
    cancelAnimationFrame(cursorAnimationFrame)
    cursorAnimationFrame = null
  }
  if (cursorElement) {
    cursorElement.remove()
    cursorElement = null
  }
})
</script>

<template>
  <!-- Cursor is managed imperatively -->
</template>
