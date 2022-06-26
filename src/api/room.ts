// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { VideoSearchPayload } from '@/contracts/video'
import type { ApiDefaultPayload, Paginate } from '@/contracts/api'
import type { ErrorResponse, Response } from '@/contracts/response'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from '@/contracts/room'
// * Types

import axiosInstance from './Instances/axiosInstance'
import { API_ROUTES } from '@/config/api'
import { socketInstance } from './Instances/socketInstance'

/**
 * * Http
 */

export async function searchRoomApi(payload: VideoSearchPayload): Promise<AxiosResponse<Response<Paginate<Room>>>> {
  try {
    return await axiosInstance.post<Response<Paginate<Room>>>(API_ROUTES.room.search, payload)
  } catch (_err: any) {
    const err: ErrorResponse = _err

    throw err.response
  }
}

/**
 * * Socket
 */

export function createRoomApi(payload: RoomPayload): Promise<Response<Room['slug']>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:create', payload, (response: Response<Room['slug']>) => {
      if (response.status == 200)
        resolve(response)
      
      reject(response)
    })

  })
}

export function joinRoomApi(slug: Room['slug']): Promise<Response<Room>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:join', slug, (response: Response<Room>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })
    
  })
}

export function updateRoomApi(slug: Room['slug'], payload: RoomPayload): Promise<Response<Room['isOpen']>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:update', slug, payload, (response: Response<Room['isOpen']>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })
    
  })
}

export function unJoinRoomApi(slug: Room['slug']): Promise<Response<null>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:unJoin', slug, (response: Response<null>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })

  })
}

export function kickUserRoomApi(roomSlug: Room['slug'], userId: User['id']): Promise<Response<User['id']>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:kickUser', roomSlug, userId,(response: Response<User['id']>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })

  })
}

/**
 * * Room messages
 */

export function sendMessageRoomApi(slug: Room['slug'], payload: RoomMessagePayload): Promise<Response<RoomMessage>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:sendMessage', slug, payload, (response: Response<RoomMessage>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })

  })
}

export function getRoomMessagesApi(slug: Room['slug'], payload: ApiDefaultPayload): Promise<Response<Paginate<RoomMessage>>> {
  return new Promise((resolve, reject) => {

    socketInstance.emit('room:getMessages', slug, payload, (response: Response<Paginate<RoomMessage>>) => {
      if (response.status == 200)
        resolve(response)

      reject(response)
    })

  })
}