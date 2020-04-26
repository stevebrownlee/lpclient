import { eventHub } from "../dom.js"

eventHub.addEventListener("submit", e => {
    if (e.target.classList.contains("form--login")) {
        e.preventDefault()
        eventHub.dispatchEvent(
            new CustomEvent("githubAuthInitiated")
        )
    }
})

export const Login = () => `
    <div class="container--login">
        <form class="form--login">
            <h2>Please sign in</h2>
            <button class="btn btn--login">Log In With Github</button>
        </form>
    </div>
`
