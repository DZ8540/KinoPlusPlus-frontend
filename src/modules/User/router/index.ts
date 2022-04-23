// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkUser from '@/middleware/checkUser'

export default [
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: checkUser,
    component: () => import('../views/Profile/Profile.vue'),
    children: [],
  },
] as RouteRecordRaw[]