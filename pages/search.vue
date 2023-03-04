<script setup lang="ts">
import { FetchMovieResponse, Movie } from "~/types/movie";
import PosterCard from "~/components/Movie/PosterCard.vue";

definePageMeta({
  title: "Search",
});

const route = useRoute();

const search = computed(() => {
  return route.query.q;
});
const config = useRuntimeConfig().public.tmdb;
const apiKey = config.apiKey;
const baseUrl = "https://api.themoviedb.org/3";
const language = "fr-FR";

const pending = ref(false);

const films = ref<Movie[]>([]);

async function searchMovie() {
  pending.value = true;
  const { data } = await useFetch<FetchMovieResponse>(
    `${baseUrl}/search/movie?api_key=${apiKey}&language=${language}&query=${search.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (data.value) {
    pending.value = false;
    films.value = data.value.results;
  }
  pending.value = false;
}

watch(search, () => {
  searchMovie();
});
</script>

<template>
  <div>
    <Loader v-if="pending" />
    <div class="flex flex-wrap justify-center gap-4 p-4">
      <div v-for="movie in films" :key="movie.id">
        <PosterCard :film="movie" />
      </div>
    </div>
  </div>
</template>
