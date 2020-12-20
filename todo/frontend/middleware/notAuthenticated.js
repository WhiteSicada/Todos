export default function({ store, redirect }) {
    // Si l'utilisateur n'est pas authentifié
    if (!store.getters['auth/loggedIn']) {
        return redirect('/Login')
    }
}