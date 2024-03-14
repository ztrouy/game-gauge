import { Box } from "@mui/material"
import { Game } from "./Game.jsx"
import { useEffect } from "react"

export const GameList = ({ games, setGames, filteredGames, setFilteredGames, user, fetchUserData, currentUser }) => {
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
        
        if (setFilteredGames) {
            setFilteredGames(games)
        }
    }, [games])
    
    return (
        <Box 
            display={"flex"} 
            justifyContent={"center"}
            flexDirection={"row"} 
            flexWrap={"wrap"} 
            gap={4}
        >
            {filteredGames.map(game => {
                return <Game game={game} user={user} fetchUserData={fetchUserData} currentUser={currentUser} key={game.id} />
            })}
        </Box>
    )
}