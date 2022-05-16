// * Types
import type { AxiosResponse } from 'axios'
import type { Video } from '@/contracts/video'
import type { VideoComment } from '@/contracts/video'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { ApiDefaultPayload, Paginate, VideoCommentPayload } from '@/contracts/api'
// * Types

import instance from '../instance'
import { API_ROUTES } from '@/config/api'

export async function getVideoCommentsApi(id: Video['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<VideoComment>>>> {
  try {
    return await instance.post<Response<Paginate<VideoComment>>>(API_ROUTES.video.commentsPaginate(id), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function createVideoCommentApi(payload: VideoCommentPayload): Promise<AxiosResponse<Response<VideoComment>>> {
  try {
    return await instance.post<Response<VideoComment>>(API_ROUTES.video.createComment, payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function updateVideoCommentApi(id: VideoComment['id'], payload: VideoCommentPayload): Promise<AxiosResponse<Response<VideoComment>>> {
  try {
    return await instance.patch<Response<VideoComment>>(API_ROUTES.video.updateComment(id), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function deleteVideoCommentApi(id: VideoComment['id']): Promise<AxiosResponse<Response<null>>> {
  try {
    return await instance.delete<Response<null>>(API_ROUTES.video.deleteComment(id))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}