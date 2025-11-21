import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/document',
    name: 'Document',
    component: () => import('../views/Document.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('../views/Member.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/download',
    name: 'Download',
    component: () => import('../views/Download.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    Swal.fire({
      icon: 'warning',
      title: '请先登录',
      text: '访问此页面需要登录',
      confirmButtonText: '确定'
    })
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
