// * Types
import type { Video } from '@/contracts/video'
// * Types

import { DEFAULT_GENRE } from './genre'

export const VIDEO_COMMENTS_DESCRIPTION_MIN_LENGTH: number = 2
export const VIDEO_COMMENTS_DESCRIPTION_MAX_LENGTH: number = 4096

export const DEFAULT_VIDEO: Video = {
  id: 1,
  iframePath: 'test',
  ageLimit: '+0',
  country: 'test',
  description: 'test',
  duration: 'test',
  firstImage: 'test',
  name: 'test',
  poster: 'test',
  rating: '0',
  released: 'test',
  releasedForUser: 'test',
  secondImage: 'test',
  slug: 'test',
  thirdImage: 'test',
  viewsCount: 0,
  createdAt: 'today',
  updatedAt: 'today',
  laterListStatus: false,
  wishlistStatus: false,
  genres: [
    { 
      id: DEFAULT_GENRE.id,
      name: DEFAULT_GENRE.name,
      slug: DEFAULT_GENRE.slug,
    }
  ]
}