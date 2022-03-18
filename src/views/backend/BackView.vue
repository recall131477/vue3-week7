<template>
  <BackNavbar></BackNavbar>
  <div class="container-fluid mt-3 position-relative">
    <router-view v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
import BackNavbar from '@/components/BackNavbar.vue';

export default {
  data() {
    return {
      checkSuccess: false,
    };
  },
  components: {
    BackNavbar,
  },
  methods: {
    // 確認是否登入並儲存 token
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        // axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`;
        const url = `${process.env.VUE_APP_API}/api/user/check`;
        const status = '登入';
        this.$http
          .post(url, { api_token: this.token })
          .then((res) => {
            this.$messageState(res, status);
            this.checkSuccess = true;
          })
          .catch((err) => {
            this.$messageState(err.response, '錯誤訊息');
            this.$router.push('/login');
          });
      } else {
        const status = '請先登入';
        this.$messageState(status);
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
