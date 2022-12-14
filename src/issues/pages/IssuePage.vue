<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from '../../shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issues-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;

const { issueIsLoading, issue, issueComments, issueCommentsIsLoading } =
  useIssue(+id);
</script>

<template>
  <RouterLink class="text-white" to="/">Go to issue</RouterLink>
  <!-- Header -->
  <LoaderSpinner
    v-if="issueIsLoading"
    color="white"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <IssueCard v-else-if="issue" :issue="issue" />
  <p v-else>Issue with Id {{ id }} not found</p>

  <!-- Comments -->
  <LoaderSpinner
    v-if="issueCommentsIsLoading"
    color="white"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <div v-else-if="issueComments" class="column">
    <span class="text-h3 q-mb-md"> Comments {{ issueComments.length }} </span>
    <IssueCard
      v-for="comment of issueComments"
      :key="comment.id"
      :issue="comment"
    />
  </div>
  <p v-else>Comments with Id {{ id }} not found</p>
</template>

<style scoped></style>
