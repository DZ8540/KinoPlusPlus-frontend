// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { UnparsedVideo } from '@/contracts/video'
import type { ApiDefaultValues, Paginate } from '@/contracts/api'
import type { ErrorResponse, Response } from '@/contracts/response'
// * Types

import instance from './instance'
import Logger from '@/assets/vendor/Logger'
import { ROUTES } from '@/config/api'

export async function updateUser(userId: User['id'], data: object): Promise<AxiosResponse<Response<User>>> {
  try {
    return await instance.patch<Response<User>>(ROUTES.user.update(userId), data)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}

export async function getUserWishlist(userId: User['id'], data: ApiDefaultValues): Promise<AxiosResponse<Response<Paginate<UnparsedVideo>>>> {
  try {
    return await instance.post<Response<Paginate<UnparsedVideo>>>(ROUTES.user.wishlist(userId), data)
  } catch (err: ErrorResponse | any) {
    Logger.error(err)

    throw err.response.data
  }
}