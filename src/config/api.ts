import type { Video } from "@/contracts/video"

export const ROUTES = {
  video: {
    item: (slug: Video['slug']) => `/videos/${slug}`,
    newest: '/videos/newest',
    popular: '/videos/popular'
  }
} as const

export const URL: string = import.meta.env.VITE_API_URL
export const TIMEOUT: string = import.meta.env.VITE_API_TIMEOUT