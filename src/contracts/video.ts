export type UnparsedVideo = {
  id: number,
  slug: string,
  name: string,
  description: string,
  ageLimit: number,
  released: string,
  country: string,
  rating: string,
  duration: string,
  viewsCount: number,
  releasedForUser: string,
  posterForUser: string,
  firstImageForUser: string,
  secondImageForUser: string,
  thirdImageForUser: string,
}

export type Video = Omit<UnparsedVideo, 'ageLimit'> & {
  ageLimit: string,
}