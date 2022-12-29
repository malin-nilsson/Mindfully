import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { StyledHeadingLogo } from '../Headings/StyledHeadings'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { StyledLogoIcon } from '../Logo/StyledLogoIcon'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import AppsIcon from '@mui/icons-material/Apps'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { getAuth, signOut } from 'firebase/auth'
import { StyledButton } from '../Button/StyledButton'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'

export default function Navbar() {
  const [isActive, setIsActive] = useState<Boolean>(false)
  const auth = getAuth()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsActive((isActive) => !isActive)
  }

  return (
    <StyledNav>
      <StyledLogoIcon>
        <Link to="/home" className="logo-wrapper">
          <StyledImageWrapper>
            <img src="/assets/logo/logo-dkblue.png" alt="Mindfully logo"></img>
          </StyledImageWrapper>
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
              to="/explore"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <AppsIcon /> Explore
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
              to="/journey"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <MenuBookIcon />
              My Journey
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => (isActive ? toggleMobileMenu() : '')}
            >
              <FavoriteIcon /> Favorites
            </NavLink>
          </li>
          <StyledFlexWrapper padding="0" margin="0" width="100%">
            <StyledButton
              fontSize="0.9rem"
              bgColor="var(--dark-beige)"
              color="var(--mid-blue)"
              border="1px solid var(--mid-blue)"
              margin="0.5rem 0 0"
              className="navbar-signout-btn"
              onClick={() => {
                signOut(auth)
              }}
            >
              Sign out
            </StyledButton>
          </StyledFlexWrapper>
        </ul>
      </StyledNavLinks>
    </StyledNav>
  )
}

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;

  @media ${devices.desktop} {
    position: fixed;
    width: 20%;
  }

  .navbar-signout-btn {
    width: 90%;
    @media ${devices.tablet} {
      width: 30%;
      margin-right: auto;
    }
    @media ${devices.desktop} {
      width: 80%;
      margin: 1rem auto;
    }
  }
`
const StyledNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: var(--text-font);
  position: relative;
  z-index: 5;
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
      margin: 7rem 0 1rem;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    li {
      width: 100%;
    }

    li a {
      width: 100%;
      color: var(--mid-blue);
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: 300;
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
    color: var(--mid-blue);
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
