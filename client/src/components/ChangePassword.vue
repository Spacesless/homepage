<template>
  <a-modal
    v-model:visible="visible"
    :width="400"
    :centered="true"
    :mask-closable="false"
    :footer="null"
    @cancel="handleClose"
  >
    <h1 class="change__title">修改密码</h1>
    <a-form class="change" :model="formState" autocomplete="off" @finish="handlechange">
      <a-form-item name="oldPassword" :rules="[{ required: true, message: '请输入原密码' }]">
        <a-input-password v-model:value="formState.oldPassword" placeholder="请输入原密码" size="large" />
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, message: '请输入至少6位字符' }
        ]"
      >
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" size="large" />
      </a-form-item>

      <a-form-item name="againPassword" :rules="againRule">
        <a-input-password v-model:value="formState.againPassword" placeholder="请再次输入密码" size="large" />
      </a-form-item>

      <a-form-item>
        <a-button class="change__button" type="primary" size="large" html-type="submit">修改</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import md5 from 'md5'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useUserStore } from '@/store/user'
import { ChangePassword } from '@/api/user'

interface FormState {
  oldPassword: string
  password: string
  againPassword: string
}

const userStore = useUserStore()

const props = defineProps({
  modelVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelVisible'])

const formState = reactive<FormState>({
  oldPassword: '',
  password: '',
  againPassword: ''
})
const changeLoading = ref<boolean>(false)

let validatePass2 = async (_rule: Rule, value: string) => {
  if (value !== formState.password) {
    return Promise.reject('两次输入的密码不一致')
  } else {
    return Promise.resolve()
  }
}
const againRule = reactive([
  { required: true, message: '请再次输入密码' },
  { validator: validatePass2, trigger: 'change' }
])

const visible = computed(() => props.modelVisible)

const handleClose = () => {
  emit('update:modelVisible', false)
}

const handlechange = async () => {
  changeLoading.value = true
  await ChangePassword({
    oldPassword: md5(formState.oldPassword),
    password: md5(formState.password)
  })
    .then(res => {
      message.success('修改密码成功，请重新登录')
      userStore.$patch({
        userId: 0,
        username: ''
      })
      emit('update:modelVisible', false)
    })
    .catch(() => {
      message.error({
        key: 'fail',
        content: '修改密码失败'
      })
    })
  changeLoading.value = false
}
</script>

<style lang="less" scoped>
.change {
  &__title {
    margin-top: 16px;
    margin-bottom: 32px;
  }

  &__button {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>
