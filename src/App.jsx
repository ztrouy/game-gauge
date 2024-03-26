import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Authorized } from './views/Authorized.jsx'
import { ApplicationViews } from './views/ApplicationViews.jsx'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'


const theme = createTheme ({
  palette: {
    mode: 'dark',
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
  },
});


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='*' element={
          <Authorized>
            <ApplicationViews/>
          </Authorized>
        }/>
      </Routes>
    </ThemeProvider>
  )
}