import './App.css'
// REACT ROUTER //
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// COMPONENTS //
import Welcome from './components/pages/Welcome'
import Home from './components/pages/Home'
import Explore from './components/pages/Explore'
import Profile from './components/pages/Profile'
import Layout from './components/Layout'
import LayoutStartpage from './components/LayoutStartpage'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import AuthRoute from './components/auth/AuthRoute'
import RedirectRoute from './utils/redirectUser'
import Favorites from './components/pages/Favorites'
import MyJourney from './components/pages/MyJourney'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { UserContext, defaultValue, UserInterface } from './context/UserContext'
import { IUser } from './models/IUser'

function App() {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState<UserInterface>(defaultValue)

  useEffect(() => {
    const getCurrentUser = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        const name = user.displayName as string
        const firstName = name.split(' ')[0]
        let date = new Date(user.metadata.creationTime as string).toDateString()

        const userObject: IUser = {
          id: user.uid,
          displayName: firstName,
          email: user.email,
          metadata: {
            creationTime: date,
          },
        }

        setCurrentUser({ ...user, user: userObject })
      } else {
        console.log('Not logged in')
      }
    })
    return () => getCurrentUser()
  }, [auth])

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutStartpage />}>
            <Route
              index
              element={
                <RedirectRoute>
                  <Welcome />
                </RedirectRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectRoute>
                  <Login />
                </RedirectRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectRoute>
                  <Signup />
                </RedirectRoute>
              }
            />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <Profile />
                </AuthRoute>
              }
            />

            <Route
              path="/explore"
              element={
                <AuthRoute>
                  <Explore />
                </AuthRoute>
              }
            />

            <Route
              path="/journey"
              element={
                <AuthRoute>
                  <MyJourney />
                </AuthRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <AuthRoute>
                  <Favorites />
                </AuthRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
