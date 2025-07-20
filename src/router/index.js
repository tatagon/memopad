import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import New from '../views/NewView.vue'
import Edit from '../views/EditView.vue'

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
      path: '/edit/:id',
      name: 'edit',
      component: Edit,
    },
  ],
})

export default router
