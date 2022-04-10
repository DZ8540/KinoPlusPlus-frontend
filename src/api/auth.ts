
// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

import instance from './instance'
import Logger from '@/assets/vendor/Logger'
import { ROUTES } from '@/config/api'

export async function register(data: object): Promise<AxiosResponse<Response<null>>> {
  try {
    return await instance.post<Response<null>>(ROUTES.auth.register, data)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function activateUser(token: string): Promise<AxiosResponse<Response<User>>> {
  try {
    return await instance.post<Response<User>>(ROUTES.auth.activateUser(token))
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function login(data: object): Promise<AxiosResponse<Response<{ user: User, token: string }>>> {
  try {
    return await instance.post<Response<{ user: User, token: string }>>(ROUTES.auth.login, data)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function logout(): Promise<AxiosResponse<Response<null>>> {
  try {
    return await instance.post<Response<null>>(ROUTES.auth.logout)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}