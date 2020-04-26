import { userAuthenticated } from "../auth/init.js"
import { Profile } from "./profile/Profile.js"
import { Login } from "./auth/Login.js"
import { eventHub } from "./dom.js"

eventHub.addEventListener("userAuthenticated", e => {
    render()
})

const render = () => {
    eventHub.innerHTML = `
        <section class="platform">
            ${
                (userAuthenticated())
                    ? Profile()
                    : Login()
            }
        </section>
    `
}

export const LearningPlatform = () => render()