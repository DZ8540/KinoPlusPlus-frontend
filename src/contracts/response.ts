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

export type ErrorFromQuery<K = string> = {
  rule: string,
  field: K,
  message: string,
}