<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <h2 class="text-center">購物車</h2>
      <!-- 購物車列表 -->
      <div class="text-end">
        <!-- 購物車產品為 0 時，清空購物車不可點擊 -->
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteAllCarts"
          :disabled="cart.carts.length === 0"
          :class="{ 'not-pointer': cart.carts.length === 0 }"
        >
          清空購物車
        </button>
        <router-link to="/products" class="btn btn-primary mx-3" v-if="cart.carts.length !== 0"
          >繼續購物</router-link
        >
        <router-link
          to="/checkout"
          class="btn btn-primary"
          :class="{ 'not-pointer disabled': cart.carts.length === 0 }"
        >
          前往結帳
        </router-link>
      </div>
      <div class="text-center" v-if="cart.carts.length === 0">
        <p>購物車目前沒有商品</p>
        <router-link to="/products" class="btn btn-outline-danger">前往購物</router-link>
      </div>
      <table class="table align-middle" v-else>
        <thead>
          <tr>
            <th style="width: 25%"></th>
            <th style="width: 25%">品名</th>
            <th style="width: 10%">數量/單位</th>
            <th style="width: 25%" class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <!-- 判斷購物車資料是否存在 -->
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(item.id)"
                  :disabled="isLoadingItem === item.id"
                >
                  <i class="fas fa-spinner fa-pulse" v-if="isLoadingItem === item.id"></i>
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCartItem(item)"
                      :disabled="isLoadingItem === item.id"
                    >
                      <option :value="num" v-for="num in 20" :key="`${num}-${item.id}`">
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      isLoadingItem: '',
      isLoading: false,
    };
  },
  methods: {
    // 取得購物車資料
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 更新購物車
    updateCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const status = '更新商品';
      this.isLoadingItem = item.id;
      this.$http
        .put(url, { data })
        .then((res) => {
          this.$messageState(res, status);
          this.getCart();
          this.isLoadingItem = '';
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 刪除購物車特定產品
    deleteCartItem(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      const status = '刪除商品';
      this.isLoadingItem = id;
      this.$http
        .delete(url)
        .then((res) => {
          this.$messageState(res, status);
          emitter.emit('get-cart');
          this.getCart();
          this.isLoadingItem = '';
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 刪除購物車全部產品
    deleteAllCarts() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      const status = '刪除全部商品';
      this.$http
        .delete(url)
        .then((res) => {
          this.$messageState(res, status);
          emitter.emit('get-cart');
          this.getCart();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>

<style lang="scss">
.not-pointer {
  cursor: not-allowed !important;
  pointer-events: inherit !important;
}
</style>
