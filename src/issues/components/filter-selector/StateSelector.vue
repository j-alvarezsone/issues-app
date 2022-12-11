<script setup lang="ts"></script>

<template>
  <q-btn-toggle
    v-model="model"
    push
    spread
    toggle-color="primary"
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style scoped></style>
