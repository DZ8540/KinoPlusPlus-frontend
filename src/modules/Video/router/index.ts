import type { RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/config/router'

export default [
  {
    path: '/home',
    name: 'home',
    redirect: { name: HOME_ROUTE_NAME },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'movies',
        name: HOME_ROUTE_NAME,
        component: () => import('../views/Movies/Movies.vue')
      }
    ],
  },
  {
    path: '/video/:slug',
    name: 'video',
    component: () => import('@/modules/Video/views/Video/Video.vue')
  },
] as RouteRecordRaw[]