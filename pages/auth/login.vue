<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

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
  await useLogin(login.value, password.value);
  loading.value = false;
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Sign in to your account</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form @submit.prevent="signin" class="space-y-4">
        <div class="-space-y-px">
          <input
            id="login"
            name="login"
            autocomplete="email"
            required
            :placeholder="$t('login.login')"
            class="w-full input rounded-t-md ring-1 ring-transparent ring-inset focus:ring-accent"
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
            class="w-full input rounded-b-md ring-1 ring-transparent ring-inset focus:ring-accent"
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
