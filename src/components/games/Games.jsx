import { Box, Grid } from "@mui/material"
import { Game } from "./Game.jsx"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"

export const Games = ({ currentUser }) => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getAllGames().then(gamesArray => {
            setGames(gamesArray)
        })
    }, [])
    
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box 
                display={"flex"} 
                justifyContent={"center"}
                flexDirection={"row"} 
                flexWrap={"wrap"} 
                gap={4}
            >
                {games.map(game => {
                    return <Game game={game} currentUser={currentUser} key={game.id} />
                })}
            </Box>
        </Box>
    )
}