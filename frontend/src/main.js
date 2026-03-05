import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Reveal animation on scroll
function reveal() {
  var reveals = document.querySelectorAll('.reveal')
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight
    var elementTop = reveals[i].getBoundingClientRect().top
    var elementVisible = 150
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active')
    }
  }
}

window.addEventListener('scroll', reveal)
// Trigger once on load
reveal()
