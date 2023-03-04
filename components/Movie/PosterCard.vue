<script setup lang="ts">
import { Movie } from "~/types/movie";
import { PropType } from "vue";

defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "10",
  },
});
</script>

<template>
  <NuxtLink :to="`/movie/${film.id}`" class="movie cursor-pointer">
    <nuxt-img
      :src="`/tmdb/original/${film.poster_path}`"
      :alt="film.title"
      class="rounded-xl shadow-lg"
      width="160"
      preview-disabled
    />
  </NuxtLink>
</template>

<style scoped lang="scss">
.movie {
  max-width: 160px;
  width: 160px;
  flex-shrink: 0;
  margin-right: 12px;
  position: relative;
}
</style>
