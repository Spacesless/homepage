<template>
  <a-dropdown :trigger="['contextmenu']">
    <div>
      <slot />
    </div>

    <template #overlay>
      <a-menu>
        <a-menu-item key="close" @click="handleClose">关闭</a-menu-item>
        <!-- <a-menu-item v-if="props.isShowConfig" key="refresh">设置</a-menu-item> -->
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/setting'
import { WidgetShow } from '@/types/enums'

interface Props {
  closeKey: WidgetShow
  isShowConfig?: boolean
}

const settingStore = useSettingStore()

const props = withDefaults(defineProps<Props>(), {
  isShowConfig: false
})

const emit = defineEmits(['handleConfig'])

const handleClose = () => {
  settingStore[props.closeKey] = false
}
</script>
