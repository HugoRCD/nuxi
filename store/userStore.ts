import { defineStore } from "pinia";

interface UserState {
  user: any;
}

const defaultUserState: UserState = {
  user: null,
};

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      user: null,
    };
  },
  getters: {
  },
  actions: {
  },
});
