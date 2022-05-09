// * Types
import type { ParseUser } from '@/contracts/user'
// * Types

import { Messages } from '@/config/response'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'

export default class BaseService {
  protected static userData = () => useUserData()
  private static notifications = () => useNotificationBus()

  protected static getUser(): ParseUser {
    const user: ParseUser | null = this.userData().user

    if (!user)
      throw Messages.USER_UNDEFINED

    return user
  }

  protected static successNotify(msg: Messages | string): void {
    this.notifications().addNotification({
      msg,
      type: 'success',
    })
  }

  protected static errorNotify(msg: Messages | string): void {
    this.notifications().addNotification({
      msg,
      type: 'error',
    })
  }
}