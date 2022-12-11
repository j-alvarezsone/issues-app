<script setup lang="ts">
import LoaderSpinner from '../../../shared/components/LoaderSpinner.vue';
import useLabels from '../../composables/useLabels';
const { isLoading, data } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="isLoading"
      :show-text="false"
      size="50px"
      :thickness="1"
    />

    <q-chip
      v-else
      v-for="label in data"
      :key="label.id"
      :style="{ color: `#${label.color}` }"
      outline
      clickable
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
