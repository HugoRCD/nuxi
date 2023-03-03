<script setup lang="ts">
import { FetchMovieResponse } from "~/types/movie";

const { fetchMovie } = useMovie();
const route = useRoute();
const filmId = parseInt(route.params.id as string);

const { data, pending } = useLazyAsyncData<FetchMovieResponse>(async () => {
  const movie = await fetchMovie(filmId);
  return movie;
});
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
