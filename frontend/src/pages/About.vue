<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const currentSlide = ref(0)
const totalSlides = 3
const sliderContainer = ref(null)
const slidesTrack = ref(null)

// Drag variables
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const translateX = ref(0)

const values = [
  {
    title: 'Поддержка женщин',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    description: 'Наша цель — снизить безработицу среди женщин и улучшить их положение в обществе, создавая больше возможностей для роста и равных возможностей.'
  },
  {
    title: 'Инклюзивность',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    description: 'В Toybola мы гордимся тем, что в наших фабриках работает 20 талантливых людей с ограниченными возможностями. Их преданность делу и профессионализм — важная часть нашей приверженности инклюзивности и предоставления равных возможностей для всех.'
  },
  {
    title: 'Благотворительность',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    description: 'Toybola с гордостью спонсирует и активно поддерживает Детскую больницу по лечению лейкемии, предоставляя жизненно важные ресурсы для молодых пациентов. Кроме того, мы оказываем помощь малообеспеченным детским садикам, помогая создать лучшие образовательные возможности и условия для детей из семей с низким доходом.'
  }
]

let timer = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
}

const startTimer = () => {
  timer = setInterval(nextSlide, 15000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
  }
}

const handleDragStart = (e) => {
  isDragging.value = true
  startX.value = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  if (slidesTrack.value) {
    slidesTrack.value.style.transition = 'none'
  }
}

const handleDragMove = (e) => {
  if (!isDragging.value || !slidesTrack.value || !sliderContainer.value) return

  e.preventDefault()
  currentX.value = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  translateX.value = currentX.value - startX.value

  const slideWidth = sliderContainer.value.offsetWidth
  const baseTranslate = -currentSlide.value * 100
  const percentTranslate = (translateX.value / slideWidth) * 100

  slidesTrack.value.style.transform = `translateX(${baseTranslate + percentTranslate}%)`
}

const handleDragEnd = () => {
  if (!isDragging.value || !sliderContainer.value) return

  isDragging.value = false

  const slideWidth = sliderContainer.value.offsetWidth
  const threshold = slideWidth * 0.15 // 15% threshold

  if (Math.abs(translateX.value) > threshold) {
    if (translateX.value > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  }
  // Reset - slide will animate back smoothly due to CSS transition
  translateX.value = 0
}

const goToSlide = (index) => {
  currentSlide.value = index
  stopTimer()
  startTimer()
}

onMounted(() => {
  startTimer()

  // Setup stats animation observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated.value) {
          statsAnimated.value = true
          animateStats()
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsSectionRef.value) {
    observer.observe(statsSectionRef.value)
  }
})

onUnmounted(() => {
  stopTimer()
})

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/toybolatoys/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCQBSmktBQ80WERmZF1JCngA', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@toybolatoys', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-3.92 1.98-6.09 1.69-2.92-.36-5.55-2.28-6.69-4.97-.85-1.96-.91-4.24-.17-6.24.97-2.64 3.27-4.68 6.02-5.32.63-.15 1.28-.23 1.93-.23v4.11c-.66-.09-1.34-.03-1.98.18-1.2.38-2.13 1.38-2.45 2.59-.35 1.29.03 2.71.96 3.66.93.95 2.34 1.33 3.64.98 1.24-.33 2.24-1.35 2.56-2.6.11-.42.16-.86.16-1.3V.02h-3.07z' },
  { name: 'Telegram', url: 'https://t.me/toybolatoys', icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
  { name: 'Facebook', url: 'https://www.facebook.com/toybolatoys', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
]

// Job application modal
const showJobModal = ref(false)
const jobForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  message: '',
  resume: null
})

const openJobModal = () => {
  showJobModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeJobModal = () => {
  showJobModal.value = false
  document.body.style.overflow = ''
  jobForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resume: null
  }
}

const handleFileChange = (e) => {
  jobForm.value.resume = e.target.files[0]
}

const submitJobForm = () => {
  console.log('Job application:', jobForm.value)
  // TODO: Add API call
  closeJobModal()
}

const exportCountries = [
  { region: 'Восточная Европа', countries: ['Турция', 'Беларусь', 'Молдова', 'Румыния', 'Грузия'] },
  { region: 'Центральная Азия', countries: ['Узбекистан', 'Казахстан', 'Киргизия', 'Таджикистан', 'Монголия', 'Азербайджан', 'Афганистан'] },
  { region: 'Россия', countries: ['Москва', 'Пятигорск', 'Луганск', 'Ростов', 'Дагестан', 'Чечня', 'Екатеринбург', 'Челябинск', 'Бурятия', 'Иркутск', 'Подольск'] },
]

