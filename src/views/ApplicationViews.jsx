import { useEffect, useState } from "react"
import { EmployeeViews } from "./EmployeeViews.jsx"
import { PlayerViews } from "./PlayerViews.jsx"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localGameGaugeUser = localStorage.getItem("game_gauge_user")
        const GameGaugeUserObject = JSON.parse(localGameGaugeUser)

        setCurrentUser(GameGaugeUserObject)
    }, [])

    return currentUser.isStaff ? <EmployeeViews currentUser={currentUser} /> : <PlayerViews currentUser={currentUser} />
}