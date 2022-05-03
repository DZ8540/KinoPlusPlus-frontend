// * Types
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { RegistrationData } from '@/contracts/api'
// * Types

import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'
import { register } from '@/api/auth'
import { Messages } from '@/contracts/response'
import { useNotificationBus } from '@/store/notificationBusStore'
import { checkFormData, displayExternalErrors, isEqual } from '@/helpers'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

const notifications = useNotificationBus()

export default class {
  public formData: RegistrationData = reactive({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  private rules: any = {
    nickname: { 
      required, 
      minLength: minLength(3),
      maxLength: maxLength(20),
    },
    email: { required, email },
    password: { 
      required, 
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
    passwordConfirm: { 
      required, 
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
  }

  private externalErrors: any = reactive({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  public v$ = useVuelidate(this.rules, this.formData, { $autoDirty: true, $externalResults: this.externalErrors })

  public async submitHandler(): Promise<void> {
    await this.checkFormData()

    try {
      const response: AxiosResponse<Response<null>> = await register(this.formData)

      this.resetForm()

      notifications.addNotification({
        msg: response.data.message,
        type: 'success',
      })
    } catch (err: Response | any) {
      notifications.addNotification({
        type: 'error',
        msg: err.message,
      })

      if (err.errors)
        displayExternalErrors(this.externalErrors, err.errors)
    }
  }

  /**
   * * Private methods
   */

  private async checkFormData(): Promise<void> {
    if (!isEqual(this.formData.password, this.formData.passwordConfirm)) {
      this.externalErrors.passwordConfirm = 'Should equal to password field!'
      throw Messages.VALIDATION_ERR
    }
      
    await checkFormData(this.v$)
  }

  private resetForm(): void {
    this.formData.email = ''
    this.formData.nickname = ''
    this.formData.password = ''
    this.formData.passwordConfirm = ''

    this.v$.value.$reset()
  }
}