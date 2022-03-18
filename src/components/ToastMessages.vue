<template>
  <div class="toast-container position-fixed pe-3 top-0 end-0" style="z-index: 1500">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="toast show"
      :class="`toast${index}`"
      role="alert"
    >
      <div class="toast-header">
        <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToastMessage(index)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="msg.content">
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    toastMessageShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToastMessage(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastMessageShow();
    });
  },
};
</script>
