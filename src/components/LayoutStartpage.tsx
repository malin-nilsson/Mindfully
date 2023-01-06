import { Outlet } from 'react-router-dom'
import { StyledHero } from './styledComponents/Hero/StyledHero'
import NavbarStartpage from './styledComponents/Navbar/StyledNavStartpage'

export default function LayoutStartpage() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}
