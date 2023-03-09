<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
const { t } = useI18n();

definePageMeta({
  name: "ForgotPassword",
  title: "Forgot Password",
  description: "Forgot Password",
});

const email = ref("");

const loading = ref<boolean>(false);
async function sendResetPasswordEmail() {
  loading.value = true;
  const { data, error } = await useFetch("/api/auth/password/" + email.value, {
    method: "POST",
  });
  if (data.value) {
    useSuccessToast(t("password.email_sent"));
    useRouter().push("/login");
  } else if (error.value?.statusMessage === "user_not_found") {
    useErrorToast(t("error.user_not_found"));
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
      <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">
        {{ $t("password.reset_password") }}
      </h2>
      <p class="my-6 text-center text-sm text-muted">
        {{ $t("password.description") }}
      </p>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-6" @submit.prevent="sendResetPasswordEmail">
        <input
          id="email"
          name="email"
          required
          placeholder="johndoe@contact.com"
          class="input w-full"
          v-model="email"
        />
        <ButtonPrimary :full-width="true" :pending="loading" type="submit" :text="$t('password.send')" />
      </form>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
      <LanguageSelector :is-text="true" class="mt-6" />
    </div>
  </div>
</template>
