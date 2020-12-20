export const state = () => ({
    token: null,
    user: {},
})

export const getters = {
    loggedIn(state) {
        return state.token != null
    },
    CurrentUser(state) {
        return state.user
    }
}

export const mutations = {
    retrieveToken(state, token) {
        state.token = token
    },
    destroyToken(state) {
        state.token = null
    },
    setUser(state, user) {
        state.user = user
    }
}


export const actions = {
    retrieveToken({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('/login/', {
                username: credentials.username,
                password: credentials.password,
            }).then(response => {
                if (response.token) {
                    const token = response.token
                    localStorage.setItem('token', token)
                    commit('retrieveToken', token)
                    resolve(response)
                } else if (response.Error) {
                    reject(response.Error)
                }
            })
        })
    },
    destroyToken({ commit }) {
        if (getters.loggedIn) {
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "token " + localStorage.getItem('token')
                },
            };
            return new Promise((resolve, reject) => {
                this.$axios.$post('/logout/', {}).then(response => {
                        localStorage.removeItem('token')
                        commit('destroyToken');
                        resolve(response)
                    })
                    .catch(error => {
                        localStorage.removeItem('token')
                        commit('destroyToken');
                        reject(error)
                    })
            })
        }
    },
    register({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            this.$axios.$post('/register/', {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password,
                }).then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    setUser({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.$get('/me/').then(response => {
                    commit('setUser', response);
                    resolve(response)
                })
                .catch(error => { reject(error) })
        })
    }
}