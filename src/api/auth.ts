// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { LoginPayload, RegistrationPayload } from '@/contracts/api'
// * Types

import instance from './instance'
import { API_ROUTES } from '@/config/api'

export async function registerApi(payload: RegistrationPayload): Promise<void> {
  try {
    await instance.post(API_ROUTES.auth.register, payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function activateUserApi(token: string): Promise<void> {
  try {
    await instance.post(API_ROUTES.auth.activateUser(token))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function loginApi(payload: LoginPayload): Promise<AxiosResponse<Response<{ user: User, token: string }>>> {
  try {
    return await instance.post<Response<{ user: User, token: string }>>(API_ROUTES.auth.login, payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function logoutApi(): Promise<AxiosResponse<Response<null>>> {
  try {
    return await instance.post<Response<null>>(API_ROUTES.auth.logout)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function refreshApi(): Promise<AxiosResponse<Response<{ user: User, token: string }>>> {
  try {
    return await instance.post<Response<{ user: User, token: string }>>(API_ROUTES.auth.refresh)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}