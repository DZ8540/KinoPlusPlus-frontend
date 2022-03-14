export type Genre = {
  id: number,
  slug: string,
  name: string,
  description: string,
  createdAt: string,
  image?: string,
}

export type AggregateGenre = Genre & {
  moviesCount: number,
}