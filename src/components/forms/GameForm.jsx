import { Box, Button, Chip, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllGameTypes } from "../../services/gameTypeService.js"
import { createGameGenre, deleteGameGenre, getAllGameGenresByGameId, getAllGenres } from "../../services/genreService.js"
import { useNavigate, useParams } from "react-router"
import { createGame, getAllGames, getGameById, updateGame } from "../../services/gameService.jsx"

export const GameForm = () => {
    const [gameTypes, setGameTypes] = useState([])
    const [genres, setGenres] = useState([])
    
    const [gameObject, setGameObject] = useState({})
    const [title, setTitle] = useState("")
    const [gameTypeChoice, setGameTypeChoice] = useState(0)
    const [currentGenreChoice, setCurrentGenreChoice] = useState(0)
    const [genreChoices, setGenreChoices] = useState([])
    const [importedGenreChoices, setImportedGenreChoices] = useState([])
    const [importedGameGenres, setImportedGameGenres] = useState([])
    const [playerCount, setPlayerCount] = useState(0)
    const [headerURL, setHeaderURL] = useState("")



    const { gameId } = useParams()



    useEffect(() => {
        importGameTypes()
        importGenres()
    }, [])


    useEffect(() => {
        if (gameId) {
            importExistingGame(gameId)
        } else {
            setIdForNewGame()
        }
    }, [gameId])



    const importGameTypes = () => {
        getAllGameTypes().then(gameTypesArray => {
            setGameTypes(gameTypesArray)
        })
    }


    const importGenres = () => {
        getAllGenres().then(genresArray => {
            setGenres(genresArray)
        })
    }
    
    
    const importExistingGame = (id) => {
        getGameById(id).then(gameToImport => {
            
            setGameObject(gameToImport)
            setTitle(gameToImport.name)
            setGameTypeChoice(gameToImport.typeId)
            setPlayerCount(gameToImport.maxPlayers)
            setHeaderURL(gameToImport.imageHeader)

            const importedGameGenres = gameToImport.gameGenres.map(gameGenre => gameGenre.genreId)
            setGenreChoices(importedGameGenres)
            setImportedGenreChoices(importedGameGenres)
        })
        getAllGameGenresByGameId(gameId).then(gameGenresArray => {
            setImportedGameGenres(gameGenresArray)
        })
    }


    const setIdForNewGame = () => {
        getAllGames().then(gamesArray => {
            const currentHighestGameId = gamesArray.length
            const idForNewGame = currentHighestGameId + 1
            
            setGameObject({id: idForNewGame})
        })
    }

    
    const handleAddGenre = () => {
        if (!currentGenreChoice) {
            window.alert("You haven't made a choice!")
            return
        }
        if (genreChoices.find(genreChoice => genreChoice === currentGenreChoice)) {
            window.alert("You've already added that genre!")
            return
        }
        setGenreChoices([...genreChoices, currentGenreChoice])
        setCurrentGenreChoice(0)      
    }


    const handleRemoveGenre = (genreId) => {
        const copy = [...genreChoices]
        
        const genreToRemove = copy.indexOf(genreId)
        copy.splice(genreToRemove, 1)

        setGenreChoices(copy)
    }


    const navigate = useNavigate()


    const doesGenreChoiceExist = (genreChoiceArray, genreToCheckAgainst) => {
        return genreChoiceArray.find(genreChoice => genreChoice === genreToCheckAgainst.id)
    }


    const modifyGameGenres = () => {
        const arrayOfPromises = []

        for (const genre of genres) {
            if (doesGenreChoiceExist(genreChoices, genre) && !doesGenreChoiceExist(importedGenreChoices, genre)) {
                arrayOfPromises.push(createNewGameGenre(genre.id))
            } else if (!doesGenreChoiceExist(genreChoices, genre) && doesGenreChoiceExist(importedGenreChoices, genre)) {
                arrayOfPromises.push(deleteExistingGameGenre(genre.id))
            }
        }

        const results = Promise.all(arrayOfPromises)

        return results
    }


    const handleSubmit = () => {
        if (!title || !playerCount || !gameTypeChoice || genreChoices.length === 0 || !headerURL) {
            window.alert("You haven't filled out all the fields!")
            return
        }

        const copy = {...gameObject}
        copy.name = title
        copy.typeId = gameTypeChoice
        copy.maxPlayers = parseInt(playerCount)
        copy.imageBanner = ""
        copy.imageHeader = headerURL
        delete copy.gameGenres

        console.log(copy)
        
        if (gameId) {
            updateGame(copy).then(() => {
                modifyGameGenres()
            }).then(() => {
                navigate("/games")
            })
        } else {
            createGame(copy).then(() => {
                createAllGameGenres()
            }).then(() => {
                navigate("/games")
            })
        }
    }

    
    const createNewGameGenre = (genreId) => {
        const newGameGenre = {
            gameId: gameObject.id,
            genreId: genreId
        }
        
        createGameGenre(newGameGenre)
    }
    
    
    const createAllGameGenres = () => {
        for (const genre of genreChoices) {
            createNewGameGenre(genre)
        }
    }


    const deleteExistingGameGenre = (genreId) => {
        const gameGenreToDelete = importedGameGenres.find(gameGenre => gameGenre.genreId === genreId)
        return deleteGameGenre(gameGenreToDelete.id)
    }
    


    return (
        <Container>
            <Box display={"flex"} justifyContent={"center"}>
                <Paper sx={{padding: 4, margin: 4, width: "90%", maxWidth: "600px"}}>
                    <Typography variant="h4" textAlign={"left"}>Add New Game</Typography>
                    <Box display={"flex"} paddingTop={3} justifyContent={"left"}>
                        <TextField label="Game Title" value={title} onChange={event => setTitle(event.target.value)}/>
                    </Box>
                    <Box display={"flex"} paddingTop={4} justifyContent={"left"}>
                        <FormControl sx={{width: "100%", maxWidth: "250px"}}>
                            <InputLabel>Select Game Type</InputLabel>
                            <Select
                                value={gameTypeChoice}
                                label="Select Game Type"
                                onChange={event => setGameTypeChoice(event.target.value)}
                            >
                                <MenuItem value={0} key={0} disabled>Select a Game Type</MenuItem>
                                {gameTypes.map(gameType => {
                                    return <MenuItem value={gameType.id} key={gameType.id}>{gameType.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={"flex"} paddingTop={4} justifyContent={"left"}>
                        <FormControl sx={{width: "100%", maxWidth: "250px"}}>
                            <InputLabel>Select Genre</InputLabel>
                            <Select
                                value={currentGenreChoice}
                                label="Select Genre"
                                onChange={event => setCurrentGenreChoice(event.target.value)}
                            >
                                <MenuItem value={0} key={0} disabled>Select a Genre</MenuItem>
                                {genres.map(genre => {
                                    return <MenuItem value={genre.id} key={genre.id}>{genre.genre}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={"flex"} paddingTop={2} justifyContent={"left"}>
                        <Button variant="contained" onClick={handleAddGenre}>Add Genre</Button>
                    </Box>
                    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"left"} >
                        {genreChoices.map(genreId => {
                            return (
                                <Chip 
                                    label={genres[genreId - 1]?.genre} 
                                    value={genreId}
                                    onDelete={() => handleRemoveGenre(genreId)}
                                    sx={{marginRight: 1, marginTop: 1 }} 
                                    key={genreId} 
                                />
                            )
                        })}
                    </Box>
                    <Box display={"flex"} paddingTop={3} justifyContent={"left"} maxWidth={"150px"}>
                        <TextField 
                            label="Max Players" 
                            type="number" 
                            inputProps={{min: 0}}
                            value={playerCount} 
                            onChange={event => setPlayerCount(event.target.value)}/>
                    </Box>
                    <Box display={"flex"} paddingTop={3} justifyContent={"left"}>
                        <TextField label="Header Image URL" fullWidth value={headerURL} onChange={event => setHeaderURL(event.target.value)} />
                    </Box>
                    {headerURL ? (
                        <Box display={"flex"} paddingTop={3} justifyContent={"left"}>
                            <img src={headerURL} style={{width: "100%", borderRadius: 5}} />
                        </Box>
                    ) : (
                        ""
                    )}
                    <Box display={"flex"} paddingTop={3} justifyContent={"right"}>
                        <Button variant="contained" onClick={handleSubmit}>{gameId ? "Submit Edit" : "Add Game"}</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}