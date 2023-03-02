<script setup lang="ts">
const props = defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="text-center">
    <i class="fas fa-spinner fa-spin text-primary"></i>
    <p class="text" v-if="props.isText">
      {{ $t("loading") }}
    </p>
  </div>
</template>
