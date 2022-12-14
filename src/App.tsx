import './App.css'
// REACT ROUTER //
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// COMPONENTS //
import Layout from './components/Layout'
import Welcome from './components/pages/Welcome'
import Home from './components/pages/Home'
import Library from './components/pages/Library'
import Profile from './components/pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
