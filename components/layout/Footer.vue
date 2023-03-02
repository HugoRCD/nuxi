<script setup lang="ts">
</script>

<template>
  <footer class="bg-primary">
    <div class="mx-auto max-w-7xl overflow-hidden py-10 px-6 lg:px-8">
      <hr class="mt-10 border-t-2 border-muted rounded-lg" />
      <div class="mt-10 flex flex-col justify-center items-center space-y-4">
        <nuxt-img class="w-auto h-6" :src="'/supabase/assets/maison-hochard-logo'" />
        <span class="text-muted text-sm"
        >© 2023
          <NuxtLink
            target="_blank"
            to="https://www.maisonhochard.com"
            class="text-muted hover:text-primary transition-colors duration-300 ease-in-out"
          >
            Maison Hochard </NuxtLink
          >. All rights reserved.</span
        >
      </div>
    </div>
  </footer>
</template>