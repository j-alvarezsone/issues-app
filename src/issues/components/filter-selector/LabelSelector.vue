<script setup lang="ts">
import LoaderSpinner from '../../../shared/components/LoaderSpinner.vue';
</script>

<template>
  <LoaderSpinner :show-text="false" size="50px" :thickness="1" />

  <q-chip v-for="label in 10" :key="label" color="primary" outline clickable>
    Some name
  </q-chip>
</template>

<style scoped></style>
