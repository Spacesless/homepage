<template>
  <div class="task-bar">
    <a-avatar :size="24">
      <template #icon><UserOutlined /></template>
    </a-avatar>
  </div>

  <UserLogin />
</template>

<script lang="ts" setup>
import UserLogin from '@/components/UserLogin'
</script>
