<script setup lang="ts">
definePageMeta({
  name: "Login",
  title: "Login",
  description: "Login to your account",
  middleware: ["already-auth"],
});
const client = useSupabaseAuthClient();
const appDomain = useRuntimeConfig().public.appDomain;

async function signInWithGoogle() {
  await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: appDomain } });
  useRouter().push('/')
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Sign in to your account</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <button
        @click="signInWithGoogle"
        class="inline-flex w-full justify-center rounded-md bg-secondary py-2 px-4 text-primary shadow-sm items-center gap-x-4 border border-muted hover:border-accent transition duration-300 ease-in-out"
      >
        <i class="fab fa-google"></i>
        <span>Sign in with Google</span>
      </button>
      <NuxtLink to="/auth/signup" class="btn-secondary mt-6"> Don't have an account ? Sign up </NuxtLink>
    </div>
  </div>
</template>
