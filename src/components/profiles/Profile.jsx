import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGames } from "../../services/gameService.jsx"
import { GameList } from "../games/GameList.jsx"
import { useNavigate, useParams } from "react-router"
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

        getUserById(profileId).then(userObject => {
            setProfileUser(userObject)
        })
    }


    const navigate = useNavigate()


    const handleEditButton = () => {
        if (profileUser.id === currentUser.id) {
            navigate("/profile/edit")
        } else {
            navigate(`/profile/edit/${profileUser.id}`)
        }
    }



    return (
        <Container>
            <Paper sx={{mt: 3, mb: 3}}>
                <Box display={"flex"} alignContent={"center"} justifyContent={"space-between"}>
                    <Typography variant="h3" fontWeight={"bold"} textAlign={"left"} padding={2}>
                        {profileUser?.name}
                    </Typography>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} padding={3}>
                        {currentUser?.id === profileUser?.id || currentUser?.isStaff ? (<Button variant="contained" onClick={handleEditButton}>Edit Profile</Button>) : ("")}
                    </Box>
                </Box>
            </Paper>
            <Typography fontWeight={"bold"} textAlign={"left"}>{profileUser?.name}'s Game Library</Typography>
            <GameList games={games} setGames={setGames} filteredGames={filteredGames} setFilteredGames={setFilteredGames} user={profileUser} fetchUserData={fetchUserData} currentUser={currentUser} />
        </Container>
    )
}