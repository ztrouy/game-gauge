import { AccountCircle, Gamepad, Group, SportsEsports } from "@mui/icons-material"
import { AppBar, Button, Container, Grid, IconButton, Menu, MenuItem, SvgIcon, Toolbar, } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../assets/HHLogo.svg"

export const NavBar = ({ currentUser }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    
    const navigate = useNavigate()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static" enableColorOnDark={true} sx={{backgroundImage: "none"}}>
            <Container maxWidth="x1" disableGutters>
                <Toolbar disableGutters>
                    <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"} width={1}>
                        <Grid display={"flex"} alignContent={"center"}>
                            <div style={{marginTop: 10, marginLeft: 12}}>
                                <img src={Logo} height={"40px"} color="white" />
                            </div>
                        </Grid>
                        <Grid display={"flex"} alignContent={"center"}>
                            <Container disableGutters sx={{display: {xs: "none", sm: "block"}, alignContent: "center", marginRight: 1}}>
                                <Button variant="text" component={Link} to={"/games"} sx={{color: "white", fontWeight: "bold"}}>
                                        Games
                                </Button>
                                {currentUser.isStaff ? (
                                    <Button variant="text" component={Link} to={"/games/new"} sx={{color: "white", fontWeight: "bold"}}>
                                            New Game
                                    </Button>
                                ) : (
                                    ""
                                )}
                                <Button variant="text" component={Link} to={"/groups"} sx={{color: "white", fontWeight: "bold"}}>
                                    Groups
                                </Button>
                                <div style={{display: "inline"}}>
                                    <IconButton
                                        size="large"
                                        aria-haspopup="true"
                                        aria-controls="menu-appbar"
                                        onClick={handleMenu}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        keepMounted
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem
                                            onClick={() => {navigate("/profile")}}
                                        >Profile</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                localStorage.removeItem("game_gauge_user")
                                                navigate("/login", { replace : true })
                                            }}
                                        >Logout</MenuItem>
                                    </Menu>
                                </div>
                            </Container>
                            <Container disableGutters sx={{display: {xs: "block", sm: "none"}, alignContent: "center", marginRight: 1}}>
                                <IconButton
                                    onClick={() => navigate("/games")}
                                >
                                    <SportsEsports fontSize="large"/>
                                </IconButton>
                                {currentUser.isStaff ? (
                                    <IconButton
                                    onClick={() => navigate("/games/new")}
                                    >
                                        <Gamepad />
                                    </IconButton>
                                ) : (
                                    ""
                                )}
                                <IconButton
                                    onClick={() => navigate("/groups")}
                                >
                                    <Group fontSize="large"/>
                                </IconButton>
                                <div style={{display: "inline"}}>
                                    <IconButton
                                        size="large"
                                        aria-haspopup="true"
                                        aria-controls="menu-appbar"
                                        onClick={handleMenu}
                                    >
                                        <AccountCircle fontSize="large"/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        keepMounted
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem
                                            onClick={() => {navigate("/profile")}}
                                        >Profile</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                localStorage.removeItem("game_gauge_user")
                                                navigate("/login", { replace : true })
                                            }}
                                        >Logout</MenuItem>
                                    </Menu>
                                </div>
                            </Container>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}