// * Types
import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ErrorFromQuery } from '@/contracts/response'
// * Types

import { Messages } from '@/config/response'

/**
 * * For vuelidate
 */

export function isEqual(from: string, to: string): boolean {
  return from !== to ? false : true
}

export function castErrors(val: any): boolean {
  return Boolean(val)
}

export function getFirstError<O>(data: Validation<any, O>, inputName: keyof Ref<O>['value']): Ref<string> | string {
  return data[inputName].$errors[0].$message
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