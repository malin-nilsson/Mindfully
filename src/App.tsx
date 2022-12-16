import './App.css'
// REACT ROUTER //
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// COMPONENTS //
import Welcome from './components/pages/Welcome'
import Home from './components/pages/Home'
import Library from './components/pages/Library'
import Profile from './components/pages/Profile'
import Layout from './components/Layout'
import LayoutStartpage from './components/LayoutStartpage'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase/config'
import AuthRoute from './components/auth/AuthRoute'

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
            path="/library"
            element={
              <AuthRoute>
                <Library />
              </AuthRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
