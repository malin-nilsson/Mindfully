import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledLandingPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;

  @media ${devices.desktop} {
    flex-direction: row;
    justify-content: center;
    overflow: hidden;
  }

  .landingpage-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${devices.desktop} {
      width: 50%;
    }

    &.blue {
      background-color: var(--mid-blue);
      height: 100%;
      overflow: hidden;

      @media ${devices.desktop} {
        width: 50%;
      }
    }

    &.beige {
      background-color: var(--dark-beige);
      padding: 0 0 3rem;
      @media ${devices.desktop} {
        overflow: scroll;
        padding: unset;
      }
    }

    &.signup {
      @media ${devices.desktop} {
        padding: 10rem 0 0;
      }
    }
  }
`
