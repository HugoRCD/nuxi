<script setup lang="ts">
import MainCarousel from "~/components/Movie/MainCarousel.vue";

definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});

const { fetchTopRatedMovie, fetchPopularMovie } = useMovie();

const { data, pending } = useAsyncData(async () => {
  const [topRated, popular] = await Promise.all([fetchTopRatedMovie(), fetchPopularMovie()]);
  return {
    topRated,
    popular,
  };
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <MainCarousel :films="data.popular.results" />
  </div>
</template>
