// * Types
import type { AxiosResponse } from 'axios'
import type { Video } from '@/contracts/video'
import type { ParsedUser } from '@/contracts/user'
import type { Response } from '@/contracts/response'
import type { VideoComment } from '@/contracts/video'
import type { ApiDefaultPayload, Paginate, VideoCommentPayload } from '@/contracts/api'
// * Types

import BaseService from '../BaseService'
import Logger from '@/assets/vendor/Logger'
import { Messages } from '@/config/response'
import { createVideoCommentApi, deleteVideoCommentApi, getVideoCommentsApi, updateVideoCommentApi } from '@/api/Video/comment'

export default class VideoCommentService extends BaseService {
  public static async getComments(id: Video['id'], payload: ApiDefaultPayload): Promise<Paginate<VideoComment>> {
    try {
      const response: AxiosResponse<Response<Paginate<VideoComment>>> = await getVideoCommentsApi(id, { ...payload, orderBy: 'desc' })

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async createComment(payload: Omit<VideoCommentPayload, 'userId'>): Promise<VideoComment> {
    let userId: ParsedUser['id']

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      throw _err
    }

    try {
      const response: AxiosResponse<Response<VideoComment>> = await createVideoCommentApi({ ...payload, userId })

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async updateComment(id: VideoComment['id'], payload: Omit<VideoCommentPayload, 'userId'>): Promise<VideoComment> {
    let userId: ParsedUser['id']

    try {
      userId = this.getUser().id
    } catch (_err: any) {
      throw _err
    }

    try {
      const response: AxiosResponse<Response<VideoComment>> = await updateVideoCommentApi(id, { ...payload, userId })

      return response.data.body!
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }

  public static async deleteComment(id: VideoComment['id']): Promise<void> {
    try {
      this.getUser().id
    } catch (_err: any) {
      throw _err
    }

    try {
      await deleteVideoCommentApi(id)
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }
}