<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

const userStore = useUserStore();
const user = userStore.getUser;

const token = useRoute().query.token || ref<string>("");

const loading = ref<boolean>(false);

async function sendVerificationEmail() {
  const { data, error } = await useFetch("/api/auth/verify/sendVerification", {
    method: "POST",
    body: {
      email: user?.email,
    },
  });
  if (error.value) {
    useErrorToast(error.value.message || "Error sending verification email");
    return;
  }
  if (data) {
    useSuccessToast("Verification email sent!");
  }
}

async function verify() {
  loading.value = true;
  const { data, error } = await useFetch("/api/auth/verify/" + user?.email, {
    method: "POST",
    body: {
      token: token.value,
    },
  });
  if (error.value) {
    useErrorToast(error.value.message || "Error verifying account");
    loading.value = false;
    return;
  }
  if (data) {
    loading.value = false;
    userStore.setVerified();
    useSuccessToast("Account verified!");
    useRouter().push("/app/my-flows");
  }
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div>
        <Logo :isText="false" class="flex justify-center" :size="12" />
        <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">Verify your account</h2>
        <p class="my-6 text-center text-sm text-muted">
          We have sent you an email with a verification link. Please click on the link to verify your account.
        </p>
      </div>
      <form @submit.prevent="verify" class="space-y-6">
        <input id="token" name="token" required placeholder="123456" class="input w-full" v-model="token" />
        <ButtonPrimary :full-width="true" :pending="loading" type="submit" />
      </form>
      <p class="my-6 text-center text-sm text-muted">
        Didn't receive an email?
        <span class="text-primary cursor-pointer" @click="sendVerificationEmail">Resend verification email</span>
      </p>
    </div>
    <LanguageSelector :is-text="true" />
  </div>
</template>
