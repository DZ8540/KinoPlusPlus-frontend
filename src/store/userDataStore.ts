
// * Types
import type { User } from '@/contracts/user'
// * Types

import { defineStore } from 'pinia'

export const useUserData = defineStore('userData', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  actions: {
    initialize(user: User, token: string): void {
      this.user = user
      this.token = token
    },
    removeCurrentUser(): void {
      this.user = null
      this.token = null
    },
    // setUser(user: User): void {
    //   this.user = user
    // },
    // resetUser(): void {
    //   this.user = null
    // }
  },
})
