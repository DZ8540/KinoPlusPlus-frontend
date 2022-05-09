// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkTokenQuery from '@/middleware/checkTokenQuery'
import removeCurrentUser from '@/middleware/removeCurrentUser'
import { RoutesNames } from '@/config/router'

export default [
  {
    path: '/auth/register',
    alias: '/register',
    name: RoutesNames.REGISTER,
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/auth/activateUser',
    beforeEnter: checkTokenQuery,
    component: () => import('../views/ActivateUser.vue'),
  },
  {
    path: '/auth/login',
    alias: '/login',
    name: RoutesNames.LOGIN,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/auth/logout',
    alias: '/logout',
    name: RoutesNames.LOGOUT,
    beforeEnter: removeCurrentUser,
  },
] as RouteRecordRaw[]