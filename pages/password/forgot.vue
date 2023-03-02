<script setup lang="ts">
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
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Logo :isText="false" class="flex justify-center" :size="12" />
          <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">Forgot Password</h2>
          <p class="my-6 text-center text-sm text-muted">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>
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
