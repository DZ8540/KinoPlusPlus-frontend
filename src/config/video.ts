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
  firstImageForUser: 'test',
  name: 'test',
  posterForUser: 'test',
  rating: '0',
  released: 'test',
  releasedForUser: 'test',
  secondImageForUser: 'test',
  slug: 'test',
  thirdImageForUser: 'test',
  viewsCount: 0,
  genres: [
    { 
      id: DEFAULT_GENRE.id,
      name: DEFAULT_GENRE.name,
      slug: DEFAULT_GENRE.slug,
    }
  ]
}