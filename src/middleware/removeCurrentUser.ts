// * Types
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// * Types

import { logout } from '@/api/auth'
import { Messages } from '@/contracts/response'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'

export default async function(to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) {
  let msg: Messages | string = Messages.AUTH_LOGOUT
  const userData = useUserData()
  const notifications = useNotificationBus()

  try {
    const response: AxiosResponse<Response> = await logout()
    msg = response.data.message
  } catch (err: any) {}

  userData.removeCurrentUser()
  notifications.addNotification({ msg, type: 'success' })

  next({ name: 'home' })
}