<script setup lang="ts">
import { Movie } from "~/types/movie";
import { PropType } from "vue";
import PosterCard from "~/components/Movie/PosterCard.vue";
import BackdropCard from "~/components/Movie/BackdropCard.vue";

defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
  poster: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <PosterCard :film="film" v-if="poster" />
    <BackdropCard :film="film" v-else />
  </div>
</template>
