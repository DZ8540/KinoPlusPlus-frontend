
// * Types
import type { ParseUser, User } from '@/contracts/user'
// * Types

import { defineStore } from 'pinia'

export const useUserData = defineStore('userData', {
  state: () => ({
    user: null as ParseUser | null,
    token: null as string | null,
  }),
  actions: {
    initialize(user: User, token: string): void {
      this.setUser(user)
      this.token = token
    },
    removeCurrentUser(): void {
      this.user = null
      this.token = null
    },
    setUser(user: User): void {
      this.user = parseUser(user)
    },
    // resetUser(): void {
    //   this.user = null
    // }
  },
})

function parseUser(item: User): ParseUser {
  if (!item.avatar)
    item.avatar = '@/assets/img/empty.jpg'

  if (!item.phone)
    item.phone = 'Not set'

  return item as ParseUser
}