const certificates = ref([
  { id: 1, name: 'Сертификат соответствия', image: '/images/certificates/certificate_1.png' },
  { id: 2, name: 'ISO 9001', image: '/images/certificates/certificate_2.png' },
  { id: 3, name: 'EN71', image: '/images/certificates/certificate_3.png' },
  { id: 4, name: 'ASTM F963', image: '/images/certificates/certificate_4.png' },
  { id: 5, name: 'Сертификат ЕАЭС', image: '/images/certificates/certificate_5.png' },
])

const selectedCertificate = ref(null)

const openCertificate = (cert) => {
  selectedCertificate.value = cert
}

const closeCertificate = () => {
  selectedCertificate.value = null
}

// Stats with animation
const stats = ref([
  { value: '0', endValue: 15, suffix: '+', label: 'лет на рынке' },
  { value: '0', endValue: 71, suffix: 'M+', label: 'игрушек произведено' },
  { value: '0', endValue: 1000, suffix: '+', label: 'сотрудников' },
  { value: '0', endValue: 12, suffix: '', label: 'стран экспорта' },
])

const statsSectionRef = ref(null)
const statsAnimated = ref(false)

const animateStats = () => {
  stats.value.forEach((stat, index) => {
    gsap.to(stat, {
      value: stat.endValue,
      duration: 2,
      ease: 'power2.out',
      delay: index * 0.15,
      onUpdate: () => {
        stat.value = Math.floor(stat.value)
      }
    })
  })
}
</script>

