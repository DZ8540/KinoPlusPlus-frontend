
import type { AxiosResponse } from 'axios'
import type { ErrorFromQuery, Response } from '@/contracts/response'

import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'
import { isEqual } from '@/helpers'
import { register } from '@/api/auth'
import { Messages } from '@/contracts/response'
import { useNotificationBus } from '@/store/notificationBusStore'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

const notifications = useNotificationBus()

export default class {
  public formData = reactive({
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

  public castErrors(val: any): boolean {
    return Boolean(val)
  }

  public getFirstError(inputName: keyof typeof this.formData) {
    return this.v$.value[inputName].$errors[0].$message
  }

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
        this.displayExternalErrors(err.errors)
    }
  }

  /**
   * * Private methods
   */

  private async checkFormData(): Promise<void> {
    const result: boolean = await this.v$.value.$validate()

    if (!isEqual(this.formData.password, this.formData.passwordConfirm)) {
      this.externalErrors.passwordConfirm = 'Should equal to password field!'
      throw Messages.VALIDATION_ERR
    }
      
    if (!result) 
      throw Messages.VALIDATION_ERR
  }

  private displayExternalErrors(errors: ErrorFromQuery[]): void {
    for (const item of errors) {
      this.externalErrors[item.field] = item.message
    }
  }

  private resetForm(): void {
    this.formData.email = ''
    this.formData.nickname = ''
    this.formData.password = ''
    this.formData.passwordConfirm = ''

    this.v$.value.$reset()
  }
}