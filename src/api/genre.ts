// * Types
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { AggregateGenre, Genre } from '@/contracts/genre'
// * Types

import instance from './instance'
import { ROUTES } from '@/config/api'

export async function allGenres(): Promise<AxiosResponse<Response<AggregateGenre[]>>> {
  return await instance.post<Response<AggregateGenre[]>>(ROUTES.genre.all)
}

export async function getGenre(slug: Genre['slug']): Promise<AxiosResponse<Response<Genre>>> {
  return await instance.post<Response<Genre>>(ROUTES.genre.item(slug))
}

export async function showOnMainPage(): Promise<AxiosResponse<Response<Genre[]>>> {
  return await instance.post<Response<Genre[]>>(ROUTES.genre.showOnMainPage)
}