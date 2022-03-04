import { HOME_ROUTE_NAME } from '@/config/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: HOME_ROUTE_NAME },
    }
  ]
})

export default router
