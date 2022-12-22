import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { StyledHeroBg } from './styledComponents/Hero/StyledHero'
import Modal, { StyledModal } from './styledComponents/Modal/StyledModal'
import Navbar from './styledComponents/Navbar/StyledNavbar'
import { StyledGridWrapper } from './styledComponents/Wrappers/StyledGridWrapper'

export default function Layout() {
  const [modal, setModal] = useState(true)

  return (
    <>
      {modal ? (
        <Modal></Modal>
      ) : (
        <StyledGridWrapper>
          <Navbar />
          <main className="desktop-main-content">
            <StyledHeroBg>
              <Outlet></Outlet>
            </StyledHeroBg>
          </main>
        </StyledGridWrapper>
      )}
    </>
  )
}
