
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { ErrorFromQuery, Response } from '@/contracts/response'

import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'
import { login } from '@/api/auth'
import { Messages } from '@/contracts/response'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'
import { required, email, minLength, maxLength } from '@vuelidate/validators'

const userData = useUserData()
const notifications = useNotificationBus()

export default class {
  public formData: { [key: string]: string } = reactive({
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

  public v$ = useVuelidate(this.rules, this.formData, { $autoDirty: true, $externalResults: this.externalErrors })

  public castErrors(val: any): boolean {
    return Boolean(val)
  }

  public getFirstError(inputName: keyof typeof this.formData): Ref<string> | string {
    return this.v$.value[inputName].$errors[0].$message
  }

  public async submitHandler(): Promise<void> {
    await this.checkFormData()

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
        this.displayExternalErrors(err.errors)

      notifications.addNotification({
        type: 'error',
        msg: err.message,
      })
    }
  }

  /**
   * * Private methods
   */

  private async checkFormData(): Promise<void> {
    const result: boolean = await this.v$.value.$validate()
      
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
    this.formData.password = ''

    this.v$.value.$reset()
  }
}