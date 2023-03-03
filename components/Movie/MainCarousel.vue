<script setup lang="ts">
defineProps({
  films: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-for="film in films" :key="film.id" class="flex flex-row">
      <Movie :film="film" />
    </div>
  </div>
</template>
