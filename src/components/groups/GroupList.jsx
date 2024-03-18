import { Box } from "@mui/material"
import { Group } from "./Group.jsx"

export const GroupList = ({ currentUser, activeUser, fetchActiveUser, groups, fetchGroups}) => {
    return (
        <Box>
            {groups.map(group => {
                return <Group group={group} fetchGroups={fetchGroups} currentUser={currentUser} activeUser={activeUser} fetchActiveUser={fetchActiveUser} key={group.id} />
            })}
        </Box>
    )
}