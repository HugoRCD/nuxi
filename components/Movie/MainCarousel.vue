<script setup lang="ts">
defineProps({
  films: {
    type: Array,
    required: true,
  },
  pending: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <div v-for="film in films" :key="film.id">
      <Movie :film="film" :pending="pending" />
    </div>
  </div>
</template>
