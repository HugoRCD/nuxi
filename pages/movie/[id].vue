<script setup lang="ts">
import { FetchMovieResponse } from "~/types/movie";
definePageMeta({
  name: "Movie",
  title: "Movie",
  path: "/movie/:id",
  middleware: ["auth"],
  layout: "detail",
});

const { fetchMovie } = useMovie();
const route = useRoute();
const filmId = parseInt(route.params.id as string);

const { data: film, pending } = useAsyncData<FetchMovieResponse>(async () => {
  return await fetchMovie(filmId);
});
</script>

<template>
  <div class="h-screen relative">
    <nuxt-img
      v-if="film.backdrop_path"
      :src="`/tmdb/original/${film.backdrop_path}`"
      :alt="film.title"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
    <!--    add all the detail of the movie and possibility to watch the trailer here-->
    <div class="absolute transform -translate-y-1/2 top-1/2 p-4">
      <h3 class="text-white opacity-70 md:text-4xl font-bold text-2xl">
        {{ film.title }}
      </h3>
      <p class="text-white opacity-70 md:w-1/2 text-sm mt-2 hidden md:block">
        {{ film.overview }}
      </p>
    </div>
  </div>
</template>
