<script setup lang="ts">
import MainCarousel from "~/components/Movie/MainCarousel.vue";

definePageMeta({
  name: "Home",
  title: "Home",
  path: "/",
  middleware: ["auth"],
});

const { fetchTopRatedMovie, fetchPopularMovie } = useMovie();

onMounted(() => {
  fetchTopRatedMovie();
  fetchPopularMovie();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <MainCarousel />
  </div>
</template>
