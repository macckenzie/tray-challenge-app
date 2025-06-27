<template>
  <div class="modal fade" :class="{ 'show': show }" style="display: block;" tabindex="-1" aria-labelledby="modalLabel"
       aria-hidden="true" v-if="show">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            {{ title }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade" :class="{ 'show': show }" v-if="show"></div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

const props = defineProps<{
  show: boolean,
  title: string,
}>();

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background when open */
}
</style>