import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('@/pages/Catalog.vue')
    },
    {
      path: '/catalog/:category',
      name: 'category',
      component: () => import('@/pages/CategoryPage.vue')
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import('@/pages/ProductPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/About.vue')
    },
    {
      path: '/production',
      name: 'production',
      component: () => import('@/pages/Production.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/pages/Contacts.vue')
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/admin/Login.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/pages/Terms.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/pages/Privacy.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('admin_token')

  if (requiresAuth && !isAuthenticated) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
