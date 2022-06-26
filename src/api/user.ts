// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { UnparsedVideo } from '@/contracts/video'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { ApiDefaultPayload, Paginate, UserPayload } from '@/contracts/api'
// * Types

import axiosInstance from './Instances/axiosInstance'
import { API_ROUTES } from '@/config/api'

export async function getUserApi(userId: User['id']): Promise<AxiosResponse<Response<User>>> {
  try {
    return await axiosInstance.post<Response<User>>(API_ROUTES.user.get(userId))
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function updateUserApi(userId: User['id'], payload: FormData | UserPayload): Promise<AxiosResponse<Response<User>>> {
  try {
    return await axiosInstance.patch<Response<User>>(API_ROUTES.user.update(userId), payload, { 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getUserWishlistApi(userId: User['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.user.wishlist(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getUserLaterListApi(userId: User['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.user.laterList(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

export async function getUserHistoryListApi(userId: User['id'], payload: ApiDefaultPayload): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<UnparsedVideo>>>(API_ROUTES.user.historyList(userId), payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}