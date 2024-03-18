import { Box } from "@mui/material"
import { Group } from "./Group.jsx"

export const GroupList = ({ currentUser, activeUser, groups, fetchGroups}) => {
    return (
        <Box>
            {groups.map(group => {
                return <Group group={group} fetchGroups={fetchGroups} currentUser={currentUser} activeUser={activeUser} key={group.id} />
            })}
        </Box>
    )
}