import { Outlet } from 'react-router-dom'
import { StyledHeroBg } from './styledComponents/Hero/StyledHero'
import Navbar from './styledComponents/Navbar/StyledNavbar'
import { StyledGridWrapper } from './styledComponents/Wrappers/StyledGridWrapper'

export default function Layout() {
  return (
    <StyledGridWrapper>
      <Navbar />
      <main className="desktop-main-content">
        <StyledHeroBg>
          <Outlet></Outlet>
        </StyledHeroBg>
      </main>
    </StyledGridWrapper>
  )
}
