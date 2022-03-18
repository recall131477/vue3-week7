<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">午分之食</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">後台管理</router-link>
          </li>
        </ul>
      </div>
      <form @submit.prevent="searchProducts">
        <div class="me-3">
          <label for="search">關鍵字搜尋</label>
          <input type="text" id="search" placeholder="搜尋" v-model="keyword" />
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      products: [],
      cart: {
        carts: [],
      },
      favorite: [],
      keyword: '',
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 取得購物車資料
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 取得 localStorage 資料
    getFavorite() {
      this.favorite = JSON.parse(localStorage.getItem('favorite'));
    },
    searchProducts() {
      this.$router.push({
        path: '/search',
        query: { keyword: this.keyword },
      });
      this.keyword = '';
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.getFavorite();
    emitter.on('get-cart', () => {
      this.getCart();
    });
    emitter.on('get-favorite', () => {
      this.getFavorite();
    });
  },
};
</script>
