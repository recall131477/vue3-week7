<template>
  <div
    id="delArticleModal"
    ref="delArticleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delArticleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delArticleModalLabel" class="modal-title">
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
          <strong class="text-danger">{{ delArticle.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteArticle">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    delArticle: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      delArticleModal: '',
    };
  },
  methods: {
    deleteArticle() {
      const status = '刪除文章';
      const { id } = this.delArticle;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$messageState(res, status);
          this.$emit('update-article');
          this.closeDeleteArticleModalModal();
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
    openDeleteArticleModalModal() {
      // 開啟刪除產品 modal
      this.delArticleModal.show();
    },
    closeDeleteArticleModalModal() {
      // 關閉刪除產品 modal
      this.delArticleModal.hide();
    },
  },
  mounted() {
    this.delArticleModal = new Modal(this.$refs.delArticleModal);
  },
};
</script>
