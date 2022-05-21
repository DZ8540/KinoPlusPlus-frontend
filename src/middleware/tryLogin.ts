// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import AuthService from '@/services/AuthService'

let isTriedLogin: boolean = false

export default async function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  if (!isTriedLogin) {
    await AuthService.refresh()
    isTriedLogin = true
  }

  next()
}