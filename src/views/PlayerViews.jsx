import { Outlet, Route, Routes } from "react-router"
import { Games } from "../components/games/Games.jsx"

export const PlayerViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                <Outlet />
                </>
            }>
                <Route index element={<>Welcome!</>} />
                <Route path="games">
                    <Route index element={<Games currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}