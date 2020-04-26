const eventHub = document.querySelector(".container")

const authConfig = {
    "domain": "learningplatform.auth0.com",
    "clientId": "AXR1znslJto1oI2fBrPuw1d2wuqsmzLr"
}

let auth0 = null

export const userAuthenticated = () => {
    return localStorage.getItem("platform_profile")
}

export const checkRedirect = () => {
    console.log("checkRedirect")
    // NEW - check for the code and state parameters
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {

        // Process the login state
        auth0.handleRedirectCallback().then(() => {
            checkAuthState()

            // Use replaceState to redirect the user away and remove the querystring parameters
            window.history.replaceState({}, document.title, "/")
        })
    }
}

export const configure = async () => {
    console.log("configure")
    auth0 = await createAuth0Client({
        domain: authConfig.domain,
        client_id: authConfig.clientId
    })
}

export const checkAuthState = async () => {
    const isAuthenticated = await auth0.isAuthenticated()

    if (isAuthenticated) {
        const token = await auth0.getTokenSilently()
        const user = await auth0.getUser()

        localStorage.setItem(
            "platform_profile",
            JSON.stringify({ token, user })
        )

        eventHub.dispatchEvent(
            new CustomEvent("userAuthenticated", {
                detail: { token,user }
            })
        )
    }
}

eventHub.addEventListener("githubAuthInitiated", e => {
    login()
})

export const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    })
}

const logout = () => {
    auth0.logout({
        returnTo: window.location.origin
    })
}
