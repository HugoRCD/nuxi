import { defineStore } from "pinia";

type GlobalState = {
  loading: boolean;
  locale: string;
};

export const useGlobalStore = defineStore({
  id: "global",
  state: (): GlobalState => ({
    loading: false,
    locale: "en-US",
  }),
  getters: {
    isLoading(): boolean {
      return this.loading;
    },
    getLocale(): string {
      return this.locale;
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    setLocale(locale: string) {
      this.locale = locale;
    },
  },
});
