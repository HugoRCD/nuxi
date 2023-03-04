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
  <div class="absolute inset-0 flex items-center justify-center z-50 bg-black p-4" v-if="active">
    <XCircleIcon class="h-8 w-8 text-white absolute top-4 right-4 cursor-pointer" @click="close" />
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${film.videos.results[0].key}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>
</template>
