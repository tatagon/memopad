import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AboutView from '../views/About.vue'
import New from '../views/New.vue'
import Edit from '../views/Edit.vue'

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
