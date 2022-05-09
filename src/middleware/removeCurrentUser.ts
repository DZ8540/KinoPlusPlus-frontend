// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import AuthService from '@/services/AuthService'
import { RoutesNames } from '@/config/router'

export default async function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  try {
    await AuthService.logout()
  } catch (err: any) {}

  next({ name: RoutesNames.HOME })
}