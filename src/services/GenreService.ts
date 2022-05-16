// * Types
import type { AxiosResponse } from 'axios'
import type { Genre } from '@/contracts/genre'
import type { ParsedUser } from '@/contracts/user'
import type { UnparsedVideo } from '@/contracts/video'
import type { ApiDefaultPayload, Paginate } from '@/contracts/api'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

import BaseService from './BaseService'
import Logger from '@/assets/vendor/Logger'
import { Messages } from '@/config/response'
import { allGenresApi, getGenreApi, getGenreVideosApi, showOnMainPageApi } from '@/api/genre'

export default class GenreService extends BaseService {
  public static async getAll(): Promise<Genre[]> {
    try {
      const response: AxiosResponse<Response<Genre[]>> = await allGenresApi()

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async get(slug: Genre['slug']): Promise<Genre> {
    try {
      const response: AxiosResponse<Response<Genre>> = await getGenreApi(slug)

      return response.data.body!
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      throw this.errorNotify(err.data.message)
    }
  }

  public static async getGenreMovies(payload: ApiDefaultPayload, slug: Genre['slug']): Promise<Paginate<UnparsedVideo>> {
    let userId: ParsedUser['id'] | undefined

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      userId = undefined
    }

    try {
      const response: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await getGenreVideosApi(payload, slug, userId)

      return response.data.body!
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      throw this.errorNotify(err.data.message)
    }
  } 

  public static async getOnMainPageGenres(): Promise<Genre[]> {
    try {
      const response: AxiosResponse<Response<Genre[]>> = await showOnMainPageApi()

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }
}