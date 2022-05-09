import { RoutesNames } from '@/config/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: RoutesNames.HOME },
    }
  ]
})

export default router
