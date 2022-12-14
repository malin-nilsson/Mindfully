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
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
