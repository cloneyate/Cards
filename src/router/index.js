import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: "dashboard",
    component: () => import ('@/views/Dashboard.vue')
  },
  {
    path: '/settings',
    name: "settings",
    component: () => import ('@/views/Settings.vue')
  },
  {
    path: '/create',
    name: "create",
    component: () => import ('@/views/create.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
