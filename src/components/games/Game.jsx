import { Button, Card, CardMedia, Typography, Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.jsx"

export const Game = ({ game, user, currentUser }) => {
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
        console.log("Clicked!") // TODO : Implement creating and removing userGames items
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