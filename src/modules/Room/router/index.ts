// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkUser from '@/middleware/checkUser'
import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/room/:slug',
    name: RoutesNames.ROOM,
    beforeEnter: checkUser,
    component: () => import('../views/Room.vue'),
  }
] as RouteRecordRaw[]