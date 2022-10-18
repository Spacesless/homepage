<template>
  <a-modal v-model:visible="visible" title="图标设置" :centered="true" @cancel="handleClose" @ok="handleConfirm">
    <a-form ref="formRef" :model="formState" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="网站名称" name="name" :rules="[{ required: true, message: '请输入网站名称' }]">
        <a-input v-model:value="formState.name" placeholder="请输入网站名称" />
      </a-form-item>
      <a-form-item
        label="网址"
        name="url"
        :rules="[
          { required: true, message: '请输入网址' },
          { type: 'url', message: '请输入正确的网址' }
        ]"
      >
        <a-input v-model:value="formState.url" placeholder="请输入网址" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { useSettingStore, Icon } from '@/store/setting'

const settingStore = useSettingStore()

const formRef = ref<FormInstance>()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  },
  editIndex: {
    type: Number,
    default: -1
  }
})
const emit = defineEmits(['update:modelVisible'])

const formState = reactive<Icon>({
  name: '',
  url: ''
})

const visible = computed(() => props.modelVisible)

watch(visible, isShow => {
  if (isShow) {
    const editIcon = settingStore.desktopIcon[props.editIndex] || {}
    formState.name = editIcon?.name || ''
    formState.url = editIcon?.url || ''
  }
})

const handleConfirm = async () => {
  await formRef.value?.validateFields()
  settingStore.desktopIcon[props.editIndex] = { ...formState }

  emit('update:modelVisible', false)
}

const handleClose = () => {
  emit('update:modelVisible', false)
}
</script>
