
// * Types
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { Response } from '@/contracts/response'
// * Types

import { ref } from 'vue'
import { activateUser } from '@/api/auth'
import { useNotificationBus } from '@/store/notificationBusStore'

const notifications = useNotificationBus()

export default class {
  public message: Ref<string> = ref('Please wait, we will activate your account!')

  public async activate(token: string): Promise<void> {
    try {
      const response: AxiosResponse<Response<User>> = await activateUser(token)

      this.setMessage(response.data.message)
      notifications.addNotification({
        msg: response.data.message,
        type: 'success',
      })
    } catch (err: Response | any) {
      this.setMessage(err.message)

      notifications.addNotification({
        msg: err.message,
        type: 'error',
      })
    }
  }

  /**
   * * Private methods
   */

  private setMessage(msg: string): void {
    this.message.value = msg
  }
}