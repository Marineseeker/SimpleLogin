// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | { username: string; email: string },
  }),
  actions: {
    setUser(user: {email: string; username: string }) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
  persist: true,
})
