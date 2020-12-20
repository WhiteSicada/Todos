<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="what needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <TodoItem
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      ></TodoItem>
    </transition-group>
    <div class="extra-container">
      <TodoCheckAll  />
      <TodoItemsRemaining />
    </div>
    <div class="extra-container">
      <TodoFiltered />

      <div>
        <transition name="fade">
          <button v-if="ShowClearComputedButton" @click="ClearComputed">Clear Computed</button>*
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import TodoItemsRemaining from "@/components/TodoItemsRemaining";
import TodoCheckAll from "@/components/TodoCheckAll";
import TodoFiltered from "@/components/TodoFiltered";
export default {
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
    };
  },
  created() {
    this.$store.dispatch('Kika/RetreiveAllTodos')
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.$store.dispatch('Kika/addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    ClearComputed() {
      this.$store.dispatch('Kika/clearCompleted')
    },

  },
  computed: {
    anyRemaining() {
        return this.$store.getters['Kika/anyRemaining']
    },
    todosFiltered() {
        return this.$store.getters['Kika/todosFiltered']
    },
    ShowClearComputedButton() {
        return this.$store.getters['Kika/ShowClearComputedButton']
    },
  },
};
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  margin-left: 12px;
  padding: 10px;
  border: 1px solid white;
}

.todo-item-edit {
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  padding: 10px;
  width: 100%;
  margin-left: 12px;
  color: #2c3e50;
  font-size: 24px;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  font-size: 16px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>