<template>
  <AppWidget :close-key="WidgetShow.todo">
    <div class="todo">
      <a-input
        v-model:value="newTodo"
        placeholder="What needs to be done?"
        allow-clear
        @press-enter="addTodo"
      ></a-input>

      <template v-if="todos.length">
        <ul class="todo-list">
          <li v-for="(item, index) in filterList" :key="index" class="todo-list-item">
            <a-checkbox v-model:checked="item.completed"></a-checkbox>
            <div class="todo-list-item-content">
              <a-input
                v-if="item.isEdit"
                v-model:value="item.title"
                size="small"
                @press-enter="cancelEditTodo(item)"
                @blur="cancelEditTodo(item)"
              ></a-input>
              <p v-else :class="{ 'todo-list-item__text--completed': item.completed }" @dblclick="editTodo(item)">
                {{ item.title }}
              </p>
            </div>
            <close-outlined class="todo-list-item__delete" @click="deleteTodo(index)" />
          </li>
        </ul>

        <div class="todo-tab">
          <span
            v-for="item in tabList"
            :key="item.value"
            class="todo-tab__item"
            :class="{ 'todo-tab__item--active': item.value === activeTab }"
            @click="changeTab(item.value)"
            >{{ item.label }}</span
          >
        </div>
      </template>
    </div>
  </AppWidget>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { debounce } from 'lodash'
import { getLocalStorage, setLocalStorage } from '@/utils'
import AppWidget from '@/components/AppWidget.vue'
import { WidgetShow } from '@/types/enums'

interface TodoItem {
  title: string
  completed: boolean
  isEdit: boolean
}

const storeTodo = getLocalStorage('todo')
const todos = reactive<Array<TodoItem>>(storeTodo || [])
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

const updateStore = debounce(data => {
  setLocalStorage('todo', data)
}, 200)
watch(todos, data => {
  updateStore(data)
})

const addTodo = () => {
  todos.push({
    title: newTodo.value,
    isEdit: false,
    completed: false
  })
  newTodo.value = ''
}

const deleteTodo = (index: number) => {
  todos.splice(index, 1)
}

const editTodo = (item: TodoItem) => {
  item.isEdit = true
}

const cancelEditTodo = (item: TodoItem) => {
  item.isEdit = false
}

const changeTab = (key: string) => {
  activeTab.value = key
}
</script>

<style lang="less" scoped>
.todo {
  padding: 12px;
  background-color: rgba(#ffffff, 0.5);
  border-radius: 4px;
  box-shadow: 0 6px 16px 8px rgba(0, 0, 0, 0.16), 0 9px 28px 0 rgba(0, 0, 0, 0.05), 0 12px 48px 16px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(5px);

  &-list {
    margin-top: 8px;

    &-item {
      display: flex;
      align-items: center;
      line-height: 24px;

      &-content {
        flex: 1;
        padding: 0 8px;
      }

      &__text {
        &--completed {
          color: rgba(#000000, 0.65);
          text-decoration: line-through;
        }
      }

      &__delete {
        opacity: 0;
        transition: all 0.3s;
      }

      &:hover &__delete {
        opacity: 1;
      }
    }
  }

  &-tab {
    margin-top: 8px;
    text-align: center;

    &__item {
      display: inline-block;
      margin: 0 6px;
      padding: 0 10px;
      color: rgba(black, 0.65);
      font-size: 12px;
      border: 1px solid transparent;
      border-radius: 2px;
      cursor: pointer;
      transition: border-color 0.3s;

      &--active,
      &:hover {
        border-color: @primary-color;
      }
    }
  }
}
</style>
