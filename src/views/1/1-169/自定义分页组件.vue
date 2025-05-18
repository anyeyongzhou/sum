<template>
  <div class="page">
    <a v-if="current > 1" @click="changePage(current - 1)">上一页</a>
    <span v-else class="disabled">上一页</span>

    <a
      v-if="current !== 1 && current >= 4 && pageCount > 4"
      @click="changePage(1)"
      >1</a
    >
    <span v-if="current - 2 > 2 && current <= pageCount && pageCount > 5"
      >...</span
    >

    <template v-for="page in visiblePages">
      <a v-if="page !== current" @click="changePage(page)">{{ page }}</a>
      <span v-else class="current">{{ page }}</span>
    </template>

    <span v-if="current + 2 < pageCount - 1 && pageCount > 5">...</span>
    <a v-if="current < pageCount" @click="changePage(pageCount)">{{
      pageCount
    }}</a>

    <a v-if="current < pageCount" @click="changePage(current + 1)">下一页</a>
    <span v-else class="disabled">下一页</span>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    pageCount: {
      type: Number,
      default: 5,
    },
    current: {
      type: Number,
      default: 1,
    },
    backFn: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const current = ref(props.current);
    const pageCount = ref(props.pageCount);

    const visiblePages = computed(() => {
      const pages = [];
      let start = current.value - 2;
      let end = current.value + 2;

      if (current.value <= 3) {
        start = 1;
        end = Math.min(5, pageCount.value);
      } else if (current.value + 2 >= pageCount.value) {
        start = Math.max(pageCount.value - 4, 1);
        end = pageCount.value;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    const changePage = page => {
      if (page < 1 || page > pageCount.value) return;
      current.value = page;
      props.backFn(page);
    };

    return {
      current,
      pageCount,
      visiblePages,
      changePage,
    };
  },
};
</script>

<style scoped>
.page {
  width: 500px !important;
  margin: 100px auto;
  color: #ccc;
}
.page a {
  display: inline-block;
  color: #428bca;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  border: 1px solid #ddd;
  margin: 0 2px;
  border-radius: 4px;
  vertical-align: middle;
}
.page a:hover {
  border: 1px solid #428bca;
}
.page .current {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  margin: 0 2px;
  color: #fff;
  background-color: #428bca;
  border: 1px solid #428bca;
  border-radius: 4px;
  vertical-align: middle;
}
.page .disabled {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  margin: 0 2px;
  color: #bfbfbf;
  background: #f2f2f2;
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  vertical-align: middle;
}
</style>
