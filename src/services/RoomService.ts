// * Types
import type { Video } from '@/contracts/video'
import type { ParsedUser } from '@/contracts/user'
import type { Response } from '@/contracts/response'
import type { ApiDefaultPayload, Paginate } from '@/contracts/api'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from '@/contracts/room'
// * Types

import BaseService from './BaseService'
import Logger from '@/assets/vendor/Logger'
import { Messages } from '@/config/response'
import { 
  createRoomApi, getRoomMessagesApi, joinRoomApi, 
  sendMessageRoomApi, unJoinRoomApi, updateRoomApi 
} from '@/api/room'

export default class RoomService extends BaseService {
  public static async create(videoId: Video['id']): Promise<Room['slug']> {
    try {
      const payload: RoomPayload = {
        isOpen: true,
        videoId: videoId,
      }

      return (await createRoomApi(payload)).body!
    } catch (_err: any) {
      const err: Response = _err
      Logger.error(err)

      throw this.errorNotify(err.msg!)
    }
  }

  public static async join(slug: Room['slug']): Promise<Room> {
    try {
      return (await joinRoomApi(slug)).body!
    } catch (_err: any) {
      const err: Response = _err
      Logger.error(err)

      throw this.errorNotify(err.msg!)
    }
  }

  public static async update(slug: Room['slug'], payload: RoomPayload): Promise<Room['isOpen']> {
    try {
      const response: Response<Room['isOpen']> = await updateRoomApi(slug, payload)

      return response.body!
    } catch (_err: any) {
      const err: Response = _err
      Logger.error(err)

      throw this.errorNotify(err.msg!)
    }
  }

  public static async unJoin(slug: Room['slug']): Promise<void> {
    try {
      await unJoinRoomApi(slug)
    } catch (_err: any) {
      Logger.error(_err)
    }
  }

  /**
   * * Room messages
   */

  public static async sendMessage(slug: Room['slug'], payload: RoomMessagePayload): Promise<RoomMessage> {
    let user: ParsedUser

    try {
      user = this.getUser()
    } catch (_err: any) {
      const err: Messages = _err

      throw this.errorNotify(err)
    }

    if (user.id != payload.userId)
      throw this.errorNotify(Messages.ERR)

    try {
      const response: Response<RoomMessage> = await sendMessageRoomApi(slug, payload)

      return response.body!
    } catch (_err: any) {
      const err: Response = _err
      Logger.error(err)

      throw this.errorNotify(err.msg!)
    }
  }

  public static async getMessages(slug: Room['slug'], payload: ApiDefaultPayload): Promise<Paginate<RoomMessage>> {
    try {
      const response: Response<Paginate<RoomMessage>> = await getRoomMessagesApi(slug, payload)

      return response.body!
    } catch (_err: any) {
      const err: Response = _err
      Logger.error(err)

      throw this.errorNotify(err.msg!)
    }
  }
}