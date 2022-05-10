// * Types
import type { User } from './user'
import type { Video } from './video'
// * Types

export type Paginate<D = any> = {
  meta: {
    total: number,
    perPage: number,
    currentPage: number,
    lastPage: number,
    firstPage: number,
    firstPageUrl: string,
    lastPageUrl: string,
    nextPageUrl: string | null,
    previousPageUrl: string | null,
  },
  data: D[],
}

export type ApiDefaultPayload = {
  page: number,
  limit?: number,
}

/**
 * * Auth
 */

export type LoginPayload = {
  email: User['email'] & string,
  password: string,
}

export type RegistrationPayload = {
  nickname: User['nickname'],
  email: User['email'],
  password: string,
  passwordConfirm: RegistrationPayload['password'],
}

/**
 * * Video
 */

export type WishlistPayload = {
  userId: User['id'],
  videoId: Video['id'],
}

export type LaterListPayload = {
  userId: User['id'],
  videoId: Video['id'],
}

/**
 * * User
 */

export type UserPayload = {
  nickname: User['nickname'],
  email: User['email'],
  avatar?: null,
  phone?: User['phone'],
  sex?: User['sex'],
  password?: string,
  passwordConfirm?: RegistrationPayload['password'],
}