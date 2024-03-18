export const getAllGroups = () => {
    return fetch("http://localhost:8088/groups?_embed=userGroups").then(res => res.json())
}

export const createUserGroup = (newUserGroup) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserGroup)
    }

    return fetch("http://localhost:8088/userGroups", postOptions)
}

export const deleteUserGroup = (userGroupId) => {
    const deleteOptions = {
        method: "DELETE"
    }

    return fetch(`http://localhost:8088/userGroups/${userGroupId}`, deleteOptions)
}