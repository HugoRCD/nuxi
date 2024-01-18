<script setup lang="ts">
import { PlayIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { Movie } from "~/types/movie";
import { PropType } from "vue";
defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
});

const movieStore = useMovieStore();

const loading = computed(() => useGlobalStore().isLoading);
</script>

<template>
  <div class="w-full">
    <div class="relative w-full" v-if="!loading">
      <nuxt-img :src="`/tmdb/original/${film.backdrop_path}`" :alt="film.title" quality="50" class="object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black opacity-100" />
      <div class="absolute transform -translate-y-1/2 top-1/2 px-4 md:px-8 lg:px-20">
        <h3 class="text-white opacity-70 md:text-4xl font-bold text-2xl">
          {{ film.title }}
        </h3>
        <p class="text-white opacity-70 md:w-1/2 text-sm mt-2 hidden md:block">
          {{ film.overview }}
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <NuxtLink :to="`/movie/${film.id}`">
            <button class="glass-button flex items-center gap-2">
              <PlayIcon class="h-4 w-4" />
              <span class="hidden md:block">{{ $t("global.play") }}</span>
            </button>
          </NuxtLink>
          <button
            class="glass-button flex items-center gap-2"
            @click="movieStore.addFavoriteMovie(film)"
            v-if="!movieStore.isFavoriteMovie(film.id)"
          >
            <PlusCircleIcon class="h-4 w-4" />
            <span class="hidden md:block">{{ $t("global.add_to_watchlist") }}</span>
          </button>
          <button class="glass-button flex items-center gap-2" @click="movieStore.removeFavoriteMovie(film.id)" v-else>
            <XMarkIcon class="h-4 w-4" />
            <span class="hidden md:block">{{ $t("global.remove_from_watchlist") }}</span>
          </button>
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
