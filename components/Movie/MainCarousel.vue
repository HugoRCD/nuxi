<script setup lang="ts">
import BackdropCard from "~/components/Movie/BackdropCard.vue";

const props = defineProps({
  films: {
    type: Array,
    required: true,
  },
});
/// the goal is to create a carousel component, every 5 seconds, the carousel will change the movie, a transition will be applied to the carousel to make it look smooth and nice

const currentFilm = ref(0);

const nextFilm = () => {
  if (currentFilm.value === props.films.length - 1) {
    currentFilm.value = 0;
  } else {
    currentFilm.value++;
  }
};

const interval = setInterval(() => {
  nextFilm();
}, 10000);

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <transition name="fade">
    <BackdropCard :film="films[currentFilm]" />
  </transition>
</template>
