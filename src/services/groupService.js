export const getAllGroups = () => {
    return fetch("http://localhost:8088/groups?_embed=userGroups").then(res => res.json())
}