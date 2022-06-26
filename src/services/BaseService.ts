// * Types
import type { ParsedUser } from '@/contracts/user'
// * Types

import AuthService from './AuthService'
import { Messages } from '@/config/response'
import { useUserData } from '@/store/userDataStore'
import { bootSocket } from '@/api/Instances/socketInstance'
import { useNotificationBus } from '@/store/notificationBusStore'

export default class BaseService {
  protected static userData = () => useUserData()
  private static notifications = () => useNotificationBus()

  public static async initApp(): Promise<void> {
    await AuthService.refresh()

    try {
      const user: ParsedUser = this.getUser()
      bootSocket(user.id)
    } catch (err: Messages | any) {
      this.errorNotify(Messages.SOCKET_ERROR)
    }
  }

  protected static getUser(): ParsedUser {
    const user: ParsedUser | null = this.userData().user

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