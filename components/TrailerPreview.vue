<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { PropType } from "vue";
import { Movie } from "~/types/movie";

defineProps({
  film: {
    type: Object as PropType<Movie>,
    required: true,
  },
});

const active = ref(false);
const show = () => {
  active.value = true;
};
const close = () => {
  active.value = false;
};

defineExpose({
  show,
  close,
});
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center z-50 bg-black p-4 flex flex-col gap-4" v-if="active">
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${film.videos.results[0].key}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <button class="glass-button flex items-center gap-2" @click="close">
      <XCircleIcon class="w-6 h-6 text-white" />
      {{ $t("movie.close_trailer") }}
    </button>
  </div>
</template>
