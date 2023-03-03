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
  pending: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div>
    <PosterCard :film="film" v-if="poster" />
    <BackdropCard :film="film" :pending="pending" v-else />
  </div>
</template>
