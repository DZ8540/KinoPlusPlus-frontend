// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import { Messages } from '@/config/response'
import { RoutesNames } from '@/config/router'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'

export default function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const userData = useUserData()
  const notifications = useNotificationBus()

  if (!userData.user) {
    notifications.addNotification({
      msg: Messages.USER_UNDEFINED,
      type: 'error',
    })

    next({ name: RoutesNames.LOGIN })
  } else {
    next()
  }
}