import { defineStore } from "pinia";
import { User } from "~/types/user";

interface UserState {
  authToken: string;
  user: User | null;
}

const defaultUserState: UserState = {
  authToken: "",
  user: null,
};

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      authToken: "",
      user: null,
    };
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) return this.user.role === 2;
      else return false;
    },
    getAuthToken(): string {
      return this.authToken;
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
    setAuthToken(authToken: string) {
      this.authToken = authToken;
    },
    setUser(user: User) {
      this.user = user;
    },
    logout() {
      this.$state = defaultUserState;
    },
  },
});
