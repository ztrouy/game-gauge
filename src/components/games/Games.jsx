import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"
import { FilterBar } from "./FilterBar.jsx"
import { GameList } from "./GameList.jsx"

export const Games = ({ currentUser }) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])

    useEffect(() => {
        getAllGames().then(gamesArray => {
            setGames(gamesArray)
        })
    }, [])

    
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <FilterBar games={games} setFilteredGames={setFilteredGames} currentUser={currentUser} />
            <GameList games={games} setGames={setGames} filteredGames={filteredGames} setFilteredGames={setFilteredGames} currentUser={currentUser} />
        </Box>
    )
}