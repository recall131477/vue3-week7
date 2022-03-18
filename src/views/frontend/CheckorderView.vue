<template>
  <div class="container">
    <div class="mt-4">
      <h2 class="text-center">確認訂單</h2>
    </div>
    <div>
      <ul>
        <li class="row row-cols-2">
          <span>下單時間</span>
          <span>{{ $filters.date(order.create_at) }}</span>
        </li>
        <li class="row row-cols-2">
          <span>訂單編號</span>
          <span>{{ order.id }}</span>
        </li>
        <li class="row row-cols-2">
          <span>姓名</span>
          <span>{{ user.name }}</span>
        </li>
        <li class="row row-cols-2">
          <span>電話</span>
          <span>{{ user.tel }}</span>
        </li>
        <li class="row row-cols-2">
          <span>Email</span>
          <span>{{ user.email }}</span>
        </li>
        <li class="row row-cols-2">
          <span>地址</span>
          <span>{{ user.address }}</span>
        </li>
        <li class="row row-cols-2" v-if="order.message">
          <span>備註</span>
          <span>{{ order.message }}</span>
        </li>
        <li class="row row-cols-2">
          <span>總計</span>
          <span>NT${{ $filters.currency(order.total) }}</span>
        </li>
        <li>
          <span>購買產品</span>
          <ul>
            <li class="d-flex align-items-center" v-for="item in products" :key="item.id">
              <div>
                <img :src="item.product.imageUrl" :alt="item.title" />
              </div>
              <div>{{ item.product.title }}</div>
              <div class="mx-4">{{ item.qty }}</div>
              <div>NT${{ $filters.currency(item.total) }}</div>
            </li>
          </ul>
        </li>
      </ul>
      <button type="button" class="btn btn-primary" @click="payOrder">確認結帳</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      orderId: '',
      user: {},
      products: {},
    };
  },
  methods: {
    // 取得訂單資料
    getOrder() {
      const { id } = this.$route.params; // 解構式取出 id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.order = res.data.order;
          this.user = res.data.order.user;
          this.products = res.data.order.products;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 訂單付款
    payOrder() {
      const { id } = this.$route.params; // 解構式取出 id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      const status = '付款';
      this.$http
        .post(url)
        .then((res) => {
          if (res.data.success) {
            this.$router.push({
              name: '完成購物', // params 只能用 name 不能用 path
              params: { id: this.orderId },
            });
            this.$messageState(res, status);
          } else {
            this.$messageState(res.data.message, '錯誤訊息');
          }
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.orderId = this.$route.params.id;
    }
    this.getOrder();
  },
};
</script>

<style lang="scss">
li {
  list-style: none;
}

img {
  width: 200px;
  height: 100px;
  object-fit: cover;
}
</style>
