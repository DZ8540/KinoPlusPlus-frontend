// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { LoginPayload, RegistrationPayload } from '@/contracts/api'
// * Types

import BaseService from './BaseService'
import Logger from '@/assets/vendor/Logger'
import { Messages } from '@/config/response'
import { bootSocket, socketInstance } from '@/api/Instances/socketInstance'
import { 
  activateUserApi, loginApi, logoutApi, 
  refreshApi, registerApi,
} from '@/api/auth'

export default class AuthService extends BaseService {
  public static async activateUser(token: string): Promise<void> {
    try {
      await activateUserApi(token)

      this.successNotify(Messages.AUTH_ACTIVATE_ACCOUNT_SUCCESS)
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async login(payload: LoginPayload): Promise<void> {
    try {
      const response: AxiosResponse<Response<{ user: User, token: string }>> = await loginApi(payload)
      const user: User = response.data.body!.user

      this.successNotify(Messages.AUTH_LOGIN)

      this.userData().initialize(user, response.data.body!.token)
      bootSocket(user.id)
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      this.errorNotify(err.data.message!)

      if (err.data.errors?.length)
        throw err.data.errors

      throw null
    }
  }

  public static async refresh(): Promise<void> {
    try {
      const response: AxiosResponse<Response<{ user: User, token: string }>> = await refreshApi()

      this.userData().initialize(response.data.body!.user, response.data.body!.token)
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      this.errorNotify(err.data.message!)
    }
  }

  public static async register(payload: RegistrationPayload): Promise<void> {
    try {
      await registerApi(payload)

      this.successNotify(Messages.AUTH_REGISTER)
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      this.errorNotify(err.data.message!)

      if (err.data.errors?.length)
        throw err.data.errors

      throw null
    }
  }
  
  public static async logout(): Promise<void> {
    try {
      await logoutApi()
    } catch (_err: any) {
      Logger.error(_err)
      // this.errorNotify(Messages.ERR)
    }

    this.userData().removeCurrentUser()
    this.successNotify(Messages.AUTH_LOGOUT)
    socketInstance.disconnect()
  }
}