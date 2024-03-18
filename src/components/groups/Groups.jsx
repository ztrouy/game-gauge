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
            getUserById(currentUser.id).then(userObject => {
                setActiveUser(userObject)
            })
        }
    }, [currentUser])
    


    const fetchGroups = () => {
        getAllGroups().then(groupsArray => {
            setGroups(groupsArray)
        })
    }



    return (
        <Container>
            <GroupList groups={groups} fetchGroups={fetchGroups} activeUser={activeUser} currentUser={currentUser} />
        </Container>
    )
}