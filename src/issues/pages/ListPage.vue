<script setup lang="ts">
import LoaderSpinner from '../../shared/components/LoaderSpinner.vue';
import FloatingButtons from '../components/FloatingButtons.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issues-list/IssueList.vue';
import useIssues from '../composables/useIssues';

const { isLoading, data } = useIssues();

const test = () => {
  console.log('test');
};
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!-- TODO Filter -->
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="isLoading" color="white" />
      <IssueList v-else :issues="data || []" />
    </div>
  </div>
  <!-- FloatingButtons -->
  <FloatingButtons
    :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: 'lg',
        action: () => test(),
      },
    ]"
  />
</template>

<style scoped></style>
