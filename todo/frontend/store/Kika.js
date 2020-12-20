export const state = () => ({
    filter: "all",
    todos: [],
})

export const getters = {
    remaining(state) {
        return state.todos.filter((todo) => !todo.completed).length
    },
    anyRemaining(state, getters) {
        return getters.remaining != 0;
    },
    todosFiltered(state) {
        switch (state.filter) {
            case "active":
                return state.todos.filter((todo) => !todo.completed)
            case "completed":
                return state.todos.filter((todo) => todo.completed)
            case "all":
                return state.todos
            default:
                return state.todos
        }
    },
    ShowClearComputedButton(state) {
        return state.todos.filter((todo) => todo.completed).length > 0
    },
}

export const mutations = {
    addTodo(state, todo) {
        state.todos.push({
            id: todo.id,
            title: todo.title,
            completed: false,
            editing: false,
        })
    },
    removeTodo(state, id) {
        const index = state.todos.findIndex(item => item.id == (id))
        state.todos.splice(index, 1)
    },
    updateTodo(state, todo) {
        const index = state.todos.findIndex(item => item.id == (todo.id))
        state.todos.splice(index, 1, {
            'id': todo.id,
            'title': todo.title,
            'completed': todo.completed,
            'editing': todo.editing,
        })
    },
    updateFilter(state, filter) {
        state.filter = filter
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(todo => !todo.completed)
    },
    checkAll(state, checked) {
        state.todos.forEach(todo => (todo.completed = checked))
    },
    RetreiveAllTodos(state, todos) {
        state.todos = todos
    },
    clearTodos(state) {
        state.todos = []
    }
}


export const actions = {
    addTodo({ commit }, todo) {
        this.$axios.$post('/todos/', {
                title: todo.title,
                completed: todo.completed
            }).then(response => {
                commit('addTodo', response);
            })
            .catch(error => { console.log(error) })
    },
    removeTodo({ commit }, id) {
        this.$axios.$delete(`/todos/${id}/`).then(response => {
                commit('removeTodo', id);
            })
            .catch(error => { console.log(error) })
    },
    updateTodo({ commit }, todo) {
        this.$axios.$patch(`/todos/${todo.id}/`, {
            title: todo.title,
            completed: todo.completed
        }).then(response => {
            commit('updateTodo', response);
        })
    },
    updateFilter({ commit }, filter) {
        commit('updateFilter', filter)
    },
    clearCompleted({ commit }) {
        this.$axios.$delete('ClearCompleted/').then(response => {
            commit('clearCompleted');
        })

    },
    checkAll({ commit }, checked) {
        this.$axios.$put('CheckAll/' + checked + '/').then(response => {
            commit('checkAll', checked);
        })
    },
    RetreiveAllTodos({ commit }) {
        this.$axios.$get('/todos/').then(response => {
                commit('RetreiveAllTodos', response);
            })
            .catch(error => { console.log(error) })
    },
    clearTodos({ commit }) {
        commit('clearTodos')
    }
}