import { Paper } from "@mui/material"
import { Outlet, Route, Routes } from "react-router"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Games } from "../components/games/Games.jsx"
import { Profile } from "../components/profiles/Profile.jsx"
import { ProfileForm } from "../components/forms/ProfileForm.jsx"

export const EmployeeViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <Paper>
                    <NavBar currentUser={currentUser} />
                    <Outlet/>
                </Paper>
            }>
                <Route index element={<Games currentUser={currentUser} />} />
                <Route path="games">
                    <Route index element={<Games currentUser={currentUser} />} />
                    <Route path="new" element={<>New Game View</>} />
                    <Route path="edit" >
                        <Route path=":gameId" element={<>Edit Game View</>}/>
                    </Route>
                </Route>
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                    <Route path="edit">
                        <Route index element={<ProfileForm currentUser={currentUser} />} />
                        <Route path=":userId" element={<ProfileForm currentUser={currentUser} />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}