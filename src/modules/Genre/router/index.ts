// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/genres',
    name: RoutesNames.GENRES,
    component: () => import('../views/Genres.vue'),
  },
  {
    path: '/genres/:slug',
    name: RoutesNames.GENRE,
    component: () => import('../views/Genre.vue')
  },
] as RouteRecordRaw[]