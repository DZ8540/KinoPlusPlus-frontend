// * Types
import type { RouteRecordRaw } from 'vue-router'
// * Types

import checkTokenQuery from '@/middleware/checkTokenQuery'
import removeCurrentUser from '@/middleware/removeCurrentUser'

export default [
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/Register/Register.vue'),
  },
  {
    path: '/auth/activateUser',
    beforeEnter: checkTokenQuery,
    component: () => import('../views/ActivateUser/ActivateUser.vue'),
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/auth/logout',
    name: 'logout',
    beforeEnter: removeCurrentUser,
  },
] as RouteRecordRaw[]