export const getAllGames = () => {
    return fetch("http://localhost:8088/games?_embed=gameGenres&_expand=type").then(res => res.json())
}

export const createUserGame = (userGameObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userGameObject)
    }

    return fetch(`http://localhost:8088/userGames`, postOptions)
}

export const deleteUserGame = (userGameId) => {
    const deleteOptions = {
        method: "DELETE"
    }

    return fetch(`http://localhost:8088/userGames/${userGameId}`, deleteOptions)
}