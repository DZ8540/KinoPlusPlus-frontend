// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkUser from '@/middleware/checkUser'
import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/profile',
    name: RoutesNames.PROFILE,
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: 'achievements',
        name: RoutesNames.ACHIEVES,
        beforeEnter: checkUser,
        component: () => import('../views/Achievements.vue'),
      },
      {
        path: 'wishlist',
        name: RoutesNames.WISHLIST,
        beforeEnter: checkUser,
        component: () => import('../views/Wishlist.vue'),
      },
      {
        path: 'laterList',
        name: RoutesNames.LATER_LIST,
        beforeEnter: checkUser,
        component: () => import('../views/LaterList.vue'),
      },
      {
        path: 'historyList',
        name: RoutesNames.HISTORY_LIST,
        beforeEnter: checkUser,
        component: () => import('../views/HistoryList.vue'),
      },
    ],
  },
  {
    path: '/user/:id',
    name: RoutesNames.USER,
    component: () => import('../views/User.vue'),
  },
] as RouteRecordRaw[]