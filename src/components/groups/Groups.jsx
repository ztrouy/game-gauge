import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGroups } from "../../services/groupService"
import { GroupList } from "./GroupList.jsx"
import { getUserById } from "../../services/userService.jsx"

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
            <GroupList groups={groups} fetchGroups={fetchGroups} activeUser={activeUser} fetchActiveUser={fetchActiveUser} currentUser={currentUser} />
        </Container>
    )
}