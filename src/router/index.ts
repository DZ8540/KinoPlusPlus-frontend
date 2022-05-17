import AuthService from '@/services/AuthService'
import { RoutesNames } from '@/config/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: RoutesNames.HOME },
    }
  ],
})

router.beforeEach(async (to, _, next) => {
  await AuthService.refresh()

  next()
})

export default router
