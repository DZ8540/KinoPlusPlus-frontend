import type { Genre } from './genre'
import type { ApiDefaultValues } from './api'

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
  firstImageForUser: string,
  secondImageForUser: string,
  thirdImageForUser: string,
  genres: Pick<Genre, 'id' | 'slug' | 'name'>[]
}

export type Video = Omit<UnparsedVideo, 'ageLimit'> & {
  ageLimit: string,
}

export type ApiSearchData = ApiDefaultValues & {
  genres?: Genre['id'][],
}