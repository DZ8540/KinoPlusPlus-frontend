// * Types
import type { Genre } from '@/contracts/genre'
import type { Video } from '@/contracts/video'
// * Types

export const ROUTES = {
  video: {
    newest: '/videos/newest',
    popular: '/videos/popular',
    search: '/videos/search',
    item: (slug: Video['slug']) => `/videos/${slug}`,
  },
  genre: {
    all: '/genres',
    showOnMainPage: '/genres/showOnMainPage',
    item: (slug: Genre['slug']) => `/genres/${slug}`
  },
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout', 
    activateUser: (token: string) => `/auth/emailVerify/${token}`
  }
} as const

export const URL: string = import.meta.env.VITE_API_URL
export const TIMEOUT: string = import.meta.env.VITE_API_TIMEOUT