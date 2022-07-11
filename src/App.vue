<template>
  <ToastMessages></ToastMessages>
  <router-view v-if="routerAlive"></router-view>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    ToastMessages,
  },
  data() {
    return {
      routerAlive: true,
    };
  },
  provide() {
    return {
      routerRefresh: this.routerRefresh,
    };
  },
  methods: {
    routerRefresh() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
@import '@/assets/scss/all.scss';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css');
</style>
