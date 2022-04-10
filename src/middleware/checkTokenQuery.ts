
// * Types
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import { Messages } from '@/contracts/response'
import { HOME_ROUTE_NAME } from '@/config/router'
import { useNotificationBus } from '@/store/notificationBusStore'

export default function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  const notifications = useNotificationBus()

  if (!to.query.token) {
    notifications.addNotification({
      msg: Messages.TOKEN_ERR,
      type: 'error',
    })

    next({ name: HOME_ROUTE_NAME })
  } else {
    next()
  }
}