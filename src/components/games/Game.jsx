import { Button, Card, CardMedia, Typography, Box } from "@mui/material"

export const Game = ({ gameObject, currentUser }) => {
    return (
        <Card sx={{width: 350}}>
            <CardMedia 
                sx={{height: 165}}
                image="https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header_292x136.jpg?t=1700231592"
                title="Lethal Company"
            />
            <Box margin={1}>
                <Typography 
                    textAlign={"left"}
                    variant="h5"
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    Lethal Company
                </Typography>
                <Box marginTop={1} sx={{ display: "flex", justifyContent: "right"}}>
                    <Button variant="contained">Add Game</Button>
                </Box>
            </Box>
        </Card>
    )
}