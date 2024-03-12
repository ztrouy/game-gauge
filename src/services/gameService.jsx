export const getAllGames = () => {
    return fetch("http://localhost:8088/games").then(res => res.json())
}