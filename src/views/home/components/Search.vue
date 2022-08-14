<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "SearchEngines",
  setup() {
    const engineOptions = ref([
      {
        value: "baidu",
        label: "百度",
        url: "https://www.baidu.com/s?wd=",
      },
      {
        value: "bing",
        label: "必应",
        url: "https://cn.bing.com/search?q=",
      },
      {
        value: "google",
        label: "谷歌",
      },
      {
        value: "bilibili",
        label: "Bilibili",
        url: "https://search.bilibili.com/all?keyword=",
      },
      {
        value: "toutiao",
        label: "头条",
        url: "https://so.toutiao.com/search?dvpf=pc&keyword=",
      },
    ]);

    const engine = ref<string>("baidu");
    const keyword = ref<string>("");

    const searchUrl = computed(() => {
      const findEngine = engineOptions.value.find(
        (item) => item.value === engine.value
      );
      return findEngine ? findEngine.url + keyword.value : "";
    });

    const handleSearch = () => {
      searchUrl.value && window.open(searchUrl.value);
    };

    return {
      engineOptions,
      engine,
      keyword,
      searchUrl,
      handleSearch,
    };
  },
});
</script>

<template>
  <div class="search">
    <a-input-group compact>
      <a-select v-model:value="engine" class="search-engine" size="large">
        <a-select-option v-for="item in engineOptions" :key="item.value">{{
          item.label
        }}</a-select-option>
      </a-select>
      <a-input
        v-model:value="keyword"
        allow-clear
        class="search-keyword"
        size="large"
        @keyup.enter="handleSearch"
      />
    </a-input-group>
  </div>
</template>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 40%;

  @engine-width: 100px;

  &-engine {
    width: @engine-width;
  }

  &-keyword {
    width: calc(100% - @engine-width);
  }
}
</style>
