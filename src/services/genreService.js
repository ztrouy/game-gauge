export const getAllGenres = () => {
    return fetch("http://localhost:8088/genres").then(res => res.json())
}

export const getAllGameGenresByGameId = (gameId) => {
    return fetch(`http://localhost:8088/gameGenres?gameId=${gameId}`).then(res => res.json())
}

export const createGameGenre = (newGameGenre) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGameGenre)
    }

    return fetch(`http://localhost:8088/gameGenres`, postOptions)
}

export const deleteGameGenre = (gameGenreId) => {
    const deleteOptions = {
        method: "DELETE"
    }

    return fetch(`http://localhost:8088/gameGenres/${gameGenreId}`, deleteOptions)
}