import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/auth/Login.jsx'
import { Register } from './components/auth/Register.jsx'
import { Authorized } from './views/Authorized.jsx'
import { ApplicationViews } from './views/ApplicationViews.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import { ThemeDark, ThemeLight } from './Theme.jsx'





export const App = () => {
  return (
    <ThemeProvider theme={ThemeDark}>
      <CssBaseline>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='*' element={
            <Authorized>
              <ApplicationViews/>
            </Authorized>
          }/>
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  )
}