<script setup lang="ts">
import MainCarousel from "~/components/Movie/MainCarousel.vue";

definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});

const { fetchTopRatedMovie, fetchPopularMovie, popularMovies } = useMovie();

onMounted(() => {
  fetchTopRatedMovie();
  fetchPopularMovie();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <MainCarousel :films="popularMovies" :pending="false" />
  </div>
</template>
