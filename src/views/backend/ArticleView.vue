<template>
  <VLoading :active="isLoading"></VLoading>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('add', article)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.date(article.create_at) }}</td>
          <td>
            <span v-if="article.isPublic">已上架</span>
            <span v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openModal('delete', article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @change-pages="getArticles"></Pagination>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :status="status"
      @update-article="getArticles"
    ></ArticleModal>
    <DelArticleModal
      ref="delArticleModal"
      :delArticle="tempArticle"
      @update-article="getArticles"
    ></DelArticleModal>
  </div>
</template>

<script>
import ArticleModal from '@/components/ArticleModal.vue';
import DelArticleModal from '@/components/DelArticleModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      articles: {},
      tempArticle: {},
      status: '',
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    ArticleModal,
    DelArticleModal,
    Pagination,
  },
  methods: {
    // 取得文章資料
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          // 此 api 本身沒有 content 欄位，但 content 欄位為必填
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, err.request, err.message, '錯誤訊息');
        });
    },
    getArticle(article) {
      this.isLoading = true;
      const { id } = article;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          // 編輯文章 api 才有 content 欄位的資料，需要去接 api 回傳的內容而不是 v-for 的 article 資料
          this.openModal('edit', res.data.article);
          this.isLoading = false;
        })
        .catch((err) => {
          this.$messageState(err.response, err.request, err.message, '錯誤訊息');
        });
    },
    openModal(status, item) {
      // 打開 modal 並判斷執行動作
      this.status = status;
      if (status === 'add') {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.$refs.articleModal.openArticleModal(); // 開啟新增、編輯文章 modal
      } else if (status === 'edit') {
        this.tempArticle = JSON.parse(JSON.stringify(item));
        this.$refs.articleModal.openArticleModal(); // 開啟新增、編輯文章 modal
      } else if (status === 'delete') {
        this.tempArticle = JSON.parse(JSON.stringify(item));
        this.$refs.delArticleModal.openDeleteArticleModalModal(); // 開啟刪除文章 modal
      }
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
