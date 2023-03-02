import { createUserInput, User } from "~/types/user";

export async function useUser() {
  const { data, error } = await useFetch<User>("/api/auth/user");
  if (data.value) {
    console.log(data.value);
  }
}

export async function useLogin(login: string, password: string) {
  const { t } = useI18n();
  const { data, error } = await useFetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      login: login,
      password: password,
    },
  });
  if (data.value) {
    console.log(data.value);
    useSuccessToast(t("login.welcome_back"));
  }
}

export async function useLogout() {
  const { t } = useI18n();
  const { data, error } = await useFetch("/api/auth/logout", {
    method: "POST",
  });
  if (data.value) {
    console.log(data.value);
    useSuccessToast(t("profile.logout"));
  }
}

export async function useSignup(createUserInput: createUserInput) {
  const { t } = useI18n();
  const { data, error } = await useFetch<User>("/api/auth/signup", {
    method: "POST",
    body: createUserInput,
  });
  if (data.value) {
    console.log(data.value);
    useSuccessToast(t("signup.you_have_successfully_registered"));
  }
}