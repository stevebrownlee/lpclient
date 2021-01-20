import { checkAuthState, configure, checkRedirect } from "./auth/init.js"
import { LearningPlatform } from "./components/LearningPlatform.js"
import "./components/dom.js"


window.onload = async () => {
    await configure().then(checkAuthState).then((isAuth) => {
        if (!isAuth) {
            checkRedirect()
        }
        LearningPlatform()
    })
}
