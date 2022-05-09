// * Types
import type { AxiosResponse } from 'axios'
import type { ParseUser, User } from '@/contracts/user'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { UnparsedVideo, Video, WishlistActions } from '@/contracts/video'
import type { ApiDefaultPayload, Paginate, UserPayload, WishlistPayload } from '@/contracts/api'
// * Types

import BaseService from './BaseService'
import Logger from '@/assets/vendor/Logger'
import { wishlistApi } from '@/api/video'
import { Messages } from '@/config/response'
import { getUserWishlistApi, updateUserApi } from '@/api/user'


export default class UserService extends BaseService {
  public static async updateProfile(payload: UserPayload): Promise<void> {
    const user: ParseUser = this.getUser()

    try {
      const response: AxiosResponse<Response<User>> = await updateUserApi(user.id, payload)

      this.successNotify(Messages.USER_PROFILE_EDITED)

      this.userData().setUser(response.data.body!)
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      this.errorNotify(err.data.message)

      if (err.data.errors?.length)
        throw err.data.errors

      throw null
    }
  }

  public static async getWishlist(payload: ApiDefaultPayload): Promise<Paginate<UnparsedVideo>> {
    const user: ParseUser = this.getUser()

    try {
      const response: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await getUserWishlistApi(user.id, payload)

      return response.data.body!
    } catch (_err: any) {
      const err: ErrorResponse['response'] = _err
      Logger.error(err)

      throw this.errorNotify(err.data.message)
    }
  }

  public static async wishlistAction(videoId: Video['id'], action: WishlistActions): Promise<void> {
    const user: ParseUser = this.getUser()
    
    const msg: Messages = action == 'add' ? Messages.VIDEO_WISHLIST_ADDED : Messages.VIDEO_WISHLIST_DELETED
    const payload: WishlistPayload = {
      videoId,
      userId: user.id,
    }

    try {
      await wishlistApi(payload, action)

      this.successNotify(msg)
    } catch (_err: any) {
      Logger.error(_err)
      throw this.errorNotify(Messages.ERR)
    }
  }
}