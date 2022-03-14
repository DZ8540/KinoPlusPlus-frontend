import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/genres',
    name: 'genres',
    component: () => import('../views/Genres/Genres.vue'),
  },
  {
    path: '/genres/:slug',
    name: 'genre',
    component: () => import('../views/Genre/Genre.vue')
  },
] as RouteRecordRaw[]