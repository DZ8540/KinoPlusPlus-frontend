// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { LaterListPayload, Paginate, WishlistPayload } from '@/contracts/api'
import type { VideoSearchPayload, UnparsedVideo, Video, ListsActions } from '@/contracts/video'
// * Types

import Logger from '@/assets/vendor/Logger'
import axiosInstance from '../Instances/axiosInstance'
import { API_ROUTES } from '@/config/api'

export async function getVideoApi(slug: Video['slug'], currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo>>> {
  try {
    return await axiosInstance.post<Response<UnparsedVideo>>(API_ROUTES.video.item(slug, currentUserId))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function newestApi(currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  try {
    return await axiosInstance.post<Response<UnparsedVideo[]>>(API_ROUTES.video.newest(currentUserId))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function popularApi(currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  try {
    return await axiosInstance.post<Response<UnparsedVideo[]>>(API_ROUTES.video.popular(currentUserId))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function searchVideoApi(payload: VideoSearchPayload, currentUserId?: User['id']): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.video.search(currentUserId), payload)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function wishlistApi(payload: WishlistPayload, action: ListsActions): Promise<AxiosResponse<Response<null>>> {
  try {
    if (action == 'add')
      return await axiosInstance.post<Response<null>>(API_ROUTES.video.wishlist(), payload)

    return await axiosInstance.delete<Response<null>>(API_ROUTES.video.wishlist(), { data: payload })
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function laterListApi(payload: LaterListPayload, action: ListsActions): Promise<AxiosResponse<Response<null>>> {
  try {
    if (action == 'add')
      return await axiosInstance.post<Response<null>>(API_ROUTES.video.laterList(), payload)

    return await axiosInstance.delete<Response<null>>(API_ROUTES.video.laterList(), { data: payload })
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}