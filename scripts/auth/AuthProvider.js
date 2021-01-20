export const useProfile = () => JSON.parse(localStorage.getItem("platform_profile"))

const platformLogin = (profile) => {
    return fetch(`http://localhost:8000/login/${profile.user.nickname}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: profile.user.name.split(" ")[0],
            last_name: profile.user.name.split(" ")[1],
            github_handle: profile.user.nickname,

        })
    })
}
