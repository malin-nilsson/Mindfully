import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { StyledHeadingLogo } from '../Headings/StyledHeadings'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'

export default function NavbarStartpage() {
  return (
    <StyledNavStartpage>
      <NavLink to="/" className="logo">
        <StyledImageWrapper maxHeight="25px" margin="00">
          <img src="/assets/logo/logo-dkblue.png" alt="Mindfully Logo"></img>
        </StyledImageWrapper>
        <StyledHeadingLogo>Mindfully</StyledHeadingLogo>
      </NavLink>
    </StyledNavStartpage>
  )
}

export const StyledNavStartpage = styled.nav`
  max-width: 13rem;

  .logo {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
  }
`
