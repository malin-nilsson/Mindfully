import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { StyledHeadingLogo } from '../Headings/StyledHeadings'

export default function NavbarStartpage() {
  return (
    <StyledNavStartpage>
      <NavLink to="/" className="logo">
        <span>
          <img src="/assets/logo-dkblue.png" alt="Mindfully Logo"></img>
        </span>
        <StyledHeadingLogo>Mindfully</StyledHeadingLogo>
      </NavLink>
    </StyledNavStartpage>
  )
}

export const StyledNavStartpage = styled.nav`
  .logo {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  img {
    max-height: 35px;
  }
`
