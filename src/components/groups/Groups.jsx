import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGroups } from "../../services/groupService"
import { Group } from "./Group"

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
            <Box>
                {groups.map(group => {
                    return <Group group={group} currentUser={currentUser} />
                })}
            </Box>
        </Container>
    )
}