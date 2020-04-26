export const Profile = () => {
    const profile = JSON.parse(localStorage.getItem("platform_profile"))
    return `
        <div class="profile">
            <h1 class="profile__header">${profile.user.name} Profile</h1>
            <div>
                <img class="profile__github profile__github--avatar" src="${profile.user.picture}" />
            </div>
            <div class="profile__github profile__github--username">
                <a target="_blank" href="https://github.com/${profile.user.nickname}">${profile.user.nickname}</a>
            </div>
            <div class="profile__github profile__github--email">
                ${profile.user.email}
            </div>
        </div>

    `
}