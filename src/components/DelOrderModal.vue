<template>
  <div
    id="delOrderModal"
    ref="delOrderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ delOrder.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteOrder">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    delOrder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      delOrderModal: '',
    };
  },
  methods: {
    deleteOrder() {
      const status = '刪除商品';
      const { id } = this.delOrder;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$messageState(res, status);
          this.$emit('update-order');
          this.closeDeleteOrderModal();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openDeleteOrderModal() {
      // 開啟刪除產品 modal
      this.delOrderModal.show();
    },
    closeDeleteOrderModal() {
      // 關閉刪除產品 modal
      this.delOrderModal.hide();
    },
  },
  mounted() {
    this.delOrderModal = new Modal(this.$refs.delOrderModal);
  },
};
</script>
