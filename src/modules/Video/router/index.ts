// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/home',
    name: 'home',
    redirect: { name: RoutesNames.HOME },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'movies',
        name: RoutesNames.HOME,
        component: () => import('../views/Movies.vue')
      }
    ],
  },
  {
    path: '/video/:slug',
    name: RoutesNames.VIDEO,
    component: () => import('../views/Video.vue')
  },
] as RouteRecordRaw[]