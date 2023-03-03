<script setup lang="ts">
import { PlayIcon, PlusCircleIcon, StarIcon } from "@heroicons/vue/24/solid";
definePageMeta({
  name: "Movie",
  title: "Movie",
  path: "/movie/:id",
  middleware: ["auth"],
  layout: "detail",
});
const { fetchMovie, detailMovie } = useMovie();

const route = useRoute();
const filmId = parseInt(route.params.id as string);

onMounted(() => {
  fetchMovie(filmId);
});

function getRating(rating: number) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 2) {
      stars.push({ filled: true });
    } else if (rating >= 1) {
      stars.push({ filled: false });
    } else {
      stars.push({ filled: false });
    }
    rating -= 2;
  }
  return stars;
}
</script>

<template>
  <div>
    <div class="h-screen relative">
      <nuxt-img
        v-if="detailMovie.backdrop_path"
        :src="`/tmdb/original/${detailMovie.backdrop_path}`"
        :alt="detailMovie.title"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black opacity-70" />
      <!--    add all the detail of the movie and possibility to watch the trailer here-->
      <div class="absolute transform -translate-y-1/2 top-1/2 p-4 space-y-4">
        <h3 class="text-white opacity-70 md:text-4xl font-bold text-2xl">
          {{ detailMovie.title }}
        </h3>
        <p class="text-white opacity-70 md:w-1/2 text-sm mt-2 hidden md:block">
          {{ detailMovie.overview }}
        </p>
        <div class="movie-info flex flex-col">
          <span class="text-white opacity-70 text-sm">
            {{ detailMovie.release_date }}
          </span>
          <div class="flex items-center space-x-1">
            <div v-for="star in getRating(detailMovie.vote_average)" :key="star">
              <StarIcon class="h-4 w-4 inline-block" :class="{ 'text-yellow-400': star.filled }" />
            </div>
          </div>
        </div>
        <div class="flex items-center mt-4 space-x-4">
          <NuxtLink :to="`/movie/${detailMovie.id}`" class="glass-button">
            <button>
              <PlayIcon class="h-4 w-4 inline-block mr-2" />
              {{ $t("global.play") }}
            </button>
          </NuxtLink>
          <button class="glass-button">
            <PlusCircleIcon class="h-4 w-4 inline-block mr-2" />
            {{ $t("global.add_to_watchlist") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
