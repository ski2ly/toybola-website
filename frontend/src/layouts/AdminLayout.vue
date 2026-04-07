<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LayoutDashboard, Mail, LogOut, Menu, X } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(true)

const menuItems = [
  { name: 'Главная', path: '/admin', icon: LayoutDashboard },
  { name: 'О компании', path: '/admin/about', icon: Mail },
  { name: 'Контакты', path: '/admin/contacts', icon: Mail },
  { name: 'Производство', path: '/admin/production', icon: Mail },
  { name: 'Заявки CRM', path: '/admin/crm', icon: Mail },
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
              <component :is="item.icon" class="w-5 h-5" />
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
            <LogOut class="w-5 h-5" />
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
            <X v-if="sidebarOpen" class="w-6 h-6 text-gray-600" />
            <Menu v-else class="w-6 h-6 text-gray-600" />
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