<template>
  <DefaultLayout>
    <!-- Hero Section -->
    <section class="relative hero-section min-h-[95vh] flex items-center overflow-hidden bg-cover bg-center bg-fixed" style="background-image: url('/images/backgrounds/background.svg');">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      
      <!-- Animated elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-brand-red/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-40 left-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
      
      <div class="relative container mx-auto px-4 py-32">
        <div class="max-w-4xl animate-fade-in-down">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">О компании</h1>
          <p class="text-xl text-blue-100 drop-shadow-md">
            Крупнейший производитель игрушек в Центральной Азии
          </p>
        </div>
      </div>
      <div class="wave-divider">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
          <path d="M0 0L60 8C120 16 240 32 360 40C480 48 600 48 720 44C840 40 960 32 1080 40C1200 48 1320 72 1380 84L1440 96V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>

    <!-- О компании -->
    <section class="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <!-- Иконка над заголовком -->
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl mb-6 shadow-xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            
            <h2 class="text-4xl md:text-5xl font-black mb-6">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-blue">
                Toybola
              </span>
              <span class="text-gray-800"> — лидер индустрии</span>
            </h2>
            
            <div class="prose prose-lg max-w-none text-center">
              <p class="text-gray-700 leading-relaxed mb-6 text-lg">
                Компания <strong class="text-brand-red">Toybola</strong> была основана в 2010 году и за 15 лет работы стала лидером рынка игрушек в Центральной Азии, экспортируя продукцию в 12 стран мира.
              </p>
              <p class="text-gray-700 leading-relaxed mb-6 text-lg">
                Мы производим высококачественные игрушки, которые приносят радость миллионам детей по всему миру. Наша миссия — создавать безопасные, развивающие и увлекательные игрушки, которые помогают детям познавать мир.
              </p>
              <p class="text-gray-700 leading-relaxed text-lg">
                Наш завод оснащён современным оборудованием, что позволяет нам контролировать качество на каждом этапе производства — от проектирования до упаковки готовой продукции.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Статистика -->
    <section ref="statsSectionRef" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center reveal"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4">
              {{ stat.value }}{{ stat.suffix }}
            </div>
            <div class="text-gray-600 text-lg">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- География экспорта -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Мы экспортируем в 12 стран</h2>
          <p class="text-xl text-gray-600">
            Наша продукция продаётся по всему миру
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(region, index) in exportCountries" 
            :key="index"
            class="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-8 card-hover"
          >
            <h3 class="text-2xl font-bold text-gray-900 mb-6">{{ region.region }}</h3>
            <ul class="space-y-3">
              <li
                v-for="country in region.countries"
                :key="country"
                class="flex items-center text-gray-700"
              >
                <span class="w-2 h-2 bg-gradient-to-r from-brand-red to-brand-blue rounded-full mr-3"></span>
                {{ country }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Устойчивость -->
    <section class="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] rounded-full mb-6 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="text-4xl font-bold mb-6 text-gray-900">Устойчивость</h2>
            <p class="text-xl text-gray-700 leading-relaxed">
              Toybola — это полностью устойчивая компания, которая занимается переработкой и достигает 0% выбросов CO2. Кроме того, мы поддерживаем природу, ежегодно высаживая около 500 деревьев в Узбекистане.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Наши ценности (слайдер) -->
    <section class="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <!-- Иконка над заголовком -->
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-red via-red-500 to-brand-blue rounded-2xl mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-black">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-brand-blue">
              НАШИ ЦЕННОСТИ
            </span>
          </h2>
        </div>

        <!-- Slider Container - Full Width -->
        <div class="relative w-full">
          <!-- Slides Track -->
          <div
            ref="sliderContainer"
            class="relative w-full overflow-hidden"
            @mousedown="handleDragStart"
            @mousemove="handleDragMove"
            @mouseup="handleDragEnd"
            @mouseleave="handleDragEnd"
            @touchstart="handleDragStart"
            @touchmove="handleDragMove"
            @touchend="handleDragEnd"
          >
            <div
              ref="slidesTrack"
              class="flex"
              :style="{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }"
            >
              <div
                v-for="(value, index) in values"
                :key="index"
                class="w-full flex-shrink-0 px-2 md:px-4"
              >
                <div class="bg-white rounded-3xl overflow-hidden h-full shadow-2xl transition-all duration-300 hover:shadow-3xl" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);">
                  <div class="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <!-- Icon Side -->
                    <div class="h-64 lg:h-auto bg-gradient-to-br from-brand-red via-red-500 to-brand-blue flex items-center justify-center relative overflow-hidden">
                      <!-- Декоративные круги -->
                      <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                      <div class="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>

                      <div class="text-center text-white p-8 relative z-10">
                        <svg class="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="value.icon" />
                        </svg>
                      </div>
                    </div>

                    <!-- Content Side -->
                    <div class="p-6 lg:p-12 flex flex-col justify-center">
                      <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-6">{{ value.title }}</h3>
                      <p class="text-gray-700 leading-relaxed mb-6 lg:mb-8 text-sm lg:text-base">{{ value.description }}</p>
                      <button @click="openJobModal" class="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-brand-red via-red-500 to-brand-blue text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-brand-red/40">
                        Подать заявку на работу
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation Dots -->
          <div class="flex items-center justify-center gap-3 mt-8">
            <button
              v-for="(value, index) in values"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index ? 'bg-gradient-to-r from-brand-red to-brand-blue w-10' : 'bg-gray-300 hover:bg-gray-400'
              ]"
              :aria-label="`Слайд ${index + 1}`"
            ></button>
          </div>
        </div>

        <!-- Arrow Navigation - Left -->
        <button
          @click="prevSlide"
          class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-white/30 text-gray-700 opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-lg group"
          aria-label="Предыдущий слайд"
        >
          <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Arrow Navigation - Right -->
        <button
          @click="nextSlide"
          class="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-white/30 text-gray-700 opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-lg group"
          aria-label="Следующий слайд"
        >
          <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Наш основатель -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">НАШ ОСНОВАТЕЛЬ</h2>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="animate-fade-in-left">
              <div class="prose prose-lg">
                <p class="text-gray-700 leading-relaxed mb-6">
                  <strong class="text-gray-900">Anvar Abduqayum</strong>, основатель Toybola, является пионером в индустрии производства игрушек с 2010 года. Под его руководством Toybola выросла в крупнейшего производителя игрушек в Центральной Азии, известного своими экологически чистыми продуктами и приверженностью качеству.
                </p>
                <p class="text-gray-700 leading-relaxed">
                  Помимо Toybola, он успешно запустил другие проекты, демонстрируя свое предпринимательское видение.
                </p>
              </div>
            </div>
            
            <div class="animate-fade-in-right">
              <div class="video-frame">
                <div class="aspect-video">
                  <iframe 
                    src="https://www.youtube.com/embed/yi6UAsstdw4?rel=0&modestbranding=1"
                    title="О компании Toybola"
                    class="w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Сертификаты -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Сертификаты и лицензии</h2>
          <p class="text-xl text-gray-600">
            Международное качество, подтверждённое сертификатами
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            @click="openCertificate(cert)"
            class="bg-white rounded-xl overflow-hidden shadow-elegant card-hover cursor-pointer group"
          >
            <div class="aspect-square bg-gray-50 flex items-center justify-center p-8">
              <img
                :src="cert.image"
                :alt="cert.name"
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="p-6 text-center border-t border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">{{ cert.name }}</h3>
              <p class="text-sm text-gray-500 mt-1">Нажмите для просмотра</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Модальное окно для просмотра сертификата -->
    <div
      v-if="selectedCertificate"
      @click="closeCertificate"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
    >
      <div
        @click.stop
        class="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-2xl font-bold text-gray-900">{{ selectedCertificate.name }}</h3>
          <button
            @click="closeCertificate"
            class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Image -->
        <div class="p-8 bg-gray-50">
          <img
            :src="selectedCertificate.image"
            :alt="selectedCertificate.name"
            class="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
          />
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 flex justify-between items-center">
          <a
            :href="selectedCertificate.image"
            download
            class="flex items-center gap-2 text-brand-blue hover:text-blue-700 font-medium transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Скачать
          </a>
          <button
            @click="closeCertificate"
            class="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>

    <!-- Социальные сети -->
    <section class="relative py-20 bg-cover bg-center bg-fixed" style="background-image: url('/images/backgrounds/background.svg');">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-transparent"></div>
      
      <div class="relative container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4 text-white">Следите за нами</h2>
          <p class="text-xl text-blue-100">
            Будьте в курсе новостей и новинок
          </p>
        </div>
        
        <div class="flex justify-center gap-6 flex-wrap">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path :d="social.icon"/>
            </svg>
            <span class="font-semibold text-white">{{ social.name }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Job Application Modal -->
    <div
      v-if="showJobModal"
      @click="closeJobModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up"
    >
      <div
        @click.stop
        class="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#77CED8] to-[#5FB8C2]">
          <h3 class="text-2xl font-bold text-white">Заявка на работу</h3>
          <button
            @click="closeJobModal"
            class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Form -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Имя -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Имя <span class="text-red-500">*</span>
              </label>
              <input
                v-model="jobForm.firstName"
                type="text"
                required
                placeholder="Ваше имя"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
              />
            </div>
            
            <!-- Фамилия -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Фамилия <span class="text-red-500">*</span>
              </label>
              <input
                v-model="jobForm.lastName"
                type="text"
                required
                placeholder="Ваша фамилия"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="jobForm.email"
                type="email"
                required
                placeholder="example@mail.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
              />
            </div>
            
            <!-- Телефон -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Номер телефона <span class="text-red-500">*</span>
              </label>
              <input
                v-model="jobForm.phone"
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
              />
            </div>
          </div>
          
          <!-- Позиция -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Желаемая должность <span class="text-red-500">*</span>
            </label>
            <select
              v-model="jobForm.position"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all"
            >
              <option value="" disabled selected>Выберите должность</option>
              <option value="production">Производство</option>
              <option value="quality">Контроль качества</option>
              <option value="logistics">Логистика</option>
              <option value="sales">Продажи</option>
              <option value="admin">Администрация</option>
              <option value="other">Другое</option>
            </select>
          </div>
          
          <!-- Сообщение -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Сообщение
            </label>
            <textarea
              v-model="jobForm.message"
              rows="3"
              placeholder="Расскажите о себе..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77CED8] transition-all resize-none"
            ></textarea>
          </div>
          
          <!-- Резюме -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Резюме
              <span class="text-gray-400 text-xs">(PDF, DOC, DOCX до 5MB)</span>
            </label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#77CED8] transition-colors">
              <input
                type="file"
                @change="handleFileChange"
                accept=".pdf,.doc,.docx"
                class="hidden"
                id="resume-upload"
              />
              <label for="resume-upload" class="cursor-pointer">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <div v-if="jobForm.resume" class="text-sm text-[#77CED8] font-medium">
                  📄 {{ jobForm.resume.name }}
                </div>
                <div v-else class="text-sm text-gray-500">
                  Нажмите для загрузки или перетащите файл сюда
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 flex justify-end gap-4 bg-gray-50">
          <button
            @click="closeJobModal"
            class="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Отмена
          </button>
          <button
            @click="submitJobForm"
            class="px-8 py-3 bg-gradient-to-r from-[#77CED8] to-[#5FB8C2] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Отправить заявку
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
