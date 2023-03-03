import { defineStore } from "pinia";
import { User } from "~/types/user";
import i18n from "vue-i18n";

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
    async updateUser(toast = true) {
      if (confirm("Are you sure you want to update your profile ?")) {
        if (this.user) {
          const { data: updatedUser, error } = await useFetch<User>("/api/user/" + this.user.id, {
            method: "PUT",
            body: this.user,
          });
          if (error.value?.statusMessage === "username_or_email_already_exists") {
            useErrorToast("Username already exists");
            return;
          }
          this.user = updatedUser.value;
          if (toast) {
            useSuccessToast("Profile updated");
          }
        }
      }
    },
    async deleteUser() {
      if (confirm("Are you sure you want to delete your account ?")) {
        if (this.user) {
          await useFetch("/api/user/" + this.user.id, {
            method: "DELETE",
          });
          useSuccessToast("Account deleted");
          useRouter().push("/");
          this.user = null;
        }
      }
    },
  },
});
