// * Types
import type { User } from './user'
import type { Response } from './response'
import type { ApiDefaultPayload, Paginate } from './api'
import type { Room, RoomMessage, RoomMessagePayload, RoomPayload } from './room'
// * Types

export interface ServerToClientEvents {
  'room:delete': () => void,
  'room:newMessage': (msg: RoomMessage) => void,
  'room:kickUser': (userId: User['id']) => void,
  'room:update': (isOpen: RoomPayload['isOpen']) => void,
  'room:updateUsersCount': (users: Room['users']) => void,
}

export interface ClientToServerEvents {
  'room:join': (slug: Room['slug'], cb: (result: Response<Room>) => void) => void,
  'room:unJoin': (slug: Room['slug'], cb: (result: Response<null>) => void) => void,
  'room:create': (request: RoomPayload, cb: (result: Response<Room['slug']>) => void) => void,
  'room:kickUser': (roomSlug: Room['slug'], userId: User['id'], cb: (result: Response<User['id']>) => void) => void,
  'room:update': (slug: Room['slug'], request: RoomPayload, cb: (result: Response<Room['isOpen']>) => void) => void,
  'room:sendMessage': (slug: Room['slug'], payload: RoomMessagePayload, cb: (result: Response<RoomMessage>) => void) => void,
  'room:getMessages': (slug: Room['slug'], request: ApiDefaultPayload, cb: (result: Response<Paginate<RoomMessage>>) => void) => void,
}