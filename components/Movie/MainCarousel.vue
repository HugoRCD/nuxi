<script setup lang="ts">
import BackdropCard from "~/components/Movie/BackdropCard.vue";
import { FetchMovieResponse } from "~/types/movie";
const globalStore = useGlobalStore();
const config = useRuntimeConfig().public.tmdb;
const apiKey = config.apiKey;
const baseUrl = "https://api.themoviedb.org/3";
const language = "fr-FR";

const { data, pending } = await useLazyAsyncData<FetchMovieResponse>(
  async () => {
    return await $fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}`);
  },
  {
    watch: [],
    immediate: true,
  },
);

const currentMovie = ref(0);

const nextMovie = () => {
  if (data.value) {
    if (currentMovie.value === data.value.results.length - 1) {
      currentMovie.value = 0;
    } else {
      currentMovie.value++;
    }
  }
};

const interval = setInterval(nextMovie, 8000);

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="flex flex-col w-full items-center justify-center gap-8 md:h-96">
    <BackdropCard v-if="data" :film="data.results[currentMovie]" />
  </div>
</template>
