<template>
  <div class="todo">
    <a-input v-model.value="newTodo" placeholder="What needs to be done?" allow-clear @keyup.enter="addTodo"></a-input>

    <ul class="todo-list">
      <li v-for="(item, index) in filterList" :key="index" class="todo-list-item">
        <a-checkbox v-model.value="item.completed"></a-checkbox>
        <a-input v-if="item.isEdit" v-model.value="item.title" allow-clear @blur="item.isEdit = false"></a-input>
        <span v-else @dbclick="editTodo(item)">{{ item.title }}</span>
        <close-outlined @click="deleteTodo(index)" />
      </li>
    </ul>

    <div v-if="todos.length" class="todo-tab">
      <span
        v-for="item in tabList"
        :key="item.value"
        class="todo-tab__item"
        :class="{ 'todo-tab__item--active': item.value === activeTab }"
        @click="changeTab(item.value)"
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

interface TodoItem {
  title: string
  completed: boolean
  isEdit: boolean
}

const todos = reactive<TodoItem>([])
const tabList = reactive([
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' }
])
const newTodo = ref<string>('')
const activeTab = ref<string>('all')

const filterList = computed(() => {
  if (activeTab.value === 'active') {
    return todos.filter(item => !item.completed)
  } else if (activeTab.value === 'completed') {
    return todos.filter(item => item.completed)
  }

  return [...todos]
})

const addTodo = () => {
  newTodo.value = ''
  todos.unshift({
    title: newTodo.value,
    isEdit: false,
    completed: false
  })
}

const deleteTodo = (index: number) => {
  todos.splice(index, 1)
}

const editTodo = () => {}

const changeTab = (key: string) => {
  activeTab.value = key
}
</script>

<style lang="less" scoped>
.todo {
  &-tab {
    text-align: center;
  }
}
</style>
