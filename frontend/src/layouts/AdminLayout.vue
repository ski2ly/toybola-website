<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { name: 'Продукты', path: '/admin/products', icon: 'products' },
  { name: 'Категории', path: '/admin/categories', icon: 'categories' },
  { name: 'Заявки CRM', path: '/admin/crm', icon: 'crm' },
  { name: 'Импорт Excel', path: '/admin/import', icon: 'import' },
]

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}

const isActive = (path) => {
  return route.path === path || (path !== '/admin' && route.path.startsWith(path))
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-transform bg-gradient-to-b from-[#77CED8] to-[#5FB8C2]',
        sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
      ]"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- Logo -->
        <div class="mb-6 px-2.5">
          <img
            src="/images/logo/logotoybola_main.svg"
            alt="Toybola"
            class="h-12 w-auto object-contain"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block'"
          />
          <div class="text-xl font-bold text-white drop-shadow-md" style="display:none">
            TOYBOLA
            <span class="block text-sm font-normal opacity-80">Admin Panel</span>
          </div>
        </div>

        <!-- Menu -->
        <ul class="space-y-2 font-medium">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              :class="[
                'flex items-center p-3 rounded-lg transition-all duration-200 group',
                isActive(item.path)
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-blue-50 hover:bg-white/10 hover:translate-x-1'
              ]"
            >
              <!-- Icons -->
              <svg v-if="item.icon === 'dashboard'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <svg v-else-if="item.icon === 'products'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <svg v-else-if="item.icon === 'categories'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              <svg v-else-if="item.icon === 'crm'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
              </svg>
              <svg v-else-if="item.icon === 'import'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="ml-3">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>

        <!-- Logout -->
        <div class="mt-8 pt-8 border-t border-white/20">
          <button
            @click="logout"
            class="flex items-center w-full p-3 text-red-100 rounded-lg hover:bg-white/10 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="ml-3">Выйти</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-0']">
      <!-- Top Bar -->
      <header class="bg-white shadow-sm sticky top-0 z-30">
        <div class="flex items-center justify-between px-6 py-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-800">{{ authStore.user?.name || 'Администратор' }}</div>
              <div class="text-xs text-gray-500">{{ authStore.user?.email || '' }}</div>
            </div>
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#77CED8] to-[#5FB8C2] flex items-center justify-center text-white font-semibold">
              {{ (authStore.user?.name || 'A')[0] }}
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
