<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEditing" />
      <div
        class="todo-item-label"
        :class="{ completed : completed }"
        v-if="!editing"
        @dblclick="editTodo"
      >{{ title }}</div>
      <input
        class="todo-item-edit"
        v-else
        v-focus
        type="text"
        v-model="title"
        @blur="doneEditing"
        @keyup.enter="doneEditing"
        @keyup.esc="cancelEditing"
      />
    </div>
    <div>
        <span class="remove-item" @click="removeTodo(id)">&times;</span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ["todo", "index","checkAll"],
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEditCache': '',
    };
  },
  watch : {
      checkAll(){
          this.completed = this.checkAll ? true : this.todo.completed
      }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods : {
    removeTodo(id){
        this.$store.dispatch('Kika/removeTodo', id)
    },
    editTodo() {
        this.beforeEditCache = this.title;
        this.editing = true;
    },
    doneEditing() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.beforeEditCache = "";
      this.editing = false;
      this.$store.dispatch('Kika/updateTodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    },
    cancelEditing() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
  }
};
</script>

<style>
</style>