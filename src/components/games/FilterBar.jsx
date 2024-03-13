import { useEffect, useState } from "react"
import { getAllGameTypes } from "../../services/gameTypeService.js"
import { getAllGenres } from "../../services/genreService.js"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { getUserById } from "../../services/userService.jsx"

export const FilterBar = ({ games, setFilteredGames, currentUser }) => {
    const [gameTypes, setGameTypes] = useState([])
    const [genres, setGenres] = useState([])
    const [user, setUser] = useState({})
    const [gamesToDisplay, setGamesToDisplay] = useState([])
    
    const [gameTypeFilter, setGameTypeFilter] = useState(0)
    const [genreFilter, setGenreFilter] = useState(0)
    const [titleFilter, setTitleFilter] = useState("")
    const [showOnlyOwnedGames, setShowOnlyOwnedGames] = useState(false)


    useEffect(() => {
        getUserById(currentUser.id).then(usersArray => {
            const userObject = usersArray[0]
            setUser(userObject)
        })
    }, [games, currentUser])
    
    
    useEffect(() => {
        if (showOnlyOwnedGames) {
            const ownedGames = games.filter(game => user.userGames.find(userGame => userGame.gameId === game.id))
            setGamesToDisplay(ownedGames)
        } else {
            setGamesToDisplay(games)
        }
    }, [games, showOnlyOwnedGames])


    useEffect(() => {
        getAllGameTypes().then(gameTypesArray => {
            setGameTypes(gameTypesArray)
        })
        getAllGenres().then(genresArray => {
            setGenres(genresArray)
        })
    }, [])


    useEffect(() => {
        const foundGames = gamesToDisplay.filter(game => game.name.toLowerCase().includes(titleFilter.toLowerCase()))
        setFilteredGames(foundGames)
    }, [titleFilter, gamesToDisplay])
    

    useEffect(() => {
        if (gameTypeFilter === 0) {
            setFilteredGames(gamesToDisplay)
        } else {
            const foundGames = gamesToDisplay.filter(game => game.type.id === gameTypeFilter)
            setFilteredGames(foundGames)
        }
    }, [gameTypeFilter, gameTypes, gamesToDisplay])


    useEffect(() => {
        if (genreFilter === 0) {
            setFilteredGames(gamesToDisplay)
        } else {
            const foundGames = games.filter(game => game.gameGenres.find(gameGenre => gameGenre.genreId === genreFilter))
            setFilteredGames(foundGames)
        }
    }, [genreFilter, genres, gamesToDisplay])



    const clearFilters = () => {
        setShowOnlyOwnedGames(false)
        setGameTypeFilter(0)
        setGenreFilter(0)
        setTitleFilter("")
    }



    return (
        <Grid container direction={"row"} justifyContent={"space-between"} marginBottom={3} paddingTop={3}>
            <Box>
                <Grid container direction={"row"}>
                    <FormControl sx={{width: 200}}>
                        <InputLabel>Filter by Game Type</InputLabel>
                        <Select
                            value={gameTypeFilter}
                            label="Filter by Game Type"
                            onChange={(event) => {
                                setGameTypeFilter(event.target.value)
                            }}
                        >
                            <MenuItem value={0} key={0}>Select a Game Type</MenuItem>
                            {gameTypes.map(gameType => {
                                return <MenuItem value={gameType.id} key={gameType.id}>{gameType.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: 200}}>
                        <InputLabel>Filter by Genre</InputLabel>
                        <Select
                            value={genreFilter}
                            label="Filter by Genre"
                            onChange={(event) => {
                                setGenreFilter(event.target.value)
                            }}
                        >
                            <MenuItem value={0} key={0}>Select a Genre</MenuItem>
                            {genres.map(genre => {
                                return <MenuItem value={genre.id} key={genre.id}>{genre.genre}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField 
                        id="outlined-search"
                        label="Search for a Game"
                        type="search"
                        value={titleFilter}
                        onChange={(event) => {
                            setTitleFilter(event.target.value)
                        }}
                    />
                    <Button variant="outlined" onClick={clearFilters}>Clear Filters</Button>
                </Grid>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
                <Grid>
                    <Button
                        variant="outlined"
                        onClick={() => {setShowOnlyOwnedGames(false)}}
                    >
                        All
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {setShowOnlyOwnedGames(true)}}
                    >
                        My
                    </Button>
                </Grid>
            </Box>
        </Grid>
    )
}