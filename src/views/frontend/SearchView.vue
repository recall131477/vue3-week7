<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <h2 class="text-center">搜尋頁面</h2>
      <label for="search">搜尋</label>
      <input type="text" id="search" class="mb-4" v-model="keyword" />
      <!-- row 決定內層的數量 -->
      <div class="row row-cols-1 row-cols-lg-4 g-3">
        <!-- 內層不定義寬度 -->
        <div class="col" v-for="product in filterProducts" :key="product.id">
          <div class="card h-100">
            <img :src="product.imageUrl" class="card-img-top" alt="" />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.title }}</h5>
              </div>
              <p class="card-text">
                {{ product.description }}
              </p>
              <router-link class="btn btn-primary w-100" :to="`/product/${product.id}`"
                >查看更多</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      keyword: '',
      isLoading: false,
    };
  },
  computed: {
    filterProducts() {
      return this.keyword === ''
        ? this.products
        : this.products.filter((item) => item.title.match(this.keyword));
    },
  },
  inject: ['routerRefresh'],
  methods: {
    getProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
  },
  watch: {
    $route: { // 網址變更時觸發
      handler() {
        this.routerRefresh();
      },
    },
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword;
    }
    this.getProducts();
  },
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';

.card {
  img {
    height: 200px;
    object-fit: cover;
  }
}
</style>
