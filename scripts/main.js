import { checkAuthState, configure, checkRedirect } from "./auth/init.js"


window.onload = async () => {
    await configure().then(checkAuthState).then((isAuth) => {
        if (isAuth) {
            return true
        }
        checkRedirect()
    })
}
