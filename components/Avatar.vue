<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-center">
    <nuxt-img
      class="object-cover rounded-full h-12 w-12"
      :src="`${user.avatar}?${new Date().getTime()}`"
      sizes="sm:100vw md:50vw lg:400px"
      :alt="user.username"
    />
  </div>
</template>
