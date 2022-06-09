// * Types
import type { Ref } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ParsedUser, User } from '@/contracts/user'
import type { ErrorFromQuery } from '@/contracts/response'
import type { Genre, ParsedGenre } from '@/contracts/genre'
import type { UnparsedVideo, Video } from '@/contracts/video'
import type { ParsedRoomMessage, RoomMessage } from '@/contracts/room'
import type { VideoComment, ParsedVideoComment } from '@/contracts/video'
// * Types

import { URL } from '@/config/api'
import { DateTime, Duration } from 'luxon'
import { Messages } from '@/config/response'
import { IMAGE_PLACEHOLDER } from '@/config/drive'

export function parseVideo(item: UnparsedVideo): Video {
  const poster: string = item.poster ?? IMAGE_PLACEHOLDER
  const firstImage: string = item.firstImage ?? IMAGE_PLACEHOLDER
  const secondImage: string = item.secondImage ?? IMAGE_PLACEHOLDER
  const thirdImage: string = item.thirdImage ?? IMAGE_PLACEHOLDER
  const duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
  const rating: string = item.rating.replace('.', ',')
  const ageLimit: string = `+${item.ageLimit}`
  const wishlistStatus: boolean = item.wishlistStatus ?? false
  const laterListStatus: boolean = item.laterListStatus ?? false

  return {
    ...item,
    poster,
    firstImage,
    secondImage,
    thirdImage,
    duration,
    rating,
    ageLimit,
    wishlistStatus,
    laterListStatus,
  }
}

export function parseUser(item: User): ParsedUser {
  if (!item.avatar)
    item.avatar = IMAGE_PLACEHOLDER
  else
    item.avatar = `${URL}/uploads/${item.avatar}`

  if (!item.phone)
    item.phone = 'Not set'

  return item as ParsedUser
}

export function parseGenre(item: Genre): ParsedGenre {
  if (!item.image)
    item.image = IMAGE_PLACEHOLDER
  else
    item.image = `${URL}${item.image}`
    
  item.moviesCount = item.moviesCount ?? 0

  return item as ParsedGenre
}

export function parseComment(item: VideoComment): ParsedVideoComment {
  const time: string = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.TIME_SIMPLE)

  return { ...item, time }
}

export function parseRoomMessage(item: RoomMessage): ParsedRoomMessage {
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