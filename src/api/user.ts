// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { UnparsedVideo } from '@/contracts/video'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { ApiDefaultPayload, Paginate, UserPayload } from '@/contracts/api'
// * Types

import instance from './instance'
import { API_ROUTES } from '@/config/api'

export async function updateUserApi(userId: User['id'], payload: UserPayload): Promise<AxiosResponse<Response<User>>> {
  try {
    return await instance.patch<Response<User>>(API_ROUTES.user.update(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getUserWishlistApi(userId: User['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await instance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.user.wishlist(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getUserLaterListApi(userId: User['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await instance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.user.laterList(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}