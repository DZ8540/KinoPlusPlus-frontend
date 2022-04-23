export type User = {
  id: number,
  nickname: string,
  email: string,
  avatar: string | null,
  birthday: string | null,
  phone: string | null,
  sex: boolean | null,
  isEmailVerified: boolean,
  createdAt: string,
  updatedAt: string,
  isEmailVerifiedForUser: string,
  sexForUser: string,
  birthdayForUser: string,
  createdAtForUser: string,
}

export type ParseUser = Omit<User, 'avatar' | 'phone'> & {
  avatar: string,
  phone: string,
}