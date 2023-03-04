<script setup lang="ts">
import MainCarousel from "~/components/Movie/MainCarousel.vue";
import PosterCard from "~/components/Movie/PosterCard.vue";
import Movies from "~/components/Movies.vue";

definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});

const { fetchTopRatedMovie, fetchPopularMovie, topRatedMovies, popularMovies } = useMovie();

const favoriteMovies = computed(() => {
  return useMovieStore().getFavoriteMovies;
});

onMounted(() => {
  fetchTopRatedMovie();
  fetchPopularMovie();
});
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <MainCarousel />
    <div class="w-full px-4 md:px-8 lg:px-20 flex flex-col gap-8">
      <Movies :films="favoriteMovies" title="Favorite" v-if="favoriteMovies.length > 0" />
      <Movies :films="topRatedMovies" title="Top Rated" />
      <Movies :films="popularMovies" title="Popular" />
    </div>
  </div>
</template>
