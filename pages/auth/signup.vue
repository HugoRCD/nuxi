<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
import { User } from "~/types/user";
const { t } = useI18n();

definePageMeta({
  name: "Signup",
  title: "Signup",
});

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const loading = ref(false);

const disabled = computed(() => {
  return password.value.length < 8 || password.value !== passwordConfirm.value;
});

async function signup() {
  loading.value = true;
  const { data, error } = await useFetch<User>("/api/auth/signup", {
    method: "POST",
    body: {
      username: username.value,
      email: email.value,
      password: password.value,
    }
  });
  if (data.value) {
    useSuccessToast(t("signup.signup_success"));
    useRouter().push("/auth/login");
  } else if (error.value?.statusMessage === "user_already_exists") {
    useErrorToast(t("error.user_already_exists"));
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
        {{ $t("signup.signup_to_your_account") }}
      </h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <form class="space-y-3" @submit.prevent="signup">
        <input
          id="username"
          name="username"
          autocomplete="username"
          required
          :placeholder="$t('signup.username')"
          class="input w-full"
          v-model="username"
        />
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          :placeholder="$t('signup.email')"
          class="input w-full"
          v-model="email"
        />
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          :placeholder="$t('signup.password')"
          class="input w-full"
          v-model="password"
        />
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autocomplete="current-password"
          required
          :placeholder="$t('signup.confirm_password')"
          class="input w-full"
          v-model="passwordConfirm"
        />
        <ButtonPrimary
          :full-width="true"
          :pending="loading"
          type="submit"
          :disabled="disabled"
          :text="$t('signup.signup')"
          :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
        />
      </form>
      <NuxtLink :to="{ name: 'Login' }" class="btn-secondary mt-6">
        {{ $t("signup.already_have_an_account") }}
      </NuxtLink>
    </div>
    <LanguageSelector :is-text="true" class="mt-6" />
  </div>
</template>
