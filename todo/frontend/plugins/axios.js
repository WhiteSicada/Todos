export default function({ $axios, store, redirect }) {
    // console.log('AXIOS PLUGIN LOADED');

    $axios.onRequest(request => {
        console.log('[ REQUEST ]' + request.url)
        if (store.state.auth.token) {
            request.headers.common['Authorization'] = 'Token ' + store.state.auth.token;
        }

        return request
    })

    $axios.onResponse(response => {
        console.log('[ RESPONSE ]' + response.request.responseURL, response)
            // TODO: If token expires, perform a silent refresh

        return response
    })

    $axios.onError(error => {
        console.error('[ ERROR ]', error)
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            store.state.auth.token = null
            return redirect('/')
        }

        return error
    })
}