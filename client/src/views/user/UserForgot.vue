<template>
  <BoxAnimation />
  <div class="forgot">
    <div v-if="step === 'username'" class="username">
      <a-input v-model:value="username"></a-input>
    </div>

    <div v-else-if="step === 'check'" class="check">
      <a-input v-model:value="answer"></a-input>
    </div>

    <a-form
      v-else-if="step === 'reset'"
      class="reset"
      :model="resetForm"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model:value="resetForm.password" />
      </a-form-item>

      <a-form-item label="确认密码" name="againPassword" :rules="[{ required: true, message: '请再次输入密码' }]">
        <a-input-password v-model:value="resetForm.againPassword" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { CheckUsername, CheckAnswer, ResetPassword } from '@/api/user'
import BoxAnimation from './components/BoxAnimation.vue'

const step = ref<string>('username')
const username = ref<string>('')
const answer = ref<string>('')
const responseId = ref<string>('')

interface ResetForm {
  password: string
  againPassword: string
}

const resetForm = reactive<ResetForm>({
  password: '',
  againPassword: ''
})

const checkUsername = () => {
  CheckUsername({ username: username.value })
    .then(res => {})
    .catch(() => {})
}

const checkAnswer = () => {
  CheckAnswer({ answer: answer.value })
    .then(res => {
      responseId.value = res.data
    })
    .catch(() => {})
}

const resetPassword = () => {
  ResetPassword({
    responseId: responseId.value,
    password: resetForm.password
  })
    .then(res => {
      responseId.value = res.data
    })
    .catch(() => {})
}
</script>
