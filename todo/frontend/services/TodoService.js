import axios from 'axios'


const ApiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: false,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
    }
})


export default {
    getTodos() {
        return ApiClient.get('/todos/')
    },
    getTodo(id) {
        return ApiClient.get('/todos/' + id)
    },
    getNofications(id) {
        return ApiClient.get('/List-all-notifications/' + id)
    },
}