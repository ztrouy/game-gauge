import { Box } from "@mui/material"
import { Group } from "./Group.jsx"

export const GroupList = ({ activeUser, fetchActiveUser, groups, fetchGroups}) => {
    return (
        <Box>
            {groups.map(group => {
                return <Group group={group} fetchGroups={fetchGroups} activeUser={activeUser} fetchActiveUser={fetchActiveUser} key={group.id} />
            })}
        </Box>
    )
}