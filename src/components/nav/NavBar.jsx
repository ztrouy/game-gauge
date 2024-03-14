import { AppBar, Button, Container, Grid, Toolbar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({ currentUser }) => {
    const navigate = useNavigate()
    
    return (
        <AppBar position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"} width={1}>
                        <Grid>
                            <Button variant="text" component={Link} to={"/games"} sx={{color: "white"}}>Games</Button>
                            {currentUser.isStaff ? (
                                <Button variant="text" component={Link} to={"/games/new"} sx={{color: "white"}} >New Game</Button>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid>
                            <Button variant="text" component={Link} to={"/profile"} sx={{color: "white"}}>Profile</Button>
                            <Button variant="text" sx={{color: "white"}} onClick={() => {
                                localStorage.removeItem("game_gauge_user")
                                navigate("/login", { replace : true })
                            }}>Logout</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}