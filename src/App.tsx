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
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/config'
import AuthRoute from './components/auth/AuthRoute'
import Favorites from './components/pages/Favorites'
import MyJourney from './components/pages/MyJourney'

// Initialize Firebase
const app = initializeApp(firebaseConfig)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutStartpage />}>
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
  )
}

export default App
