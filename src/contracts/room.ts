// * Types
import type { User } from './user'
import type { UnparsedVideo, Video } from './video'
// * Types

export type Room = {
  id: number,
  isOpen: boolean,
  slug: string,
  userId: User['id'],
  videoId: Video['id'],
  createdAt: string,
  updatedAt: string,
  createdAtForUser: string,
  user: User,
  video: UnparsedVideo,
  messages?: RoomMessage[],
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

export type RoomPayload = Pick<Room, 'isOpen' | 'userId' | 'videoId'>

export type RoomMessagePayload = {
  message: RoomMessage['message'],
  roomId: RoomMessage['roomId'],
  userId: RoomMessage['userId'],
}