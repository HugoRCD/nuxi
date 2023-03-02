<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
import { User } from "~/types/user";
const { t } = useI18n();

definePageMeta({
  name: "Login",
  title: "Login",
  description: "Login to your account",
  middleware: ["already-auth"],
});

const login = ref("");
const password = ref("");

const loading = ref(false);

async function signin() {
  loading.value = true;
  const { data, error } = await useFetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      login: login.value,
      password: password.value,
    },
  });
  if (data.value) {
    useSuccessToast(t("login.welcome_back") + " " + data.value.username);
    useUserStore().setUser(data.value);
    useUserStore().setAuthToken(data.value.authToken);
    useRouter().push("/");
  } else if (error.value?.statusMessage === "user_not_found") {
    useErrorToast(t("error.user_not_found"));
  } else if (error.value?.statusMessage === "invalid_password") {
    useErrorToast(t("error.invalid_password"));
  } else {
    useErrorToast(t("error.unknown_error"));
  }
  loading.value = false;
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
        {{ $t("login.signin_to_your_account") }}
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form @submit.prevent="signin" class="space-y-4">
        <div class="space-y-2">
          <input
            id="login"
            name="login"
            autocomplete="email"
            required
            :placeholder="$t('login.login')"
            class="w-full input focus:border-accent"
            v-model="login"
            :disabled="loading"
          />
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            :placeholder="$t('login.password')"
            class="w-full input focus:border-accent"
            v-model="password"
            :disabled="loading"
          />
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <NuxtLink to="/password/forgot" class="font-medium text-accent hover:text-accent-hover">
              {{ $t("login.forgot_password") }}
            </NuxtLink>
          </div>
        </div>
        <ButtonPrimary :full-width="true" :pending="loading" :text="$t('login.signin')" type="submit" />
      </form>
      <NuxtLink to="/auth/signup" class="btn-secondary w-full mt-6">
        {{$t("login.dont_have_an_account") }}
      </NuxtLink>
    </div>
    <LanguageSelector :is-text="true" class="mt-6" />
  </div>
</template>
