// * Types
import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ParsedUser, User } from '@/contracts/user'
import type { ErrorFromQuery } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'
import type { VideoComment, ParsedVideoComment } from '@/contracts/video'
// * Types

import { URL } from '@/config/api'
import { DateTime, Duration } from 'luxon'
import { Messages } from '@/config/response'

export function parseVideo(item: UnparsedVideo): Video {
  const duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
  const rating: string = item.rating.replace('.', ',')
  const ageLimit: string = `+${item.ageLimit}`
  const wishlistStatus: boolean = item.wishlistStatus ?? false
  const laterListStatus: boolean = item.laterListStatus ?? false

  return {
    ...item,
    duration,
    rating,
    ageLimit,
    wishlistStatus,
    laterListStatus,
  }
}

export function parseUser(item: User): ParsedUser {
  if (!item.avatar)
    item.avatar = '/img/empty.jpg'
  else
    item.avatar = `${URL}/uploads/${item.avatar}`

  if (!item.phone)
    item.phone = 'Not set'

  return item as ParsedUser
}

export function parseComment(item: VideoComment): ParsedVideoComment {
  const time: string = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.TIME_SIMPLE)

  return { ...item, time }
}

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