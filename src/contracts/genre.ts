export type Genre = {
  id: number,
  slug: string,
  name: string,
  description: string,
  createdAt: string,
  image?: string,
  moviesCount?: number,
}

export type ParsedGenre = Genre & {
  image: string,
  moviesCount: number,
}