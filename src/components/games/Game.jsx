import { Button, Card, CardMedia, Typography, Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.jsx"

export const Game = ({ game, currentUser }) => {
    const [user, setUser] = useState({userGames: []})
    const [ownsGame, setOwnsGame] = useState(false)

    useEffect(() => {
        getUserById(currentUser.id).then(userArray => {
            const userObject = userArray[0]
            setUser(userObject)
        })
    }, [currentUser])

    useEffect(() => {
        if (user.userGames.find(userGame => userGame.id === game.id)) {
            setOwnsGame(true)
        }
    }, [user, game])

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