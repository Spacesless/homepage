<template>
  <BoxAnimation />

  <div class="register">
    <a-form class="register-form" :model="formState" layout="vertical" autocomplete="off" @finish="handleRegister">
      <h1 class="register-form__title">用户注册</h1>

      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" size="large" placeholder="请输入用户名" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 6, message: '请输入至少6位字符' }
        ]"
      >
        <a-input-password v-model:value="formState.password" size="large" placeholder="请输入密码" />
      </a-form-item>

      <a-form-item label="密保问题" name="question" :rules="[{ required: true, message: '请输入密保问题' }]">
        <a-input v-model:value="formState.question" size="large" placeholder="请输入密保问题，用于找回密码" />
      </a-form-item>

      <a-form-item label="密保答案" name="answer" :rules="[{ required: true, message: '请输入密保答案' }]">
        <a-input v-model:value="formState.answer" size="large" placeholder="请输入密保答案" />
      </a-form-item>

      <a-form-item label="密保提示" name="tip" :rules="[{ required: true, message: '请输入密保提示' }]">
        <a-input v-model:value="formState.tip" size="large" placeholder="请输入密保提示" />
      </a-form-item>

      <a-button class="register-form__button" type="primary" size="large" html-type="submit">确定</a-button>
    </a-form>

    <router-link class="register-link" to="/">已有账号，去登录>></router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import md5 from 'md5'
import { Register, RegisterParams } from '@/api/user'
import BoxAnimation from './components/BoxAnimation.vue'

const formState = reactive<RegisterParams>({
  username: '',
  password: '',
  question: '',
  answer: '',
  tip: ''
})
const registerLoading = ref<boolean>(false)

const handleRegister = async () => {
  const { username, password } = formState
  const sendData = {
    ...formState,
    username: username.trim(),
    password: md5(password)
  }

  registerLoading.value = true
  await Register(sendData)
    .then(res => {
      message.success('用户注册成功，请前往登录')
    })
    .catch(({ msg }) => {
      msg && message.error(msg)
    })
  registerLoading.value = false
}
</script>

<style lang="less" scoped>
.register {
  &-form {
    position: absolute;
    top: 50%;
    left: 30%;
    width: 40%;
    margin-top: -350px;

    &__button {
      width: 100%;
      margin-top: 24px;
    }

    &__title {
      margin-bottom: 24px;
      font-size: 30px;
    }
  }

  &-link {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>
