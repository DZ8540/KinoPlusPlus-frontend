// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import { Messages } from '@/contracts/response'
import { useNotificationBus } from '@/store/notificationBusStore'
import { useUserData } from '@/store/userDataStore'

export default function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const userData = useUserData()
  const notifications = useNotificationBus()

  if (!userData.user) {
    notifications.addNotification({
      msg: Messages.AUTH_USER_UNDEFINED,
      type: 'error',
    })

    next({ name: 'login' })
  } else {
    next()
  }
}