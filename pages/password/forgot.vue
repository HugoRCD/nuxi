<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

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
  if (error.value) {
    useErrorToast(error.value.message || "Error sending email");
    loading.value = false;
    return;
  }
  if (data) {
    loading.value = false;
    useSuccessToast("Email sent!");
    useRouter().push("/login");
  }
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">Forgot Password</h2>
      <p class="my-6 text-center text-sm text-muted">
        Enter your email address and we will send you a link to reset your password.
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
        <ButtonPrimary :full-width="true" :pending="loading" type="submit" />
      </form>
    </div>
    <LanguageSelector :is-text="true" class="mt-6" />
  </div>
</template>
