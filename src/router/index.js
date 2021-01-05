import { createRouter, createWebHistory } from 'vue-router';



const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: "dashboard",
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/login',
    name: "login",
    component: () => import('@/views/login.vue')
  },
  {
    path: '/settings',
    name: "settings",
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/create',
    name: "create",
    component: () => import('@/views/create.vue'),
    props: true,
  },
  {
    path: '/cards/:cid',
    name: 'card',
    component: () => import('@/views/Card.vue'),
    props: true
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('access_token') ? true : false;
  if (to.name !== 'login' && to.name !== 'card' && !isAuthenticated) return { name: 'login' }
  if (to.name == 'login' && isAuthenticated) return false
})


export default router
