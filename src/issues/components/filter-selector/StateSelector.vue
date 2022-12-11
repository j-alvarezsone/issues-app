<script setup lang="ts">
import { useIssuesStore } from '../../../stores/issues';
import { storeToRefs } from 'pinia';

const IssuesStore = useIssuesStore();

const { state } = storeToRefs(IssuesStore);
</script>

<template>
  <q-btn-toggle
    v-model="state"
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
