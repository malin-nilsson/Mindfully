import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { StyledHeadingLogo } from '../Headings/StyledHeadings'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { StyledLogoIcon } from '../Logo/StyledLogoIcon'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

export default function Navbar() {
  const [isActive, setIsActive] = useState<Boolean>(false)

  const toggleMobileMenu = () => {
    setIsActive((isActive) => !isActive)
  }

  return (
    <StyledNav>
      <StyledLogoIcon>
        <Link to="/" className="logo-wrapper">
          <span>
            {' '}
            <img src="/assets/logo-dkblue.png" alt="Mindfully logo"></img>
          </span>
          <span>
            <StyledHeadingLogo>Mindfully</StyledHeadingLogo>
          </span>
        </Link>
      </StyledLogoIcon>
      <StyledNavLinks className={isActive ? 'mobile-menu' : ''}>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isActive ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </div>

        <ul
          style={{
            display: isActive && 'flex',
            flexDirection: isActive && 'column',
          }}
          className={isActive ? 'mobile-menu' : ''}
        >
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <HomeIcon />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <PersonIcon /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/library"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <LibraryBooksIcon /> Library
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <span>
                <QuestionAnswerIcon />{' '}
              </span>
              <span>Talk to Mindfully</span>
            </NavLink>
          </li>
        </ul>
      </StyledNavLinks>
    </StyledNav>
  )
}

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--text-font);
  position: relative;
  z-index: 3;
  border-bottom: 1px solid var(--dark-beige);

  @media ${devices.desktop} {
    flex-direction: column;
    width: 100%;
    border-bottom: unset;
    align-items: flex-start;
    padding: 0;
  }

  ul {
    display: none;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    @media ${devices.desktop} {
      margin-top: 9rem;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    li {
      width: 100%;
    }

    li a {
      width: 100%;
      color: var(--dark-blue);
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 300;
      padding: 1.2rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      @media ${devices.desktop} {
        font-size: 1.03rem;
        gap: 1rem;
        padding: 1.7rem;
        transition: background-color 0.2s ease-in-out;
        width: unset;

        &:hover {
          background-color: var(--light-beige);
        }
      }
    }
  }

  // STYLING FOR ACTIVE LINK
  .active-link {
    background-color: var(--light-beige);
    color: var(--dark-blue);
  }

  // MOBILE MENU STYLING
  .mobile-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0;

    li {
      margin: 0.6rem 0;

      @media ${devices.desktop} {
        margin: unset;
      }
    }
  }
  .mobile-menu-icon {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    width: 100%;

    @media ${devices.desktop} {
      display: none;
    }

    svg {
      padding: 20px;
    }
  }
`
