import { Outlet } from 'react-router-dom'
import Navbar from './styledComponents/Navbar/Navbar'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}
