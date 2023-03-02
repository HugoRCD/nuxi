<script setup lang="ts">
definePageMeta({
  name: "Signup",
  title: "Signup",
});

const loading = ref(false);
const signup = async () => {};
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Sign up for your account</h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <form class="space-y-6" @submit.prevent="signup">
      </form>
      <NuxtLink :to="{ name: 'Login' }" class="btn-secondary mt-6"> Already have an account ? Login here </NuxtLink>
    </div>
  </div>
</template>
