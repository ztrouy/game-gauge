import { Box, Button, Container, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/userService.jsx"
import { useParams } from "react-router"

export const ProfileForm = ({ currentUser }) => {
    const [userData, setUserData] = useState({})
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [open, setOpen] = useState(false)



    const { userId } = useParams()



    useEffect(() => {
        fetchUserData()
    }, [currentUser])


    useEffect(() => {
        if (userData === undefined){
            return
        }
        if (!userData.hasOwnProperty("name")) {
            return
        }

        setUserName(userData?.name)
    }, [userData])


    useEffect(() => {
        if (userData === undefined){
            return
        }
        if (!userData.hasOwnProperty("email")) {
            return
        }

        setUserEmail(userData?.email)
    }, [userData])



    const fetchUserData = () => {
        if (userId) {
            getUserById(userId).then(userObject => {
                setUserData(userObject)
            })
        } else {
            getUserById(currentUser.id).then(userObject => {
                setUserData(userObject)
            })
        }
    }

    const handleNameChange = (event) => {
        let copy = userName
        copy = event.target.value
        setUserName(copy)
    }


    const handleEmailChange = (event) => {
        let copy = userEmail
        copy = event.target.value
        setUserEmail(copy)
    }



    const handleSubmit = () => {
        if (userName === "") {
            window.alert("Please fill out username field!")
            return
        } 
        if (userEmail === "") {
            window.alert("Please fill out email field!")
            return
        }
        
        const editedUserData = {...userData}
        editedUserData.name = userName
        editedUserData.email = userEmail
        
        if (editedUserData.name === userData.name && editedUserData.email === userData.email) {
            window.alert("You haven't changed anything!")
            return
        }

        delete editedUserData.userGames
        delete editedUserData.userGroups

        updateUser(editedUserData).then(() => {
            fetchUserData()
            setOpen(true)
        })
    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }


    
    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"}>
                <Paper sx={{padding: 4, margin: 4, width: "90%", maxWidth: "600px"}}>
                    <Typography variant="h4" textAlign={"left"}>Edit {userData?.name}'s Profile</Typography>
                    <Box display={"flex"} paddingTop={3} justifyContent={"left"}>
                        <TextField 
                            label="Username"
                            value={userName}
                            name="name"
                            onChange={handleNameChange}
                            sx={{width: "100%", maxWidth: "400px"}}
                        />
                    </Box>
                    <Box display={"flex"} paddingTop={4} justifyContent={"left"}>
                        <TextField 
                            label="Email"
                            value={userEmail}
                            name="email"
                            onChange={handleEmailChange}
                            sx={{width: "100%", maxWidth: "400px"}}
                        />
                    </Box>
                    <Box display={"flex"} paddingTop={4} justifyContent={"right"}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Box>
                    <Snackbar 
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="Profile updated"
                    />
                </Paper>
            </Box>
        </Container>
    )
}