<script setup lang="ts">
import { PlusCircleIcon, XMarkIcon, StarIcon } from "@heroicons/vue/24/solid";
import { Movie } from "~/types/movie";
import { PropType } from "vue";

defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "10",
  },
});

const movieStore = useMovieStore();

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
  <div class="movie grow relative group">
    <NuxtLink :to="`/movie/${film.id}`">
      <nuxt-img
        quality="50"
        :src="`/tmdb/original/${film.poster_path}`"
        :alt="film.title"
        class="rounded-xl shadow-lg cursor-pointer group-hover:opacity-50 transition-opacity duration-300 ease-in-out"
      />
    </NuxtLink>
    <div
      class="flex flex-col absolute p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bottom-0 left-0 w-full"
    >
      <div class="flex flex-col gap-1">
        <div class="flex flex-col justify-center items-center cursor-pointer">
          <h3 class="text-white opacity-90 font-bold text-sm text-center">
            {{ film.title }}
          </h3>
          <div class="flex items-center gap-2 justify-center">
            <span v-for="(star, index) in getRating(film.vote_average)" :key="index">
              <StarIcon
                class="h-4 w-4 inline-block"
                :class="{ 'text-yellow-400': star.filled, 'text-gray-400': !star.filled }"
              />
            </span>
          </div>
        </div>
        <button
          class="glass-button flex items-center gap-2"
          @click="movieStore.addFavoriteMovie(film)"
          v-if="!movieStore.isFavoriteMovie(film.id)"
        >
          <PlusCircleIcon class="h-4 w-4" />
        </button>
        <button class="glass-button flex items-center gap-2" @click="movieStore.removeFavoriteMovie(film.id)" v-else>
          <XMarkIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie {
  max-width: 140px;
  width: 140px;
  flex-shrink: 0;
  position: relative;
}

@media (min-width: 768px) {
  .movie {
    max-width: 200px;
    width: 200px;
  }
}
</style>
