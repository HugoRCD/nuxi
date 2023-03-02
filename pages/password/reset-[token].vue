<script setup lang="ts">
import ButtonPrimary from "~/components/ButtonPrimary.vue";

definePageMeta({
  name: "reset-password",
  title: "Reset Password",
  description: "Reset Password",
});

const password = ref("");
const passwordConfirmation = ref("");

const token = useRoute().params.token;

const loading = ref<boolean>(false);

const disabled = computed(() => {
  return password.value.length < 8 || password.value !== passwordConfirmation.value;
});

async function resetPassword() {
  loading.value = true;
  const { data, error } = await useFetch("/api/auth/password/reset", {
    method: "POST",
    body: {
      token,
      password: password.value,
    },
  });
  if (error.value) {
    useErrorToast(error.value.message || "Error updating password");
    loading.value = false;
    return;
  }
  if (data) {
    loading.value = false;
    useSuccessToast("Password updated!");
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
          <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">Reset Password</h2>
          <p class="my-6 text-center text-sm text-muted">Please enter your new password.</p>
        </div>
        <form class="space-y-6" @submit.prevent="resetPassword">
          <input
            id="password"
            name="password"
            required
            placeholder="Password"
            type="password"
            class="input w-full"
            v-model="password"
          />
          <input
            id="password_confirmation"
            name="password_confirmation"
            required
            placeholder="Password Confirmation"
            type="password"
            class="input w-full"
            v-model="passwordConfirmation"
          />
          <span class="text-sm text-muted text-red-600" v-if="disabled">
            Password must match and be at least 8 characters.
          </span>
          <ButtonPrimary
            :full-width="true"
            :pending="loading"
            type="submit"
            :disabled="disabled"
            :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
          />
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
