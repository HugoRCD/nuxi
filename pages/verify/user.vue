<script setup lang="ts">
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
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
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
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>
