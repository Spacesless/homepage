<template>
  <div class="taskBar">
    <div class="taskBar-user">
      <a-dropdown :disabled="!userStore.userId">
        <div class="taskBar-user-dropdown" @click="handleLogin">
          <UserOutlined />
          <span class="taskBar-user-dropdown__text">{{ userStore.username || '登录' }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>同步配置</a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="handleLogout">退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>

  <UserLogin v-model:modelVisible="loginVisible" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserLogin from '@/components/UserLogin.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const loginVisible = ref<boolean>(false)

const handleLogin = () => {
  if (userStore.userId) {
    return
  }

  loginVisible.value = true
}

const handleLogout = () => {
  userStore.logout()
}
</script>

<style lang="less" scoped>
@task-height: 30px;

.taskBar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: @task-height;
  // background-color: rgba(#ffffff, 0.05);
  // box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, 0.16), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),
  //   0 -12px 48px 16px rgba(0, 0, 0, 0.03);
  // backdrop-filter: blur(5px);

  &-user {
    position: absolute;
    right: 10px;
    bottom: 6px;
    color: #ffffff;

    &-dropdown {
      cursor: pointer;

      &__text {
        margin-left: 4px;
        font-size: 12px;
        vertical-align: text-bottom;
      }
    }

    .anticon {
      font-size: 16px;
    }
  }
}
</style>
