import type { ResponseCodes } from '@/config/response'

export type Response<I = any> = {
  code: ResponseCodes,
  status: number,
  message: string,
  body?: I,
}