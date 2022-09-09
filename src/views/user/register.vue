<template>
  <div class="register">
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="handleRegister"
    >
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="密保问题" name="question" :rules="[{ required: true, message: '请输入密保问题' }]">
        <a-input v-model:value="formState.question" />
      </a-form-item>

      <a-form-item label="密保答案" name="answer" :rules="[{ required: true, message: '请输入密保答案' }]">
        <a-input v-model:value="formState.answer" />
      </a-form-item>

      <a-form-item label="密保提示" name="tips" :rules="[{ required: true, message: '请输入密保提示' }]">
        <a-input v-model:value="formState.tips" />
      </a-form-item>

      <a-button type="primary" html-type="submit">确定</a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

interface FormState {
  username: string
  password: string
  question: string
  answer: string
  tips: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  question: '',
  answer: '',
  tips: ''
})

const handleRegister = () => {}
</script>
