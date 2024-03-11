import { Box } from "@mui/material"
import { Game } from "./Game.jsx"

export const Games = ({ currentUser }) => {
    return (
        <Box>
            <Game currentUser={currentUser} />
        </Box>
    )
}