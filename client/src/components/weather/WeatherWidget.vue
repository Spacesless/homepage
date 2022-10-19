<template>
  <div class="weather">
    <AppWidget :close-key="WidgetShow.weather">
      <div id="he-plugin-simple"></div>
    </AppWidget>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppWidget from '@/components/AppWidget.vue'
import { WidgetShow } from '@/types/enums'

window.WIDGET = {
  CONFIG: {
    modules: '01234',
    background: '1',
    tmpColor: 'FFFFFF',
    tmpSize: '16',
    cityColor: 'FFFFFF',
    citySize: '16',
    aqiColor: 'FFFFFF',
    aqiSize: '16',
    weatherIconSize: '24',
    alertIconSize: '18',
    padding: '10px 10px 10px 10px',
    shadow: '0',
    language: 'auto',
    fixed: 'false',
    vertical: 'top',
    horizontal: 'left',
    key: '8a1715a9968f4ceab89ff21952e09182'
  }
}

const loadJs = () => {
  const sdkEl = document.querySelector('#js-weather')
  if (sdkEl) {
    document.body.removeChild(sdkEl)
  }

  const scriptElement = document.createElement('script')
  scriptElement.id = 'js-weather'
  scriptElement.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'

  document.body.appendChild(scriptElement)
}

onMounted(() => {
  loadJs()
})
</script>

<style lang="less" scoped>
.weather {
  position: relative;
  z-index: 1;
  width: 100%;
}
</style>
