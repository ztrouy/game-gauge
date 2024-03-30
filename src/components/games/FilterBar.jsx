import { useEffect, useState } from "react"
import { getAllGameTypes } from "../../services/gameTypeService.js"
import { getAllGenres } from "../../services/genreService.js"
import { AppBar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material"

export const FilterBar = ({ games, setFilteredGames, user }) => {
    const [gameTypes, setGameTypes] = useState([])
    const [genres, setGenres] = useState([])
    const [gamesToDisplay, setGamesToDisplay] = useState([])
    
    const [gameTypeFilter, setGameTypeFilter] = useState(0)
    const [genreFilter, setGenreFilter] = useState(0)
    const [titleFilter, setTitleFilter] = useState("")
    const [showOnlyOwnedGames, setShowOnlyOwnedGames] = useState(false)
    const [mobileFilterToDisplay, setMobileFilterToDisplay] = useState(0)

    
    
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
            const foundGames = gamesToDisplay.filter(game => game.gameGenres.find(gameGenre => gameGenre.genreId === genreFilter))
            setFilteredGames(foundGames)
        }
    }, [genreFilter, genres, gamesToDisplay])



    const clearFilters = () => {
        setShowOnlyOwnedGames(false)
        setGameTypeFilter(0)
        setGenreFilter(0)
        setTitleFilter("")
    }


    const handleGamesListToggle = (event, newToggle) => {
        if (newToggle !== null) {
            setShowOnlyOwnedGames(newToggle)
        }
    }

    const handleMobileFilter = (event, newToggle) => {
        if (newToggle !== null) {
            setMobileFilterToDisplay(newToggle)
        } else {
            setMobileFilterToDisplay(0)
        }
    }



    return (
        <AppBar position="static" sx={{marginBottom: 3}}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Grid container direction={"row"} justifyContent={"space-between"} marginBottom={3} paddingTop={3}>
                        <Box sx={{display: {xs: "none", md: "inline-block" }}}>
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
                        <ToggleButtonGroup
                            value={showOnlyOwnedGames}
                            exclusive
                            onChange={handleGamesListToggle}
                            sx={{display: {xs: "none", md: "inline-block"}}}
                        >
                            <ToggleButton value={false}>
                                All Games
                            </ToggleButton>
                            <ToggleButton value={true}>
                                My Games
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            value={showOnlyOwnedGames}
                            exclusive
                            onChange={handleGamesListToggle}
                            fullWidth
                            sx={{display: {md: "none"}}}
                        >
                            <ToggleButton value={false}>
                                All Games
                            </ToggleButton>
                            <ToggleButton value={true}>
                                My Games
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            exclusive
                            fullWidth
                            sx={{display: {md: "none"}, marginTop: 2}}
                            value={mobileFilterToDisplay}
                            onChange={handleMobileFilter}
                        >
                            <ToggleButton value={1}>Type</ToggleButton>
                            <ToggleButton value={2}>Genre</ToggleButton>
                            <ToggleButton value={3}>Title</ToggleButton>
                        </ToggleButtonGroup>
                        {mobileFilterToDisplay !== 0 ? (
                            <Box sx={{display: {xs: "block", md: "none"}, width: "100%", marginTop: 3}}>
                                {mobileFilterToDisplay === 1 ? (
                                    <FormControl fullWidth>
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
                                ) : (
                                    ""
                                )}
                                {mobileFilterToDisplay === 2 ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Filter by Genre</InputLabel>
                                        <Select
                                            value={genreFilter}
                                            label="Filter by Genre"
                                            fullWidth
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
                                ) : (
                                    ""
                                )}
                                {mobileFilterToDisplay === 3 ? (
                                    <TextField 
                                        id="outlined-search"
                                        label="Search for a Game"
                                        type="search"
                                        fullWidth
                                        value={titleFilter}
                                        onChange={(event) => {
                                            setTitleFilter(event.target.value)
                                        }}
                                    />
                                ) : (
                                    ""
                                )}
                            </Box>
                        ) : (
                            ""
                        )}
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}