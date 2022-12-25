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
import NotFound from './components/pages/NotFound'

function App() {
  return (
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
          <Route path="*" element={<NotFound />} />
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
          <Route
            path="*"
            element={
              <AuthRoute>
                <NotFound />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
