import { Box, Button, Card, CardMedia, Chip, Container, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getGroupById } from "../../services/groupService.js"
import { getAllGames } from "../../services/gameService.jsx"
import { getUserById } from "../../services/userService.jsx"
import { GameList } from "../games/GameList.jsx"
import { getAllGenres } from "../../services/genreService.js"

export const GroupDetail = ({ currentUser }) => {
    const [group, setGroup] = useState({})
    const [allGames, setAllGames] = useState([])
    const [genres, setGenres] = useState([])
    const [user, setUser] = useState({})
    const [members, setMembers] = useState([])
    const [hasImportedMembers, setHasImportedMembers] = useState(false)
    const [groupGames, setGroupGames] = useState([])
    const [filteredGroupGames, setFilteredGroupGames] = useState([])
    const [chosenGameValue, setChosenGameValue] = useState(0)
    const [chosenGame, setChosenGame] = useState({})
    


    const {groupId} = useParams()



    useEffect(() => {
        fetchGroup()
        fetchAllGames()
        fetchAllGenres()
        fetchUserData()
    }, [groupId, currentUser])


    useEffect(() => {
        if (group.id && !hasImportedMembers) {
            fetchMembers()
        }
    }, [group])


    useEffect(() => {
        findValidGames(allGames)
    }, [group, allGames, members])


    useEffect(() => {
        setChosenGame(filteredGroupGames[chosenGameValue])
    }, [allGames, members, groupGames, filteredGroupGames, chosenGameValue])



    const fetchGroup = () => {
        getGroupById(groupId).then(groupObject => {
            setGroup(groupObject)
        })
    }


    const fetchAllGames = () => {
        getAllGames().then(gamesArray => {
            setAllGames(gamesArray)
        })
    }


    const fetchAllGenres = () => {
        getAllGenres().then(genresArray => {
            setGenres(genresArray)
        })
    }


    const fetchUserData = () => {
        if (currentUser.id) {
            getUserById(currentUser.id).then(userObject => {
                setUser(userObject)
            })
        }
    }


    const fetchMembers = () => {
        group.userGroups?.map(userGroup => {
            getUserById(userGroup.userId).then(userObject => {
                setMembers(members => [...members, userObject])
            })
        })

        setHasImportedMembers(true)
    }



    const checkIfAllPlayersOwnGame = (players, gameObject, ownedGamesArray) => {
        let count = 0
        
        players.map(player => {
            if (player.userGames.find(userGame => userGame.gameId === gameObject.id)) {
                count++
            }
        })
        
        if (count === members.length) {
            ownedGamesArray.push(gameObject)
        }
    }
    
    
    const findValidGames = (gamesArray) => {
        if (members.length > 0) {
            const ownedGames = []
            
            gamesArray.map(game => {
                if (game.maxPlayers >= members.length) {
                    checkIfAllPlayersOwnGame(members, game, ownedGames)
                }
            })
            
            setGroupGames(ownedGames)
        }
    }


    const randomizeChosenGame = () => {
        let randomChoice = chosenGameValue

        while (randomChoice === chosenGameValue) {
            randomChoice = Math.floor(Math.random() * filteredGroupGames.length)
        }
        
        setChosenGameValue(randomChoice)
    }


    const handleRemoveGame = () => {
        const copy = [...filteredGroupGames]
        copy.splice(chosenGameValue, 1)

        setFilteredGroupGames(copy)
        
        const randomChoice = Math.floor(Math.random() * copy.length)
        setChosenGameValue(randomChoice)
    }



    return (
        <Container>
            <Typography variant="h4" fontWeight={"bold"} textAlign={"left"} marginTop={5}>{group.name}</Typography>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} marginTop={4}>
                <Box width={"65%"}>
                    {chosenGame?.name ? (
                        <Card sx={{display: "flex", width: "100%", marginBottom: 2}}>
                            <CardMedia
                                component={"img"}
                                sx={{width: "60%"}}
                                image={chosenGame?.imageHeader}
                                title={chosenGame?.name}
                                />
                            <Box display={"flex"} flexDirection={"column"} padding={2} justifyContent={"space-between"}>
                                <Box>
                                    <Typography fontWeight={"bold"} textAlign={"left"}>{chosenGame?.name}</Typography>
                                    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"left"} >
                                        {chosenGame?.gameGenres?.map(gameGenre => {
                                            return (
                                                <Chip 
                                                    label={genres[gameGenre.genreId - 1].genre} 
                                                    value={gameGenre.genreId}
                                                    sx={{marginRight: 1, marginTop: 1 }} 
                                                    key={gameGenre.genreId} 
                                                />
                                            )
                                        })}
                                    </Box>
                                </Box>
                                <Box display={"flex"} width={"100%"} justifyContent={"left"}>
                                    <Button variant="contained" onClick={randomizeChosenGame} sx={{marginRight: 1, color: "white"}}>Reroll</Button>
                                    <Button variant="contained" onClick={handleRemoveGame}>Remove</Button>
                                </Box>
                            </Box>
                        </Card>
                    ) : (
                        ""
                    )}
                    <Typography variant="h5" textAlign={"left"} fontWeight={"bold"}>Game List</Typography>
                    <GameList 
                        isCompact={true} 
                        games={groupGames} 
                        setGames={setGroupGames} 
                        filteredGames={filteredGroupGames} 
                        setFilteredGames={setFilteredGroupGames} 
                        user={user} 
                        fetchUserData={fetchUserData} 
                        currentUser={currentUser}
                    />
                </Box>
                <Box width={"25%"}>
                    <Paper sx={{padding: 2}}>
                        <Typography fontWeight={"bold"} textAlign={"left"}>Members List</Typography>
                        <Box>
                            {members.length > 0 && members.map(member => {
                                return <Typography textAlign={"left"} key={member.id}>{member.name}</Typography>
                            })}

                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
}