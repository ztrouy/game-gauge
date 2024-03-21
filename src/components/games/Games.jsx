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
        if (currentUser.id) {
            fetchUserData()
        }
    }, [currentUser])

    

    const fetchUserData = () => {
        getUserById(currentUser.id).then(userObject => {
            setUser(userObject)
        })
    }



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
                    isCompact={false}
                    setGames={setGames} 
                    filteredGames={filteredGames} 
                    setFilteredGames={setFilteredGames} 
                    user={user} 
                    fetchUserData={fetchUserData}
                    currentUser={currentUser} 
                />
            </Box>
        </Container>
    )
}