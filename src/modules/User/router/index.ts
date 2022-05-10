// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkUser from '@/middleware/checkUser'
import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/profile',
    beforeEnter: checkUser,
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: '',
        name: RoutesNames.PROFILE,
        component: () => import('../views/Achievements.vue'),
      },
      {
        path: 'wishlist',
        name: RoutesNames.WISHLIST,
        component: () => import('../views/Wishlist.vue'),
      },
      {
        path: 'laterList',
        name: RoutesNames.LATER_LIST,
        component: () => import('../views/LaterList.vue'),
      },
      {
        path: 'historyList',
        name: RoutesNames.HISTORY_LIST,
        component: () => import('../views/HistoryList.vue'),
      },
    ],
  },
] as RouteRecordRaw[]