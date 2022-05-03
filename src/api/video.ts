// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { Paginate, WishlistData } from '@/contracts/api'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { ApiSearchData, UnparsedVideo, Video, WishlistActions } from '@/contracts/video'
// * Types

import instance from './instance'
import Logger from '@/assets/vendor/Logger'
import { ROUTES } from '@/config/api'

export async function getVideo(slug: Video['slug'], currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo>>> {
  try {
    return await instance.post<Response<UnparsedVideo>>(ROUTES.video.item(slug, currentUserId))
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function newest(currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  try {
    return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.newest(currentUserId))
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function popular(currentUserId?: User['id']): Promise<AxiosResponse<Response<UnparsedVideo[]>>> {
  try {
    return await instance.post<Response<UnparsedVideo[]>>(ROUTES.video.popular(currentUserId))
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function searchVideo(data: ApiSearchData, currentUserId?: User['id']): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await instance.post<Response<Paginate<UnparsedVideo>>>(ROUTES.video.search(currentUserId), data)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function wishlist(data: WishlistData, action: WishlistActions): Promise<AxiosResponse<Response<null>>> {
  try {
    if (action == 'add')
      return await instance.post<Response<null>>(ROUTES.video.wishlist(), data)

    return await instance.delete<Response<null>>(ROUTES.video.wishlist(), { data })
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}