import { Box } from "@mui/material"
import { Game } from "./Game.jsx"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"
import { FilterBar } from "./FilterBar.jsx"

export const Games = ({ currentUser }) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])

    useEffect(() => {
        getAllGames().then(gamesArray => {
            setGames(gamesArray)
        })
    }, [])

    useEffect(() => {
        const sortedGames = games.sort((firstGame, secondGame) => {
            const firstGameName = firstGame.name.toUpperCase()
            const secondGameName = secondGame.name.toUpperCase()

            if (firstGameName < secondGameName) {
                return -1
            } else if (firstGameName > secondGameName) {
                return 1
            } else {
                return 0
            }
        })

        setGames(sortedGames)
        
        setFilteredGames(games)
    }, [games])
    
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <FilterBar games={games} setFilteredGames={setFilteredGames} currentUser={currentUser} />
            <Box 
                display={"flex"} 
                justifyContent={"center"}
                flexDirection={"row"} 
                flexWrap={"wrap"} 
                gap={4}
            >
                {filteredGames.map(game => {
                    return <Game game={game} currentUser={currentUser} key={game.id} />
                })}
            </Box>
        </Box>
    )
}