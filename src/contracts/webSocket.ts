// * Types
import type { Response } from './response'
import type { ApiDefaultPayload, Paginate } from './api'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from './room'
// * Types

export type ReturnJoinRoomEventPayload = {
  room: Room,
  usersCount: number,
}

export interface ServerToClientEvents {
  'room:delete': () => void,
  'room:newMessage': (msg: RoomMessage) => void,
  'room:update': (isOpen: RoomPayload['isOpen']) => void,
  'room:usersCountUpdate': (users: number) => void,
}

export interface ClientToServerEvents {
  'room:unJoin': (slug: Room['slug'], cb: (result: Response<null>) => void) => void,
  'room:sendMessage': (slug: Room['slug'], payload: RoomMessagePayload, cb: (result: any) => void) => void,
  'room:getMessages': (slug: Room['slug'], request: ApiDefaultPayload, cb: (result: Response<Paginate<RoomMessage>>) => void) => void,
  'room:paginate': (request: ApiDefaultPayload, cb: (result: any) => void) => void,
  'room:create': (request: RoomPayload, cb: (result: Response<Room['slug']>) => void) => void,
  'room:update': (slug: Room['slug'], request: RoomPayload, cb: (result: Response<Room['isOpen']>) => void) => void,
  'room:join': (slug: Room['slug'], cb: (result: Response<ReturnJoinRoomEventPayload>) => void) => void,
}