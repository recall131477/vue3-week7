<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('add')">建立新的產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price }}</td>
        <td>{{ item.price }}</td>
        <td>
          <span
            class="text-primary text-decoration-none"
            v-if="item.is_enabled"
            :class="{ 'text-success': item.is_enabled }"
            >啟用</span
          >
          <span class="text-primary text-decoration-none" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @change-pages="getProducts"></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    :status="status"
    :currentPage="pagination.current_page"
    @update-product="getProducts"
  ></ProductModal>
  <DelProductModal
    ref="delProductModal"
    :delProduct="tempProduct"
    :currentPage="pagination.current_page"
    @update-product="getProducts"
  ></DelProductModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      status: '',
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DelProductModal,
    Pagination,
  },
  methods: {
    // 取得產品資料
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
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
        this.tempProduct = {
          imagesUrl: [],
        };
        this.$refs.productModal.openProductModal(); // 開啟新增、編輯產品 modal
      } else if (status === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.productModal.openProductModal(); // 開啟新增、編輯產品 modal
      } else if (status === 'delete') {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.delProductModal.openDeleteProductModal(); // 開啟刪除產品 modal
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
