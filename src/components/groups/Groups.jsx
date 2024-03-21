import { Box, Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGroups } from "../../services/groupService"
import { GroupList } from "./GroupList.jsx"
import { getUserById } from "../../services/userService.jsx"
import { Link } from "react-router-dom"

export const Groups = ({ currentUser }) => {
    const [groups, setGroups] = useState([])
    const [activeUser, setActiveUser] = useState({})



    useEffect(() => {
        fetchGroups()
    }, [])


    useEffect(() => {
        if (currentUser.id) {
            fetchActiveUser()
        }
    }, [currentUser])
    


    const fetchGroups = () => {
        getAllGroups().then(groupsArray => {
            setGroups(groupsArray)
        })
    }


    const fetchActiveUser = () => {
        getUserById(currentUser.id).then(userObject => {
            setActiveUser(userObject)
        })
    }



    return (
        <Container>
            <Box display={"flex"} paddingTop={2}>
                <Button component={Link} to={"/groups/new"}>New Group</Button>
            </Box>
            <GroupList groups={groups} fetchGroups={fetchGroups} activeUser={activeUser} fetchActiveUser={fetchActiveUser} />
        </Container>
    )
}