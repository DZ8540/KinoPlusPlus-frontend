// * Types
import type { User } from '@/contracts/user'
import type { Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@/contracts/webSocket'
// * Types

import { URL } from '@/config/api'
import { io } from 'socket.io-client'

export let socketInstance: Socket<ServerToClientEvents, ClientToServerEvents>

export function bootSocket(userId: User['id']): void {
  socketInstance = io(URL, { query: { userId } })
}