export const getNonStaffUsers = () => {
    return fetch("http://localhost:8088/users?isStaff=false").then(res => res.json())
}

export const getStaffUsers = () => {
    return fetch("http://localhost:8088/users?isStaff=true").then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
        res.json()
    )
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}/?_embed=userGames`).then(res => res.json())
}
  
export const createUser = (newUser) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then((res) => res.json())
}

export const updateUser = (updatedUser) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    }

    return fetch(`http://localhost:8088/users/${updatedUser.id}`, putOptions)
}