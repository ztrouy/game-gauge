import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGroups } from "../../services/groupService"
import { GroupList } from "./GroupList.jsx"

export const Groups = ({ currentUser }) => {
    const [groups, setGroups] = useState([])



    useEffect(() => {
        fetchGroups()
    }, [])
    


    const fetchGroups = () => {
        getAllGroups().then(groupsArray => {
            setGroups(groupsArray)
        })
    }



    return (
        <Container>
            <GroupList groups={groups} currentUser={currentUser} />
        </Container>
    )
}