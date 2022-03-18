<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'd-none': !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePages(pages.current_page - (pages.total_pages - 1))"
        >
          <span aria-hidden="true">第一頁</span>
        </a>
      </li>
      <li class="page-item" :class="{ 'd-none': !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePages(pages.current_page - 1)"
        >
          <span aria-hidden="true">上一頁</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(page, index) in pages.total_pages"
        :key="index"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="changePages(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'd-none': !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePages(pages.current_page + 1)"
        >
          <span aria-hidden="true">下一頁</span>
        </a>
      </li>
      <li class="page-item" :class="{ 'd-none': !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePages(pages.current_page + (pages.total_pages - 1))"
        >
          <span aria-hidden="true">最後一頁</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    changePages(item) {
      this.$emit('change-pages', item);
    },
  },
};
</script>
