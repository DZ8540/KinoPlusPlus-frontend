// * Types
import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ErrorFromQuery } from '@/contracts/response'
// * Types

import { Messages } from '@/contracts/response'

// export function checkQuery<I = any>(query: AxiosResponse<Response<I>>): void {
//   if (!query.data.body)
//     throw Messages.ERR

//   if (query.data.status != 200)
//     throw query.data.message
// }

export function isEqual(from: string, to: string): boolean {
  return from !== to ? false : true
}

export function castErrors(val: any): boolean {
  return Boolean(val)
}

export function getFirstError<O>(data: Ref<Validation<any, O>>, inputName: keyof Ref<O>['value']): Ref<string> | string {
  return data.value[inputName].$errors[0].$message
}

export async function checkFormData<O>(data: Ref<Validation<any, O>>): Promise<void> {
  const result: boolean = await data.value.$validate()
    
  if (!result) 
    throw Messages.VALIDATION_ERR
}

export function displayExternalErrors<O = { [key: string]: string }>(data: O, errors: ErrorFromQuery<keyof O>[]): void {
  for (const item of errors) { // @ts-ignore
    data[item.field] = item.message
  }
}