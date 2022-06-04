// * Types
import type { Room } from '@/contracts/room'
// * Types

import { DEFAULT_USER } from './user'
import { DEFAULT_VIDEO } from './video'

export const DEFAULT_ROOM: Room = {
  id: 1,
  isOpen: true,
  slug: 'test',
  userId: 1,
  videoId: 1,
  createdAt: 'today',
  updatedAt: 'today', // @ts-ignore
  video: DEFAULT_VIDEO,
  user: DEFAULT_USER,
}