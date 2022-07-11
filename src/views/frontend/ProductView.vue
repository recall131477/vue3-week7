<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <h2 class="text-center">單一產品</h2>
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="width: 200px">
              <img :src="product.imageUrl" alt="產品圖片" />
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id || !product.is_enabled"
                >
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterProducts.length > 0">
        <h3 class="text-center">相關產品</h3>
        <ul class="row">
          <li class="col-3" v-for="item in filterProducts" :key="item.id">
            <img :src="item.imageUrl" alt="" />
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      products: [],
      product: [],
      isLoadingItem: '',
      isLoading: false,
    };
  },
  inject: ['routerRefresh'],
  watch: {
    $route: {
      // 網址變更時觸發
      handler() {
        this.routerRefresh();
      },
    },
  },
  computed: {
    // 過濾產品並顯示該系列相關產品
    filterProducts() {
      const { category, id } = this.product; // 解構取出 category 與 id
      return this.products.filter(
        (item) => item.category === category && item.id !== id,
      );
    },
  },
  methods: {
    // 取得所有產品資料
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
    // 取得產品資料
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params; // 解構式取出 id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoadingItem = id;
      const status = '加入購物車';
      this.$http
        .post(url, { data })
        .then((res) => {
          this.$messageState(res, status);
          this.isLoadingItem = '';
          emitter.emit('get-cart');
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getProduct();
    this.getProducts();
  },
};
</script>

<style lang="scss">
img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
li {
  list-style: none;
}
</style>
