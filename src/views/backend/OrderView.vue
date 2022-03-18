<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="mt-4">
    <h2 class="text-center">訂單頁面</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal('edit', item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @change-pages="getOrders"></Pagination>
  <OrderModal
    ref="orderModal"
    :order="tempOrder"
    :currentPage="pagination.current_page"
    @update-paid="updatePaid"
  ></OrderModal>
  <DelOrderModal
    ref="deleteOrderModal"
    :delOrder="tempOrder"
    @update-order="getOrders"
  ></DelOrderModal>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      orders: {},
      status: '',
      pagination: {},
      tempOrder: {},
      isLoading: false,
    };
  },
  components: {
    OrderModal,
    DelOrderModal,
    Pagination,
  },
  methods: {
    // 取得訂單資料
    getOrders(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    // 修改付款狀態
    updatePaid(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      const status = '更新付款狀態';
      this.$http
        .put(url, { data: paid })
        .then((res) => {
          this.$messageState(res, status);
          this.getOrders();
          this.$refs.orderModal.closeOrderModal();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openModal(status, item) {
      this.status = status;
      if (status === 'edit') {
        this.tempOrder = JSON.parse(JSON.stringify(item));
        this.$refs.orderModal.openOrderModal();
      } else if (status === 'delete') {
        this.tempOrder = JSON.parse(JSON.stringify(item));
        this.$refs.deleteOrderModal.openDeleteOrderModal();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
