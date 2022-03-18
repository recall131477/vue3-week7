<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="couponModal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="status === 'add'">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="dueDate">到期日</label>
            <input type="date" class="form-control" id="dueDate" v-model="dueDate" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="updateCoupon">
            {{ status === 'add' ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    status: {
      type: String,
      default: '',
    },
    currentPage: {
      // currentPage = pagination.current_page 把當前頁面帶進來
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      tempCoupon: {},
      dueDate: '',
      couponModal: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = JSON.parse(JSON.stringify(this.coupon));
      // 時間戳轉換 yyyy-mm-dd
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.dueDate] = dateAndTime;
    },
    dueDate() {
      this.tempCoupon.due_date = Math.floor(new Date(this.dueDate) / 1000);
    },
  },
  methods: {
    updateCoupon() {
      // 狀態判斷新增或修改(新增=新資料，修改=舊資料)
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      let status = '新增優惠券';
      if (this.status !== 'add') {
        const { id } = this.coupon; // 解構式取出 id
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
        httpMethod = 'put';
        status = '更新優惠券';
      }
      this.$http[httpMethod](url, { data: this.tempCoupon })
        .then((res) => {
          this.$messageState(res, status);
          // this.currentPage = 當更新優惠券時，更新完畢重新渲染畫面時，停留在當前頁面
          this.$emit('update-coupon', this.currentPage);
          this.closeCouponModal();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openCouponModal() {
      // 開啟新增、編輯優惠券 modal
      this.couponModal.show();
    },
    closeCouponModal() {
      // 關閉新增、編輯優惠券 modal
      this.couponModal.hide();
    },
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.couponModal);
  },
};
</script>
