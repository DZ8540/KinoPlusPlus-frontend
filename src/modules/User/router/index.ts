// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkUser from '@/middleware/checkUser'

export default [
  {
    path: '/profile',
    beforeEnter: checkUser,
    component: () => import('../views/Profile/Profile.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('../views/Achievements/Achievements.vue'),
      },
      {
        path: 'wishlist',
        name: 'wishlist',
        component: () => import('../views/Wishlist/Wishlist.vue'),
      },
    ],
  },
] as RouteRecordRaw[]