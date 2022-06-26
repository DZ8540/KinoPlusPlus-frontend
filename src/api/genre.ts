// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { Genre } from '@/contracts/genre'
import type { UnparsedVideo } from '@/contracts/video'
import type { ApiDefaultPayload, Paginate } from '@/contracts/api'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

import axiosInstance from './Instances/axiosInstance'
import { API_ROUTES } from '@/config/api'

export async function allGenresApi(): Promise<AxiosResponse<Response<Genre[]>>> {
  try {
    return await axiosInstance.post<Response<Genre[]>>(API_ROUTES.genre.all)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getGenreApi(slug: Genre['slug']): Promise<AxiosResponse<Response<Genre>>> {
  try {
    return await axiosInstance.post<Response<Genre>>(API_ROUTES.genre.item(slug))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function showOnMainPageApi(): Promise<AxiosResponse<Response<Genre[]>>> {
  try {
    return await axiosInstance.post<Response<Genre[]>>(API_ROUTES.genre.showOnMainPage)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getGenreVideosApi(payload: ApiDefaultPayload, slug: Genre['slug'], currentUserId?: User['id']): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.genre.genreMovies(slug, currentUserId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}