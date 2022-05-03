import type { User } from './user'
import type { Video } from './video'

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

export type ApiDefaultValues = {
  page: number,
  limit?: number,
}

/**
 * * Auth
 */

export type LoginData = {
  email: User['email'] & string,
  password: string,
}

export type RegistrationData = {
  nickname: User['nickname'],
  email: User['email'],
  password: string,
  passwordConfirm: RegistrationData['password'],
}

/**
 * * Video
 */

export type WishlistData = {
  userId: User['id'],
  videoId: Video['id'],
}

/**
 * * User
 */

export type UserData = {
  nickname: User['nickname'],
  email: User['email'],
  avatar?: null,
  phone?: User['phone'],
  sex?: User['sex'],
  password?: string,
  passwordConfirm?: RegistrationData['password'],
}