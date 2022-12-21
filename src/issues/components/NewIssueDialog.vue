<script setup lang="ts">
import { ref, watch } from 'vue';
import useIssueMutation from '../composables/useIssueMutration';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

interface Props {
  isOpen: boolean;
  labels: string[];
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { mutate, isLoading } = useIssueMutation();

const isOpen = ref<boolean>(false);
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(
  () => props.isOpen,
  (value) => {
    isOpen.value = value;
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form @submit="mutate({ title, body, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue with label</div>
            </div>

            <q-space />

            <div>
              <q-input
                v-model="title"
                label="Title"
                placeholder="Title"
                filled
                dense
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />

              <q-select
                v-model="labels"
                label="Multiple selection"
                placeholder="Labels"
                filled
                dense
                multiple
                use-chips
                :options="props.labels"
                stack-label
                class="q-mb-sm"
              />

              <!-- Markdown editor -->
              <md-editor
                v-model="body"
                placeholder="# Markdown"
                language="en-US"
              />
            </div>
          </q-card-section>

          <q-card-actions align="left">
            <q-btn
              :disabled="isLoading"
              label="Cancel"
              color="primary"
              flat
              v-close-popup
              @click="emit('onClose')"
            />
            <q-space />
            <q-btn
              :disabled="isLoading"
              type="submit"
              label="Add Issue"
              color="dark"
              flat
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
