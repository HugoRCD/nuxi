<script setup lang="ts">
import { Movie } from "~/types/movie";
import { PropType } from "vue";
import PosterCard from "~/components/Movie/PosterCard.vue";

defineProps({
  films: {
    type: Object as PropType<Movie>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>

<template>
  <div class="z-10">
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <div class="movies flex overflow-x-auto mt-4 pb-1 gap-4">
      <PosterCard :film="film" v-for="film in films" :key="film.id" />
    </div>
  </div>
</template>
