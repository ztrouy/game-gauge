import { Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"
import { GameList } from "../games/GameList.jsx"
import { useParams } from "react-router"
import { getUserById } from "../../services/userService.jsx"

export const Profile = ({ currentUser }) => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [profileUser, setProfileUser] = useState({})



    const { userId } = useParams()



    useEffect(() => {
        fetchUserData()
    }, [currentUser, userId])


    useEffect(() => {
        getAllGames().then(gamesArray => {
            setGames(gamesArray)
        })
    }, [])
    

    useEffect(() => {
        const ownedGames = games.filter(game => profileUser?.userGames.find(userGame => userGame.gameId === game.id))
        setFilteredGames(ownedGames)
    }, [games, profileUser])



    const fetchUserData = () => {
        let profileId = ""
        
        if (userId) {
            profileId = userId
        } else {
            profileId = currentUser.id
        }

        getUserById(profileId).then(userArray => {
            const userObject = userArray[0]
            setProfileUser(userObject)
        })
    }



    return (
        <Container>
            <Paper sx={{mt: 3, mb: 3}}>
                <Typography variant="h3" fontWeight={"bold"} textAlign={"left"} padding={2}>
                    {profileUser?.name}
                </Typography>
            </Paper>
            <Typography fontWeight={"bold"} textAlign={"left"}>{profileUser?.name}'s Game Library</Typography>
            <GameList games={games} setGames={setGames} filteredGames={filteredGames} setFilteredGames={setFilteredGames} user={profileUser} fetchUserData={fetchUserData} currentUser={currentUser} />
        </Container>
    )
}