import { Outlet } from 'react-router-dom'
import Navbar from './styledComponents/Navbar/Navbar'
import { StyledGridWrapper } from './styledComponents/Wrappers/StyledGridWrapper'

export default function Layout() {
  return (
    <StyledGridWrapper>
      <Navbar />
      <main className="desktop-main-content">
        <Outlet></Outlet>
      </main>
    </StyledGridWrapper>
  )
}
