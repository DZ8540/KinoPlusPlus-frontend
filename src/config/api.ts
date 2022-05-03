// * Types
import type { User } from '@/contracts/user'
import type { Genre } from '@/contracts/genre'
import type { Video } from '@/contracts/video'
// * Types

export const ROUTES = {
  video: {
    newest: (currentUserId?: User['id']) => `/videos/newest/${currentUserId ?? ''}`,
    popular: (currentUserId?: User['id']) => `/videos/popular/${currentUserId ?? ''}`,
    search: (currentUserId?: User['id']) => `/videos/search/${currentUserId ?? ''}`,
    wishlist: (currentUserId?: User['id']) => `/videos/wishlist/${currentUserId ?? ''}`,
    item: (slug: Video['slug'], currentUserId?: User['id']) => `/videos/${slug}/${currentUserId ?? ''}`,
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
  },
  user: {
    update: (userId: User['id']) => `/user/${userId}`,
    wishlist: (userId: User['id']) => `/user/wishlist/${userId}`,
  }
} as const

export const URL: string = import.meta.env.VITE_API_URL
export const TIMEOUT: string = import.meta.env.VITE_API_TIMEOUT