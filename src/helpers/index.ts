// * Types
import type { AxiosResponse } from 'axios'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

// export function checkQuery<I = any>(query: AxiosResponse<Response<I>>): void {
//   if (!query.data.body)
//     throw Messages.ERR

//   if (query.data.status != 200)
//     throw query.data.message
// }

export function isEqual(from: string, to: string): boolean {
  return from !== to ? false : true
}