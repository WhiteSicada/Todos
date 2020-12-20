<template>
  <div>
    <div>
      <TodoList />
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList"
export default {
  components : {
    TodoList
  },
  middleware: 'notAuthenticated',
}
</script>

<style>

</style>
