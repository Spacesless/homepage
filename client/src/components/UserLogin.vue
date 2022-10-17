<template>
  <a-modal
    v-model:visible="visible"
    :width="400"
    :centered="true"
    :mask-closable="false"
    :footer="null"
    @cancel="handleClose"
  >
    <h1 class="login__title">用户登录</h1>
    <a-form class="login" :model="formState" autocomplete="off" @finish="onFinish">
      <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" placeholder="请输入用户名" size="large" />
      </a-form-item>

      <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" size="large" />
      </a-form-item>

      <a-form-item>
        <div class="login-links">
          <router-link to="/register" target="_blank">去注册>></router-link>
          <router-link to="/forgot" target="_blank">忘记密码?</router-link>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button class="login__button" type="primary" size="large" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import md5 from 'md5'
import { useUserStore } from '@/store/user'

interface FormState {
  username: string
  password: string
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
  username: '',
  password: ''
})

const visible = computed(() => props.modelVisible)

const handleClose = () => {
  emit('update:modelVisible', false)
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const handleLogin = () => {
  userStore.login({
    username: '',
    password: md5('')
  })
}
</script>

<style lang="less" scoped>
.login {
  &__title {
    margin-top: 16px;
    margin-bottom: 32px;
  }

  &-links {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
