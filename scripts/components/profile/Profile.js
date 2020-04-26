import { eventHub } from "../dom.js"

eventHub.addEventListener("click", e => {
    if (e.target.classList.contains("btn--logout")) {
        eventHub.dispatchEvent(
           new CustomEvent("logoutInitiated", {
               detail: {

               }
           })
        )
    }
})

export const Profile = () => {
    const profile = JSON.parse(localStorage.getItem("platform_profile"))
    return `
        <div class="profile">
            <div>
                <img class="profile__github profile__github--avatar" src="${profile.user.picture}" />
            </div>
            <div class="profile__github profile__github--username">
                <a target="_blank" href="https://github.com/${profile.user.nickname}">${profile.user.nickname}</a>
            </div>
            <div class="profile__github profile__github--email">
                ${profile.user.email}
            </div>
            <fieldset>
                <label for="slackHandle">Slack handle</label>
                <input type="text" name="slackHandle" placeholder="Enter slack handle" value="${profile.user.slackHandle || ""}">
            </fieldset>
        </div>
        <button class="btn--link btn--logout">Logout</button>
    `
}