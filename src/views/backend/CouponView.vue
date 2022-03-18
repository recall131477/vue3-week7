<template>
  <VLoading :active="isLoading"></VLoading>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('add', item)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @change-pages="getCoupons"></Pagination>
  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    :status="status"
    @update-coupon="getCoupons"
  ></CouponModal>
  <DelCouponModal
    ref="delCouponModal"
    :delCoupon="tempCoupon"
    @update-coupon="getCoupons"
  ></DelCouponModal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DelCouponModal from '@/components/DelCouponModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      status: '',
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    CouponModal,
    DelCouponModal,
    Pagination,
  },
  methods: {
    // 取得優惠券資料
    getCoupons(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openModal(status, item) {
      // 打開 modal 並判斷執行動作
      this.status = status;
      if (status === 'add') {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
        this.$refs.couponModal.openCouponModal(); // 開啟新增、編輯優惠券 modal
      } else if (status === 'edit') {
        this.tempCoupon = JSON.parse(JSON.stringify(item));
        this.$refs.couponModal.openCouponModal(); // 開啟新增、編輯優惠券 modal
      } else if (status === 'delete') {
        this.tempCoupon = JSON.parse(JSON.stringify(item));
        this.$refs.delCouponModal.openDeleteCouponModal(); // 開啟刪除優惠券 modal
      }
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
