// * Types
import type { User } from '@/contracts/user'
// * Types

import { IMAGE_PLACEHOLDER } from './drive'

export const DEFAULT_USER: User = {
  id: 1,
  nickname: 'test',
  email: 'test@mail.ru',
  phone: 'test',
  avatar: IMAGE_PLACEHOLDER,
  birthday: 'today',
  sex: true,
  isEmailVerified: true,
  createdAt: 'today',
  updatedAt: 'today',
  sexForUser: 'man',
  birthdayForUser: 'today',
  createdAtForUser: 'today',
  isEmailVerifiedForUser: 'Yes',
}