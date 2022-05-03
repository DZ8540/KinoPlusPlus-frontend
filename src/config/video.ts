// * Types
import type { Video } from '@/contracts/video'
// * Types

import { DEFAULT_GENRE } from './genre'

export const DEFAULT_VIDEO: Video = {
  id: 1,
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
  wishlistStatus: false,
  genres: [
    { 
      id: DEFAULT_GENRE.id,
      name: DEFAULT_GENRE.name,
      slug: DEFAULT_GENRE.slug,
    }
  ]
}