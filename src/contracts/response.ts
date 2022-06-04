// * Types
import type { ResponseCodes } from '@/config/response'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// * Types

export type Response<B = any, E = any> = {
  code: ResponseCodes,
  status: number,
  msg: string,
  body?: B,
  errors?: E,
}

export type ErrorResponse = {
  response: AxiosResponse<Response<any, ErrorFromQuery[]>>,
  config: AxiosRequestConfig & {
    _retry: boolean,
  },
}

export type ErrorFromQuery<K = string> = {
  rule: string,
  field: K,
  message: string,
}