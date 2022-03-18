<template>
  <div class="container vh-100">
    <div class="d-flex justify-content-center align-items-center flex-column h-100">
      <h1 class="h3 mb-3 font-weight-normal text-center w-100">請先登入</h1>
      <form class="form-signin w-100" @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="d-block">
            Email
            <input
              type="email"
              class="form-control"
              v-model="user.username"
              id="email"
              placeholder="name@example.com"
              required
            />
          </label>
        </div>
        <div>
          Password
          <label for="password" class="d-block">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              id="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          this.$messageState(err.response, '登入');
        });
    },
  },
};
</script>
