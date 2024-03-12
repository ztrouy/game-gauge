export const getAllGames = () => {
    return fetch("http://localhost:8088/games?_embed=gameGenres&_expand=type").then(res => res.json())
}