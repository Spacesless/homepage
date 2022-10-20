<template>
  <BoxAnimation />

  <div class="forgot">
    <h1 class="forgot__title">找回密码</h1>

    <a-steps :current="step" class="forgot-steps" size="small">
      <a-step title="验证用户名" />
      <a-step title="密保问题验证" />
      <a-step title="重置密码" />
    </a-steps>

    <!-- 验证用户名 -->
    <a-form v-if="step === 0" :model="usernameForm" layout="vertical" autocomplete="off" @finish="checkUsername">
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="usernameForm.username" size="large" placeholder="请输入用户名"></a-input>
      </a-form-item>

      <a-button type="primary" class="forgot-button" size="large" html-type="submit">下一步</a-button>
    </a-form>

    <!-- 密保问题验证 -->
    <a-form v-else-if="step === 1" :model="answerForm" layout="vertical" autocomplete="off" @finish="checkAnswer">
      <a-form-item label="密保问题" name="question">
        <a-input v-model:value="answerForm.question" readonly></a-input>
      </a-form-item>

      <a-form-item label="答案" name="answer" :rules="[{ required: true, message: '请输入答案' }]">
        <a-input v-model:value="answerForm.answer"></a-input>
      </a-form-item>

      <a-form-item v-if="tip" label="提示">{{ tip }}</a-form-item>

      <a-button type="primary" class="forgot-button" size="large" html-type="submit">下一步</a-button>
    </a-form>

    <!-- 重置密码 -->
    <a-form
      v-else-if="step === 2"
      class="reset"
      :model="resetForm"
      layout="vertical"
      autocomplete="off"
      @finish="resetPassword"
    >
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="resetForm.password" placeholder="请输入密码" />
      </a-form-item>

      <a-form-item label="确认密码" name="againPassword" :rules="[{ required: true, message: '请再次输入密码' }]">
        <a-input-password v-model:value="resetForm.againPassword" placeholder="请再次输入密码" />
      </a-form-item>

      <a-button type="primary" class="forgot-button" size="large" html-type="submit">重置密码</a-button>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import md5 from 'md5'
import { CheckUsername, CheckAnswer, ResetPassword } from '@/api/user'
import BoxAnimation from './components/BoxAnimation.vue'

interface ResetForm {
  password: string
  againPassword: string
}

const step = ref<number>(0)
const username = ref<string>('')
const answer = ref<string>('')
const responseId = ref<string>('')
const tip = ref<string>('')
const checkUsernameLoading = ref<boolean>(false)
const checkAnswerLoading = ref<boolean>(false)
const resetLoading = ref<boolean>(false)

const usernameForm = reactive({
  username: ''
})

const answerForm = reactive({
  question: '',
  answer: ''
})

const resetForm = reactive<ResetForm>({
  password: '',
  againPassword: ''
})

const checkUsername = async () => {
  checkUsernameLoading.value = true
  await CheckUsername({ username: username.value })
    .then(res => {
      const { question } = res.data

      answerForm.question = question
    })
    .catch(({ msg }) => {
      msg &&
        message.error({
          key: 'fail',
          content: msg
        })
    })
  checkUsernameLoading.value = false
}

const checkAnswer = async () => {
  checkAnswerLoading.value = true
  await CheckAnswer({ answer: answer.value })
    .then(res => {
      responseId.value = res.data
    })
    .catch(({ msg, data }) => {
      msg &&
        message.error({
          key: 'fail',
          content: msg
        })

      tip.value = data.tip
    })
  checkAnswerLoading.value = false
}

const resetPassword = async () => {
  resetLoading.value = true
  await ResetPassword({
    responseId: responseId.value,
    password: md5(resetForm.password)
  })
    .then(res => {
      message.success({
        key: 'success',
        content: '密码重置成功，请重新登录'
      })
    })
    .catch(({ msg }) => {
      msg &&
        message.error({
          key: 'fail',
          content: msg
        })
    })
  resetLoading.value = false
}
</script>

<style lang="less">
.forgot {
  position: absolute;
  top: 50%;
  left: 30%;
  width: 40%;
  transform: translateY(-50% - 50px);

  &-steps {
    margin-bottom: 32px;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 30px;
  }

  &-button {
    width: 100%;
    margin-top: 24px;
  }
}
</style>
