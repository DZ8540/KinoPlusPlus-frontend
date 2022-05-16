// * Types
import type { User } from '@/contracts/user'
import type { Genre } from '@/contracts/genre'
import type { Video } from '@/contracts/video'
import type { VideoComment } from '@/contracts/video'
// * Types

export const API_ROUTES = {
  video: {
    newest: (currentUserId?: User['id']) => `/videos/newest/${currentUserId ?? ''}`,
    popular: (currentUserId?: User['id']) => `/videos/popular/${currentUserId ?? ''}`,
    search: (currentUserId?: User['id']) => `/videos/search/${currentUserId ?? ''}`,
    wishlist: (currentUserId?: User['id']) => `/videos/wishlist/${currentUserId ?? ''}`,
    laterList: (currentUserId?: User['id']) => `/videos/laterList/${currentUserId ?? ''}`,
    item: (slug: Video['slug'], currentUserId?: User['id']) => `/videos/${slug}/${currentUserId ?? ''}`,

    /**
     * * Comment
     */

    createComment: '/videos/comments',
    updateComment: (id: VideoComment['id']) => `/videos/comments/${id}`,
    deleteComment: (id: VideoComment['id']) => `/videos/comments/${id}`,
    commentsPaginate: (id: Video['id']) => `/videos/comments/${id}`,
  },
  genre: {
    all: '/genres',
    showOnMainPage: '/genres/showOnMainPage',
    item: (slug: Genre['slug']) => `/genres/${slug}`,
    genreMovies: (slug: Genre['slug'], currentUserId?: User['id']) => `/genres/movies/${slug}/${currentUserId ?? ''}`,
  },
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout', 
    activateUser: (token: string) => `/auth/emailVerify/${token}`,
  },
  user: {
    update: (userId: User['id']) => `/user/${userId}`,
    wishlist: (userId: User['id']) => `/user/wishlist/${userId}`,
    laterList: (userId: User['id']) => `/user/laterList/${userId}`,
    historyList: (userId: User['id']) => `/user/historyList/${userId}`,
  }
} as const

export const URL: string = import.meta.env.VITE_API_URL
export const TIMEOUT: string = import.meta.env.VITE_API_TIMEOUT