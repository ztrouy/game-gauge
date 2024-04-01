import { createTheme } from "@mui/material"

export const ThemeLight = createTheme ({
    palette: {
        mode: 'light',
        primary: {
            main: '#00a65a',
        },
        secondary: {
            main: '#313e52',
        },
        info: {
            main: '#396fde',
            dark: '#396fde',
        },
        error: {
            main: '#ed3131',
            dark: '#ed3131',
        },
        warning: {
            main: '#ff7b2a',
            dark: '#ea681d',
        },
        success: {
            main: '#00a25d',
            dark: '#00a25d',
        },
        surface: {
            default: '#ffffff'
        }
    }
})


export const ThemeDark = createTheme ({
    palette: {
        mode: 'dark',
        background: {
            default: '#232e3c'
        },
        primary: {
            main: '#2dac5a'
        },
        secondary: {
            main: '#313e52',
        },
        info: {
            main: '#396fde',
            dark: '#396fde',
        },
        error: {
            main: '#ed3131',
            dark: '#ed3131',
        },
        warning: {
            main: '#ff7b2a',
            dark: '#ea681d',
        },
        success: {
            main: '#00a25d',
            dark: '#00a25d',
        },
        surface: {
            default: '#2f3e51'
        }
    },
    components: {
        MuiCard: {
            defaultProps: {
                sx: {backgroundColor: "#2f3e51", backgroundImage: "none"}
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 3
            }
        }, 
        MuiButton: {
            defaultProps: {
                sx: {color: 'white'}
            }
        },
        MuiAppBar: {
            defaultProps: {
                sx: {backgroundImage: "none"}
            }
        }
    }
})