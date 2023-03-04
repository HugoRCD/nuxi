<script setup lang="ts">
import MainCarousel from "~/components/Movie/MainCarousel.vue";
import Movies from "~/components/Movies.vue";
const { t } = useI18n();

definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});

const { fetchTopRatedMovie, fetchPopularMovie, fetchComingSoonMovie, topRatedMovies, popularMovies, comingSoonMovies } =
  useMovie();

const favoriteMovies = computed(() => {
  return useMovieStore().getFavoriteMovies;
});

onMounted(() => {
  fetchTopRatedMovie();
  fetchPopularMovie();
  fetchComingSoonMovie();
});
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <MainCarousel />
    <div class="w-full px-4 md:px-8 lg:px-20 flex flex-col gap-8">
      <Movies :films="favoriteMovies" :title="t('home.watchlist')" v-if="favoriteMovies.length > 0" />
      <Movies :films="topRatedMovies" :title="t('home.top_rated')" />
      <Movies :films="popularMovies" :title="t('home.trending')" />
      <Movies :films="comingSoonMovies" :title="t('home.coming_soon')" />
    </div>
  </div>
</template>
