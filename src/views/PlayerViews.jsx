import { Outlet, Route, Routes } from "react-router"
import { Games } from "../components/games/Games.jsx"
import { Groups } from "../components/groups/Groups.jsx"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Profile } from "../components/profiles/Profile.jsx"
import { Paper } from "@mui/material"
import { ProfileForm } from "../components/forms/ProfileForm.jsx"
import { GroupForm } from "../components/forms/GroupForm.jsx"
import { GroupDetail } from "../components/groups/GroupDetail.jsx"

export const PlayerViews = ({ currentUser }) => {  
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar currentUser={currentUser} />
                    <Outlet />
                </>
            }>
                <Route index element={<Games currentUser={currentUser} />} />
                <Route path="games">
                    <Route index element={<Games currentUser={currentUser} />} />
                </Route>
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                    <Route path="edit" element={<ProfileForm currentUser={currentUser} />} />
                </Route>
                <Route path="groups">
                    <Route index element={<Groups currentUser={currentUser} />} />
                    <Route path="new" element={<GroupForm currentUser={currentUser} />} />
                    <Route path=":groupId">
                        <Route index element={<GroupDetail currentUser={currentUser} />} />
                        <Route path="edit" element={<GroupForm currentUser={currentUser} />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}