// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import { RoutesNames } from '@/config/router'
import { useUserData } from '@/store/userDataStore'

export default function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const userData = useUserData()

  if (userData.user)
    return next({ name: RoutesNames.HOME })
  
  return next()
}