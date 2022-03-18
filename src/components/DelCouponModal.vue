<template>
  <div
    id="delCouponModal"
    ref="delCouponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delCouponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delCouponModalLabel" class="modal-title">
            <span>刪除</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ delCoupon.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    delCoupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      delCouponModal: '',
    };
  },
  methods: {
    deleteCoupon() {
      const status = '刪除優惠券';
      const { id } = this.delCoupon;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$messageState(res, status);
          this.$emit('update-coupon');
          this.closeDeleteCouponModal();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openDeleteCouponModal() {
      // 開啟刪除產品 modal
      this.delCouponModal.show();
    },
    closeDeleteCouponModal() {
      // 關閉刪除產品 modal
      this.delCouponModal.hide();
    },
  },
  mounted() {
    this.delCouponModal = new Modal(this.$refs.delCouponModal);
  },
};
</script>
