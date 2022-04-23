// * Types
import type { AxiosResponse } from 'axios'
import type { ResponseCodes } from '@/config/response'
// * Types

export type Response<B = any, E = any> = {
  code: ResponseCodes,
  status: number,
  message: string,
  body?: B,
  errors?: E,
}

export type ErrorResponse = {
  response: AxiosResponse<Response<any, ErrorFromQuery[]>>
}

export type ErrorFromQuery = {
  rule: string,
  field: string,
  message: string,
}

/**
 * * Enums
 */

export enum Messages {
  /**
   * * Auth
   */

  AUTH_ACTIVATE_ACCOUNT_DEFAULT = 'Please wait, we will activate your account!',
  AUTH_LOGOUT = 'Logged out success!',
  AUTH_USER_UNDEFINED = 'Please log in your account!',

  /**
   * * Errors
   */

  TOKEN_ERR = 'Token expired or undefined!',
  ERR = 'Error! Please try again!',
  VALIDATION_ERR = 'Please, fill all fields correctly!',
}