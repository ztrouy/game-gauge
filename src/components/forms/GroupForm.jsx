import { Box, Button, Container, Paper, TextField, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { createGroup, createUserGroup, getAllGroups, getGroupById, updateGroup } from "../../services/groupService.js"
import { useNavigate, useParams } from "react-router"
import { updateGame } from "../../services/gameService.jsx"

export const GroupForm = ({ currentUser }) => {
    const [title, setTitle] = useState("")



    const { groupId } = useParams()



    useEffect(() => {
        if (groupId) {
            getGroupById(groupId).then(groupObject => {
                setTitle(groupObject.name)
            })
        }
    }, [groupId])



    const navigate = useNavigate()


    const theme = useTheme()
    
    
    const handleSubmit = () => {
        if (groupId) {
            editExistingGroup()
        } else {
            createNewGroup()
        }
    }


    const createNewGroup = () => {
        const newGroup = {
            name: title
        }

        createGroup(newGroup).then(() => {
            getAllGroups().then(groupsArray => {
                const newGroupId = groupsArray.length
                const newUserGroup = {
                    groupId: newGroupId,
                    userId: currentUser.id
                }

                createUserGroup(newUserGroup).then(() => {
                    navigate("/groups")
                })
            })
        })
    }


    const editExistingGroup = () => {
        getGroupById(groupId).then(groupObject => {
            groupObject.name = title
            delete groupObject.userGroups
            
            updateGroup(groupObject).then(() => {
                navigate("/groups")
            })
        })

    }
    


    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"}>
                <Paper sx={{padding: 4, margin: 4, width: "90%", maxWidth: "600px", backgroundImage: "none", backgroundColor: theme.palette.surface.default}}>
                    <Typography variant="h4" textAlign={"left"}>Create New Group</Typography>
                    <Box display={"flex"} paddingTop={3} justifyContent={"left"}>
                        <TextField label="Group Title" value={title} onChange={event => setTitle(event.target.value)} />
                    </Box>
                    <Box display={"flex"} paddingTop={3} justifyContent={"right"}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Paper>
            </Box> 
        </Container>
    )
}