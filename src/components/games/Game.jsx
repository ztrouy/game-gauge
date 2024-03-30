import { Button, Card, CardMedia, Typography, Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.jsx"
import { createUserGame, deleteUserGame } from "../../services/gameService.jsx"
import { Link } from "react-router-dom"


export const Game = ({ game, isCompact, user, fetchUserData, currentUser }) => {
    const [ownsGame, setOwnsGame] = useState(false)
    const [activeUser, setActiveUser] = useState({})



    useEffect(() => {
        if (user?.id != currentUser.id) {
            getUserById(currentUser.id).then(userObject => {
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
        <>
            {isCompact ? (
                <Paper sx={{width: "100%"}}>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} padding={2}>
                        <Typography fontWeight={"bold"}>{game.name}</Typography>
                        <Box sx={{ display: "flex", justifyContent: "right"}}>
                            {currentUser.isStaff ? (
                                <Button variant="contained" sx={{marginRight: 1, color: "white"}} component={Link} to={`/games/edit/${game.id}`}>Edit Game</Button>
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
                </Paper>
            ) : (
                <Paper margin={2}>
                    <Card sx={{width: 350}}>
                        <CardMedia 
                            component={"img"}
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
                                    <Button variant="contained" sx={{marginRight: 1, color: "white"}} component={Link} to={`/games/edit/${game.id}`}>Edit Game</Button>
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
            )}
        </>
    )
}