
// * Types
import type { ParsedUser, User } from '@/contracts/user'
// * Types

import { defineStore } from 'pinia'
import { parseUser } from '@/helpers'

export const useUserData = defineStore('userData', {
  state: () => ({
    user: null as ParsedUser | null,
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
  },
})