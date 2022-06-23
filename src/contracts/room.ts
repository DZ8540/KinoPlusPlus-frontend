// * Types
import type { User } from './user'
import type { UnparsedVideo, Video } from './video'
// * Types

export type Room = {
  id: number,
  isOpen: boolean,
  slug: string,
  videoId: Video['id'],
  createdAt: string,
  updatedAt: string,
  createdAtForUser: string,
  creator: User[],
  video: UnparsedVideo,
  usersCount: number,
  messages?: RoomMessage[],
  users?: User[],
}

export type RoomMessage = {
  id: number,
  message: string,
  roomId: Room['id'],
  userId: User['id'],
  createdAt: string,
  updatedAt: string,
  user: User,
}

export type ParsedRoomMessage = RoomMessage & {
  time: string,
}

export type RoomPayload = Pick<Room, 'isOpen' | 'videoId'>

export type RoomMessagePayload = {
  message: RoomMessage['message'],
  roomId: RoomMessage['roomId'],
  userId: RoomMessage['userId'],
}