<template>
  <div class="desktop">
    <a-dropdown :trigger="['contextmenu']">
      <div
        v-for="item in iconList"
        :key="item.url"
        class="desktop-item"
        @dblclick="gotoUrl(item.url)"
      >
        <img class="desktop-item__icon" :src="item.icon" :alt="item.name" />
        <p class="desktop-item__name">{{ item.name }}</p>
      </div>

      <template #overlay>
        <a-menu>
          <a-menu-item key="1">打开</a-menu-item>
          <a-menu-item key="2">编辑</a-menu-item>
          <a-menu-item key="3">删除</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const iconList = ref([
  {
    name: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
    url: "https://www.bilibili.com/",
    icon: "https://static.hdslb.com/mobile/img/512.png",
  },
  {
    name: "知乎",
    url: "https://www.zhihu.com/",
    icon: "https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.8f6c52aa.png",
  },
  {
    name: "掘金",
    url: "https://juejin.cn/",
    icon: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png",
  },
  {
    name: "腾讯视频",
    url: "https://film.qq.com/",
    icon: "https://v.qq.com/favicon.ico",
  },
  {
    name: "网易云音乐",
    url: "https://music.163.com/",
    icon: "http://p3.music.126.net/tBTNafgjNnTL1KlZMt7lVA==/18885211718935735.jpg",
  },
]);

const getIconUrl = (value: string) => {
  return "https://api.btstu.cn/getfav/api.php?url=" + value;
};

const gotoUrl = (link: string, self: boolean = false) => {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "http://" + link;
  }
  if (self) {
    window.location.href = link;
  } else {
    window.open(link);
  }
};
</script>

<style lang="less" scoped>
.desktop {
  display: flex;
  flex-direction: column;

  &-item {
    width: 90px;
    padding: 16px 5px 0;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 4px;
    }

    &__name {
      display: -webkit-box;
      height: 44px;
      overflow: hidden;
      text-emphasis: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
