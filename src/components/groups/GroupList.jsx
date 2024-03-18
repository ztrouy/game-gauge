import { Box } from "@mui/material"
import { Group } from "./Group.jsx"

export const GroupList = ({ currentUser, groups}) => {
    return (
        <Box>
            {groups.map(group => {
                return <Group group={group} currentUser={currentUser} key={group.id} />
            })}
        </Box>
    )
}