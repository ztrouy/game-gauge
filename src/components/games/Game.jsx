import { Button, Card, CardMedia, Typography, Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.jsx"
import { createUserGame, deleteUserGame } from "../../services/gameService.jsx"
import { Link } from "react-router-dom"

export const Game = ({ game, user, fetchUserData, currentUser }) => {
    const [ownsGame, setOwnsGame] = useState(false)
    const [activeUser, setActiveUser] = useState({})



    useEffect(() => {
        if (user?.id != currentUser.id) {
            getUserById(currentUser.id).then(userArray => {
                const userObject = userArray[0]
                setActiveUser(userObject)
            })
        } else {
            setActiveUser(user)
        }
    }, [user, currentUser])


    useEffect(() => {
        if (activeUser.hasOwnProperty("userGames")) {
            if (activeUser?.userGames.find(userGame => userGame.gameId === game.id)) {
                setOwnsGame(true)
            } else {
                setOwnsGame(false)
            }
        }
    }, [activeUser, game])



    const handleButton = () => {
        if (ownsGame) {
            const currentUserGame = activeUser.userGames.find(userGame => userGame.gameId === game.id)
            deleteUserGame(currentUserGame.id).then(() => {
                fetchUserData()
            })
        } else {
            const newUserGame = {
                userId: activeUser.id,
                gameId: game.id
            }
            createUserGame(newUserGame).then(() => {
                fetchUserData()
            })
        }
    }



    return (
        <Paper margin={2}>
            <Card sx={{width: 350}}>
                <CardMedia 
                    sx={{height: 165}}
                    image={game.imageHeader}
                    title={game.name}
                />
                <Box margin={1}>
                    <Typography 
                        textAlign={"left"}
                        variant="h5"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        {game.name}
                    </Typography>
                    <Box marginTop={1} sx={{ display: "flex", justifyContent: "right"}}>
                        {currentUser.isStaff ? (
                            <Button variant="contained" sx={{marginRight: 1}} component={Link} to={`/games/edit/${game.id}`}>Edit Game</Button>
                        ) : (
                            ""
                        )}
                        {ownsGame ? (
                            <Button variant="contained" onClick={handleButton}>Remove Game</Button>
                        ) : (
                            <Button variant="contained" onClick={handleButton}>Add Game</Button>
                        )}
                    </Box>
                </Box>
            </Card>
        </Paper>
    )
}