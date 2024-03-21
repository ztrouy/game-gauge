import { Box, Button, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { useNavigate } from "react-router"
import { createUserGroup, deleteUserGroup } from "../../services/groupService.js"

export const Group = ({ group, isCompact, fetchGroups, activeUser, fetchActiveUser, currentUser }) => {
    const [members, setMembers] = useState([])
    const [isInGroup, setIsInGroup] = useState(false)
    


    useEffect(() => {
        setMembers([])
        group.userGroups.map(userGroup => {
            getUserById(userGroup.userId).then(userObject => {
                setMembers(members => [...members, userObject])
            })
        })
    }, [group])



    useEffect(() => {
        if (activeUser.userGroups?.find(userGroup => userGroup.groupId === group.id)) {
            setIsInGroup(true)
        } else { setIsInGroup(false) }
    }, [activeUser, group])



    const navigate = useNavigate()


    const handleOpen = () => {
        navigate(`/groups/${group.id}`)
    }


    const handleLeave = () => {
        const userGroupToDelete = activeUser.userGroups.find(userGroup => userGroup.groupId === group.id)
        deleteUserGroup(userGroupToDelete.id).then(() => {
            fetchGroups()
            fetchActiveUser()
        })
    }


    const handleJoin = () => {
        const newUserGroup = {
            userId: activeUser.id,
            groupId: group.id
        }
        createUserGroup(newUserGroup).then(() => {
            fetchGroups()
            fetchActiveUser()
        })
    }



    return(
        <Paper elevation={3} sx={{marginTop: 2, padding: 4}}>
            <Typography variant="h4" textAlign={"left"} fontWeight={"bold"}>{group.name}</Typography>
            <Box paddingTop={1} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                <Box>
                    {members.map(member => {
                        return <Typography textAlign={"left"} key={member.id}>{member.name}</Typography>
                    })}

                </Box>
                <Box display={"flex"} flexDirection={"row"} alignItems={"flex-end"}>
                    {isInGroup ? (
                        <>
                            <Button onClick={handleLeave}>Leave</Button>
                            <Button variant="contained" onClick={handleOpen}>Open</Button>
                        </>
                    ) : (
                        <Button onClick={handleJoin}>Join</Button>
                    )}
                </Box>
            </Box>
        </Paper>
    )
}