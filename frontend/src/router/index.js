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
      component: () => import('@/pages/catalog/Index.vue')
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import('@/pages/product/[slug].vue')
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
      path: '/terms',
      name: 'terms',
      component: () => import('@/pages/Terms.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/pages/Privacy.vue')
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/pages/admin/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('@/pages/admin/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('@/pages/admin/Products.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('@/pages/admin/Categories.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/crm',
      name: 'admin-crm',
      component: () => import('@/pages/admin/CRM.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/import',
      name: 'admin-import',
      component: () => import('@/pages/admin/ImportExcel.vue'),
      meta: { requiresAuth: true }
    },
    // 404 route - должен быть последним
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue')
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
  } else if (to.name === 'admin-login' && isAuthenticated) {
    // Если уже авторизован и пытается зайти на страницу логина
    next('/admin')
  } else {
    next()
  }
})

export default router
