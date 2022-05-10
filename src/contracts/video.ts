// * Types
import type { Genre } from './genre'
import type { ApiDefaultPayload } from './api'
// * Types

export type UnparsedVideo = {
  id: number,
  slug: string,
  name: string,
  description: string,
  ageLimit: number,
  released: string,
  country: string,
  rating: string,
  duration: string,
  viewsCount: number,
  releasedForUser: string,
  poster: string,
  firstImage: string,
  secondImage: string,
  thirdImage: string,
  genres?: Pick<Genre, 'id' | 'slug' | 'name'>[]
  wishlistStatus?: boolean,
  laterListStatus?: boolean,
}

export type Video = Omit<UnparsedVideo, 'ageLimit'> & {
  ageLimit: string,
  wishlistStatus: boolean,
  laterListStatus: boolean,
}

export type ApiSearchData = ApiDefaultPayload & {
  genres?: Genre['id'][],
}

export type ListsActions = 'add' | 'delete'

export type MainPageGenre = {
  title: Genre['name'],
  videos: UnparsedVideo[],
}