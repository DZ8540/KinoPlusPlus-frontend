// * Types
import type { AxiosResponse } from 'axios'
import type { ParseUser } from '@/contracts/user'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'
// * Types

import BaseService from './BaseService'
import Logger from '@/assets/vendor/Logger'
import { Messages } from '@/config/response'
import { getVideoApi, newestApi, popularApi } from '@/api/video'

export default class VideoService extends BaseService {
  public static async get(slug: Video['slug']): Promise<UnparsedVideo> {
    let userId: ParseUser['id'] | undefined

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      userId = undefined
    }

    try {
      const response: AxiosResponse<Response<UnparsedVideo>> = await getVideoApi(slug, userId)

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async getNewest(): Promise<UnparsedVideo[]> {
    let userId: ParseUser['id'] | undefined

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      userId = undefined
    }

    try {
      const response: AxiosResponse<Response<UnparsedVideo[]>> = await newestApi(userId)

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async getPopular(): Promise<UnparsedVideo[]> {
    let userId: ParseUser['id'] | undefined

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      userId = undefined
    }

    try {
      const response: AxiosResponse<Response<UnparsedVideo[]>> = await popularApi(userId)

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }
}