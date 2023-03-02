import { defineStore } from "pinia";
import { User } from "~/types/user";

interface UserState {
  accessToken: string;
  user: User | null;
}

const defaultUserState: UserState = {
  accessToken: "",
  user: null,
};

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      accessToken: "",
      user: null,
    };
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) return this.user.role === 2;
      else return false;
    },
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): User | null {
      return this.user;
    },
  },
  actions: {
    setVerified() {
      if (this.user) {
        this.user.isVerified = true;
      }
    },
    setUser(user: User) {
      this.user = user;
    },
    logout() {
      this.$state = defaultUserState;
    },
  },
});
