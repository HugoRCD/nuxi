<script setup lang="ts">
import { Movie } from "~/types/movie";
import { PropType } from "vue";

defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="`/movie/${film.id}`"
    class="cursor-pointer scale-100 hover:scale-105 transition duration-300 ease-in-out"
  >
    <nuxt-img :src="`/tmdb/w500/${film.poster_path}`" :alt="film.title" class="rounded-xl shadow-lg" />
  </NuxtLink>
</template>
