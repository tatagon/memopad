import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import New from '@/views/NewView.vue'
import Signup from '@/views/SignupView.vue'
import Login from '@/views/loginView.vue'
import Edit from '@/views/EditView.vue'
import { auth } from '@/firebase/main'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/new',
      name: 'new',
      component: New,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
    },
  ],
})

// ログイン状態の確認
router.beforeEach((to, from, next) => {
  const publicPages = ['/signup', '/login']
  const requiresAuth = !publicPages.includes(to.path)
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    if (requiresAuth && !user) {
      next('/signup') // または '/login'
    } else {
      next()
    }
  })
})

export default router
