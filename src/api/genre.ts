// * Types
import type { AxiosResponse } from 'axios'
import type { AggregateGenre, Genre } from '@/contracts/genre'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

import instance from './instance'
import Logger from '@/assets/vendor/Logger'
import { ROUTES } from '@/config/api'

export async function allGenres(): Promise<AxiosResponse<Response<AggregateGenre[]>>> {
  try {
    return await instance.post<Response<AggregateGenre[]>>(ROUTES.genre.all)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function getGenre(slug: Genre['slug']): Promise<AxiosResponse<Response<Genre>>> {
  try {
    return await instance.post<Response<Genre>>(ROUTES.genre.item(slug))
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function showOnMainPage(): Promise<AxiosResponse<Response<Genre[]>>> {
  try {
    return await instance.post<Response<Genre[]>>(ROUTES.genre.showOnMainPage)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}