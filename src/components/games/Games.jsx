import { Box, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"
import { FilterBar } from "./FilterBar.jsx"
import { GameList } from "./GameList.jsx"
import { getUserById } from "../../services/userService.jsx"

export const Games = ({ currentUser }) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [user, setUser] = useState([])



    useEffect(() => {
        getAllGames().then(gamesArray => {
            setGames(gamesArray)
        })
    }, [])


    useEffect(() => {
        getUserById(currentUser.id).then(userArray => {
            const userObject = userArray[0]
            setUser(userObject)
        })
    }, [currentUser])

    

    return (
        <Container maxWidth={false}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <FilterBar 
                    games={games} 
                    setFilteredGames={setFilteredGames} 
                    user={user} 
                    />
                <GameList 
                    games={games} 
                    setGames={setGames} 
                    filteredGames={filteredGames} 
                    setFilteredGames={setFilteredGames} 
                    user={user} 
                    currentUser={currentUser} 
                />
            </Box>
        </Container>
    )
}