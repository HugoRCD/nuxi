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
const trailerPreview = ref();

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
  <div
    :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${detailMovie.backdrop_path})` }"
    :class="['bg-cover bg-center bg-no-repeat', { 'bg-gray-900': !detailMovie.backdrop_path }, 'relative w-full']"
  >
    <div class="absolute inset-0 bg-gradient-to-t from-black opacity-100" />
    <div class="flex p-4 md:p-8 lg:p-20 items-center justify-between">
      <div>
        <h3 class="text-white opacity-70 md:text-4xl font-bold text-2xl">
          {{ detailMovie.title }}
        </h3>
        <p class="text-white opacity-70 md:w-1/2 text-sm mt-2 hidden md:block">
          {{ detailMovie.overview }}
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <button class="glass-button flex items-center gap-2" @click="trailerPreview.show()">
            <PlayIcon class="h-4 w-4" />
            <span class="hidden md:block">{{ $t("global.play") }}</span>
          </button>
          <button class="glass-button flex items-center gap-2">
            <PlusCircleIcon class="h-4 w-4" />
            <span class="hidden md:block">{{ $t("global.add_to_watchlist") }}</span>
          </button>
        </div>
        <div class="flex flex-col gap-3 mt-4">
          <span class="text-white opacity-70 text-sm">
            {{ $t("global.release_date") }}: {{ detailMovie.release_date }}
          </span>
          <span class="text-white opacity-70 text-sm">
            {{ $t("global.rating") }}:
            <span v-for="(star, index) in getRating(detailMovie.vote_average)" :key="index">
              <StarIcon
                class="h-4 w-4 inline-block mr-2"
                :class="{ 'text-yellow-400': star.filled, 'text-gray-400': !star.filled }"
              />
            </span>
          </span>
          <span class="text-white opacity-70 text-sm">
            {{ $t("global.genre") }}:
            <span v-for="(genre, index) in detailMovie.genres" :key="index">
              {{ genre.name }}{{ index < detailMovie.genres.length - 1 ? ", " : "" }}
            </span>
          </span>
          <span class="text-white opacity-70 text-sm">
            {{ $t("global.duration") }}: {{ detailMovie.runtime }} {{ $t("global.minutes") }}
          </span>
        </div>
      </div>
      <div class="z-10 hidden md:block">
        <nuxt-img :src="`/tmdb/original/${detailMovie.poster_path}`" :alt="detailMovie.title" />
      </div>
    </div>
    <TrailerPreview ref="trailerPreview" :film="detailMovie" />
  </div>
</template>
