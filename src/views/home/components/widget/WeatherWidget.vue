<script setup lang="ts">
import { onMounted } from "vue";

window.WIDGET = {
  CONFIG: {
    modules: "01234",
    background: "1",
    tmpColor: "FFFFFF",
    tmpSize: "16",
    cityColor: "FFFFFF",
    citySize: "16",
    aqiColor: "FFFFFF",
    aqiSize: "16",
    weatherIconSize: "24",
    alertIconSize: "18",
    padding: "10px 10px 10px 10px",
    shadow: "0",
    language: "auto",
    fixed: "false",
    vertical: "top",
    horizontal: "left",
    key: "8a1715a9968f4ceab89ff21952e09182",
  },
};

const loadJs = () => {
  if (document.querySelector("#js-weather")) {
    return;
  }

  const scriptElement = document.createElement("script");
  scriptElement.id = "js-weather";
  scriptElement.src =
    "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";

  document.body.appendChild(scriptElement);
};

onMounted(() => {
  loadJs();
});
</script>

<template>
  <div id="he-plugin-simple" class="weather"></div>
</template>

<style lang="less" scoped>
.weather {
  width: 250px;
}
</style>
