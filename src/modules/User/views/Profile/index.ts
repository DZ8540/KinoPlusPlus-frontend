// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { Value } from '@/contracts/select'
import type { ErrorFromQuery, Response } from '@/contracts/response'
// * Types

import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'
import { isEqual } from '@/helpers'
import { updateUser } from '@/api/user'
import { Messages } from '@/contracts/response'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'
import { 
  required, email, minLength, 
  maxLength, requiredIf, numeric 
} from '@vuelidate/validators'

const userData = useUserData()
const notifications = useNotificationBus()

export default class {
  public sexValues: Value[] = [
    {
      text: 'Male',
      value: false,
    },
    {
      text: 'Female',
      value: true,
    },
  ]

  public formData: { [key: string]: string | number | boolean | null } = reactive({
    nickname: userData.user!.nickname,
    email: userData.user!.email,
    avatar: null,
    phone: userData.user!.phone,
    sex: userData.user!.sex,
    oldPassword: '',
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
    phone: { required, numeric },
    sex: { required },
    oldPassword: {
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
    password: { 
      requiredIf: requiredIf(this.formData.oldPassword as string),
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
    passwordConfirm: { 
      requiredIf: requiredIf(this.formData.password as string), 
      minLength: minLength(8),
      maxLength: maxLength(30),
    },
  }

  private externalErrors: any = reactive({
    nickname: '',
    email: '',
    avatar: null,
    phone: '',
    sex: '',
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
      const response: AxiosResponse<Response<User>> = await updateUser(userData.user!.id, this.formData)

      notifications.addNotification({
        msg: response.data.message,
        type: 'success',
      })

      userData.setUser(response.data.body!)
      this.resetForm()
    } catch (err: Response | any) {
      notifications.addNotification({
        type: 'error',
        msg: err.message,
      })

      if (err.errors)
        this.displayExternalErrors(err.errors)
    }
  }

  public resetForm(): void {
    this.formData.email = userData.user!.email
    this.formData.nickname = userData.user!.nickname
    this.formData.phone = userData.user!.phone
    this.formData.sex = userData.user!.sex
    this.formData.oldPassword = ''
    this.formData.password = ''
    this.formData.passwordConfirm = ''

    this.v$.value.$reset()
  }

  /**
   * * Private methods
   */

  private async checkFormData(): Promise<void> {
    const result: boolean = await this.v$.value.$validate()

    if (!isEqual(this.formData.password as string, this.formData.passwordConfirm as string)) {
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
}