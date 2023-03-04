<script setup lang="ts">
import { PlayIcon, PlusCircleIcon } from "@heroicons/vue/24/solid";
import { Movie } from "~/types/movie";
import { PropType } from "vue";
defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
});

const loading = computed(() => useGlobalStore().isLoading);
</script>

<template>
  <div>
    <div class="relative w-full" v-if="!loading">
      <nuxt-img :src="`/tmdb/original/${film.backdrop_path}`" :alt="film.title" />
      <div class="absolute inset-0 bg-gradient-to-t from-black opacity-100" />
      <div class="absolute transform -translate-y-1/2 top-1/2 p-4">
        <h3 class="text-white opacity-70 md:text-4xl font-bold text-2xl">
          {{ film.title }}
        </h3>
        <p class="text-white opacity-70 md:w-1/2 text-sm mt-2 hidden md:block">
          {{ film.overview }}
        </p>
        <div class="flex items-center mt-4 space-x-4">
          <NuxtLink :to="`/movie/${film.id}`" class="glass-button">
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
    <Loader v-else />
  </div>
</template>
