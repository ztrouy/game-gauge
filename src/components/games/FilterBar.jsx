import { useEffect, useState } from "react"
import { getAllGameTypes } from "../../services/gameTypeService.js"
import { getAllGenres } from "../../services/genreService.js"
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, ToggleButton, ToggleButtonGroup, Toolbar, useTheme } from "@mui/material"
import { ExpandMore, FilterAlt, Settings } from "@mui/icons-material"

export const FilterBar = ({ games, setFilteredGames, user }) => {
    const [gameTypes, setGameTypes] = useState([])
    const [genres, setGenres] = useState([])
    const [gamesToDisplay, setGamesToDisplay] = useState([])
    
    const [gameTypeFilter, setGameTypeFilter] = useState(0)
    const [genreFilter, setGenreFilter] = useState(0)
    const [titleFilter, setTitleFilter] = useState("")
    const [showOnlyOwnedGames, setShowOnlyOwnedGames] = useState(false)
    const [mobileFilterToDisplay, setMobileFilterToDisplay] = useState(0)
    const [mobileFilterToggle, setMobileFilterToggle] = useState(false)

    
    
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



    const theme = useTheme()
    
    
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
        <AppBar position="static" enableColorOnDark sx={{marginBottom: 3, backgroundColor: theme.palette.surface.default, backgroundImage: "none"}}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Grid container direction={"row"} justifyContent={"space-between"} marginBottom={3} paddingTop={3}>
                        <Box sx={{display: {xs: "none", md: "inline-block"}}}>
                            <Grid gap={1} container direction={"row"}>
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
                                <Button variant="contained" onClick={clearFilters}>Clear Filters</Button>
                            </Grid>
                        </Box>
                        <ToggleButtonGroup
                            value={showOnlyOwnedGames}
                            exclusive
                            onChange={handleGamesListToggle}
                            sx={{display: {xs: "none", md: "flex"}}}
                        >
                            <ToggleButton value={false}>
                                All Games
                            </ToggleButton>
                            <ToggleButton value={true}>
                                My Games
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Container disableGutters sx={{display: {xs: "block", md: "none"}}}>
                            <TextField 
                                id="outlined-search"
                                label="Search for a Game"
                                type="search"
                                value={titleFilter}
                                onChange={(event) => {
                                    setTitleFilter(event.target.value)
                                }}
                                fullWidth 
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => setMobileFilterToggle(!mobileFilterToggle)}>
                                            <FilterAlt />
                                        </IconButton>
                                    )
                                }}
                            />
                            {mobileFilterToggle ? (
                                <Container disableGutters sx={{marginTop: 2}}>
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
                                        </Box>
                                    ) : (
                                        ""
                                    )}
                                </Container>
                            ): (
                                ""
                            )}
                        </Container>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}