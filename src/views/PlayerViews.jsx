import { Outlet, Route, Routes } from "react-router"
import { Games } from "../components/games/Games.jsx"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Profile } from "../components/profiles/Profile.jsx"
import { Paper } from "@mui/material"
import { ProfileForm } from "../components/forms/ProfileForm.jsx"

export const PlayerViews = ({ currentUser }) => {  
    return (
        <Routes>
            <Route path="/" element={
                <Paper>
                    <NavBar />
                    <Outlet />
                </Paper>
            }>
                <Route index element={<>Welcome!</>} />
                <Route path="games">
                    <Route index element={<Games currentUser={currentUser} />} />
                </Route>
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                    <Route path="edit" element={<ProfileForm currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}