<template>
  <div class="container">
    <VLoading :active="isLoading"></VLoading>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/articles">部落格列表</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ article.title }}</h2>
        <div class="d-flex justify-content-between">
          <div>
            <small class="text-muted">{{ $filters.date(article.create_at) }}</small> -
            <small class="text-muted">作者：{{ article.author }}</small>
          </div>
          <div>
            <small class="ms-2" v-for="(tag, index) in article.tag" :key="index">{{ tag }}</small>
          </div>
        </div>
        <img :src="article.imageUrl" :alt="article.title" class="img-fluid mb-3" />
        <div v-html="article.content"></div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      isLoading: false,
    };
  },
  inject: ['routerRefresh'],
  watch: {
    $route: {
      // 網址變更時觸發
      handler() {
        this.routerRefresh();
      },
    },
  },
  methods: {
    // 取得特定文章資料
    getArticle() {
      this.isLoading = true;
      const { id } = this.$route.params; // 解構式取出 id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, '錯誤訊息');
        });
    },
  },
  mounted() {
    this.getArticle();
  },
};
</script>
