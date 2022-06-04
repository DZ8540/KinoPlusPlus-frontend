// * Types
import type { ClientToServerEvents, ServerToClientEvents } from '@/contracts/webSocket'
// * Types

import { URL } from '@/config/api'
import { io, Socket } from 'socket.io-client'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL)