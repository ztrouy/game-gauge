import { Box, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"

export const Group = ({ group, currentUser }) => {
    const [members, setMembers] = useState([])
    

    useEffect(() => {
        setMembers([])
        group.userGroups.map(userGroup => {
            getUserById(userGroup.userId).then(userArray => {
                const userObject = userArray[0]
                setMembers(members => [...members, userObject])
            })
        })
    }, [group])


    return(
        <Paper sx={{marginTop: 1, padding: 4}}>
            <Typography variant="h4" textAlign={"left"} fontWeight={"bold"}>{group.name}</Typography>
            <Box>
                {members.map(member => {
                    return <Typography textAlign={"left"}>{member.name}</Typography>
                })}
            </Box>
        </Paper>
    )
}