const eventHub = document.querySelector(".container")

const authConfig = {
    "domain": "learningplatform.auth0.com",
    "clientId": "AXR1znslJto1oI2fBrPuw1d2wuqsmzLr"
}

let auth0 = null

export const userAuthenticated = () => {
    return localStorage.getItem("platform_profile")
}

const parseQuery = (queryString) => {
    const query = {}
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
    }
    return query
}

export const checkRedirect = () => {
    console.log("checkRedirect")
    // NEW - check for the code and state parameters
    const query = window.location.search
    if (query.includes("code=") && query.includes("state=")) {

        console.log(parseQuery(query))

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
        const token = await auth0.getTokenWithPopup({
            audience: "https://platform.nss.team",
            scope: "read:user"
        });
        // const token = await auth0.getTokenSilently()
        const user = await auth0.getUser()
        const claims = await auth0.getIdTokenClaims()
        debugger

        localStorage.setItem(
            "platform_profile",
            JSON.stringify({ token, user })
        )

        eventHub.dispatchEvent(
            new CustomEvent("userAuthenticated", {
                detail: { token, user }
            })
        )

    }
}

eventHub.addEventListener("githubAuthInitiated", e => {
    login()
})

const login = async () => {
    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    })
}

eventHub.addEventListener("logoutInitiated", e => {
    logout()
})

const logout = () => {
    localStorage.removeItem("platform_profile")
    auth0.logout({
        returnTo: window.location.origin
    })
}
