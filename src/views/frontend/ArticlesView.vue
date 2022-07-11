<template>
  <div class="container">
    <div class="mt-4">
      <VLoading :active="isLoading"></VLoading>
      <ul class="row row-cols-1 row-cols-md-2 g-4">
        <li v-for="article in articles" :key="article.id">
          <div class="col" v-if="article.isPublic">
            <div class="card">
              <img :src="article.imageUrl" class="card-img-top" :alt="article.title" />
              <div class="card-body">
                <span>{{ $filters.date(article.create_at) }}</span>
                <h5 class="card-title">{{ article.title }}</h5>
                <div>{{ article.description }}</div>
              </div>
              <div class="card-footer">
                <router-link
                  :to="`/article/${article.id}`"
                  v-if="article.isPublic"
                  class="btn btn-outline-primary"
                >
                  文章頁面
                </router-link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Pagination :pages="pagination" @change-pages="getArticles"></Pagination>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 取得所有文章資料
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          console.log(res);
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },

  },
  mounted() {
    this.getArticles();
  },
};
</script>
