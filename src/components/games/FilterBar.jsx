import { useEffect, useState } from "react"
import { getAllGameTypes } from "../../services/gameTypeService.js"
import { getAllGenres } from "../../services/genreService.js"

export const FilterBar = ({ games, setFilteredGames }) => {
    const [gameTypes, setGameTypes] = useState([])
    const [genres, setGenres] = useState([])
    
    const [gameTypeFilter, setGameTypeFilter] = useState(0)
    const [genreFilter, setGenreFilter] = useState(0)
    const [titleFilter, setTitleFilter] = useState("")

    useEffect(() => {
        getAllGameTypes().then(gameTypesArray => {
            setGameTypes(gameTypesArray)
        })
        getAllGenres().then(genresArray => {
            setGenres(genresArray)
        })
    }, [])

    // useEffect(() => {
    //     if (gameTypeFilter === 0) {
    //         setFilteredGames(games)
    //     } else {
    //         const filteredGamesList = games.filter(game => game.type.id === gameTypeFilter)
    //         setFilteredGames(filteredGamesList)
    //     }
    // }, [gameTypes, gameTypeFilter, games])

    // useEffect(() => {
    //     if (genreFilter === 0) {
    //         setFilteredGames(games)
    //     } else {
    //         const filteredGamesList = games.filter(game => game.gameGenres.find(genre => genre.genreId === genreFilter))
    //         setFilteredGames(filteredGamesList)
    //     }
    // }, [genres, genreFilter, games])

    return (
        <>Filter Bar</>
    )
}