export const getAllGames = () => {
    return fetch("http://localhost:8088/games?_embed=gameGenres&_expand=type").then(res => res.json())
}

export const getGameById = (gameId) => {
    return fetch(`http://localhost:8088/games?id=${gameId}&_embed=gameGenres`).then(res => res.json())
}

export const createGame = (gameObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameObject)
    }

    return fetch("http://localhost:8088/games", postOptions)
}

export const updateGame = (modifiedGameObject) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modifiedGameObject)
    }

    return fetch(`http://localhost:8088/games/${modifiedGameObject.id}`, putOptions)
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