<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <h2 class="text-center">產品列表</h2>
      <ul class="d-flex menu">
        <li>
          <a href="#" @click.prevent="changeCategory('all')">全部</a>
        </li>
        <li>
          <a href="#" @click.prevent="changeCategory('toast')">吐司系列</a>
        </li>
        <li>
          <a href="#" @click.prevent="changeCategory('hamburger')">漢堡系列</a>
        </li>
        <li>
          <a href="#" @click.prevent="changeCategory('fried')">炸物系列</a>
        </li>
        <li>
          <a href="#" @click.prevent="changeCategory('platter')">拼盤系列</a>
        </li>
        <li>
          <a href="#" @click.prevent="changeCategory('mainmeal')">主餐系列</a>
        </li>
      </ul>
      <!-- row 決定內層的數量 -->
      <div class="row row-cols-1 row-cols-lg-4 g-3">
        <!-- 內層不定義寬度 -->
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card h-100">
            <img :src="product.imageUrl" class="card-img-top" alt="..." />
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.title }}</h5>
                <button type="button" @click.prevent="toggleFavorite(product.id)">
                  <span v-if="favorite.includes(product.id)"><i class="bi bi-heart-fill"></i></span>
                  <span v-else><i class="bi bi-heart"></i></span>
                </button>
              </div>
              <p class="card-text">
                {{ product.description }}
              </p>
              <router-link class="btn btn-primary w-100" :to="`/product/${product.id}`"
                >查看更多</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Pagination :pages="pagination" @change-pages="getProducts"></Pagination>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue';
import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      pagination: {},
      category: 'all',
      favorite: JSON.parse(localStorage.getItem('favorite')) || [], // 若陣列沒資料，賦予空陣列
    };
  },
  components: {
    Pagination,
  },
  watch: {
    // 因為是陣列，需要做深層監聽
    favorite: {
      handler() {
        // localStorage 自訂欄位
        localStorage.setItem('favorite', JSON.stringify(this.favorite));
        emitter.emit('get-favorite');
      },
      deep: true,
    },
  },
  methods: {
    changeCategory(category) {
      this.category = category;
      this.getProducts();
    },
    getProducts(page = 1) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$router.push('/products');
      if (this.category !== 'all') {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${this.category}`;
        this.$router.push(`/products?category=${this.category}`);
      }
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
    toggleFavorite(id) {
      // 查資料，有沒有這一個 id 如果有 1，沒有 -1
      const favoriteIndex = this.favorite.findIndex((item) => item === id);
      if (favoriteIndex === -1) {
        this.favorite.push(id);
      } else {
        this.favorite.splice(favoriteIndex, 1);
      }
    },
  },
  mounted() {
    if (this.$route.query.category) {
      this.category = this.$route.query.category;
    }
    this.getProducts();
  },
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';

.card {
  img {
    height: 200px;
    object-fit: cover;
  }
}

.menu {
  li {
    width: 20%;
    list-style: none;
  }
  a {
    text-decoration: none;
  }
}

span {
  cursor: pointer;
  i {
    color: red;
  }
}
</style>
