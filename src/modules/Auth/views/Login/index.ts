// * Types
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { LoginData } from '@/contracts/api'
import type { Validation } from '@vuelidate/core'
import type { Response } from '@/contracts/response'
// * Types

import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'
import { login } from '@/api/auth'
import { useUserData } from '@/store/userDataStore'
import { checkFormData, displayExternalErrors } from '@/helpers'
import { useNotificationBus } from '@/store/notificationBusStore'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

const userData = useUserData()
const notifications = useNotificationBus()

export default class {
  public formData: LoginData = reactive({
    email: '',
    password: '',
  })

  private rules: any = {
    email: { required, email },
    password: { 
      required, 
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
  }

  private externalErrors: any = reactive({
    email: '',
    password: '',
  })

  public v$: Ref<Validation<any, LoginData>> = useVuelidate(this.rules, this.formData, { $autoDirty: true, $externalResults: this.externalErrors })

  public async submitHandler(): Promise<void> {
    await checkFormData(this.v$)

    try {
      const response: AxiosResponse<Response<{ user: User, token: string }>> = await login(this.formData)

      this.resetForm()

      notifications.addNotification({
        msg: response.data.message,
        type: 'success',
      })

      userData.initialize(response.data.body!.user, response.data.body!.token)
    } catch (err: Response | any) {
      if (err.errors)
        displayExternalErrors<LoginData>(this.externalErrors, err.errors)

      notifications.addNotification({
        type: 'error',
        msg: err.message,
      })
    }
  }

  /**
   * * Private methods
   */

  private resetForm(): void {
    this.formData.email = ''
    this.formData.password = ''

    this.v$.value.$reset()
  }
}