<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <h2 class="text-center">訂單資訊</h2>
      <div class="row">
        <div class="col-6">商品資訊</div>
        <div class="col-3">數量</div>
        <div class="col-3">小計</div>
      </div>
      <div class="row" v-for="item in cart.carts" :key="item.id">
        <div class="col-6">
          <div class="d-flex align-items-center">
            <img :src="item.product.imageUrl" :alt="item.title" />
            <p>{{ item.product.title }}</p>
          </div>
        </div>
        <div class="col-3">{{ item.qty }}</div>
        <div class="col-3">{{ $filters.currency(item.total) }}</div>
      </div>
      <h2 class="text-center">填寫資訊</h2>
      <div class="my-5 row justify-content-center">
        <VForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label"> Email </label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            >
            </VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              :rules="isPhone"
              v-model="form.user.tel"
            >
            </VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">備註</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <!-- 當購物車產品為 0 或錯誤訊息大於 1 時，表單無法送出並顯示不能點選 ( ? = 可選串連) -->
            <button type="submit" class="btn btn-danger" :disabled="Object.keys(errors).length > 0">
              送出訂單
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: {
        carts: [],
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      id: '',
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
    // 判斷電話是否符合正規表達式
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '請輸入正確的電話號碼';
    },
    // 建立表單
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      const status = '建立訂單';
      this.$http
        .post(url, { data: order })
        .then((res) => {
          this.$messageState(res, status);
          this.$refs.form.resetForm(); // 清空 form 表單內容，套件用法
          this.form.message = '';
          this.$router.push({
            name: '確認訂單', // params 只能用 name 不能用 path
            params: { id: res.data.orderId },
          });
          this.isLoading = false;
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
img {
  width: 200px;
  height: 100px;
  object-fit: cover;
}
</style>
