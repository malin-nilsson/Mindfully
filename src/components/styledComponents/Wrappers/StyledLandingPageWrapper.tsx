import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledLandingPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;

  @media ${devices.desktop} {
    flex-direction: row;
  }

  .landingpage-box {
    width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    &.blue {
      background-color: var(--mid-blue);
      overflow: hidden;
    }

    &.beige {
      background-color: var(--dark-beige);
      overflow: scroll;
    }

    &.signup {
      padding: 2rem 0;

      @media ${devices.desktop} {
        padding: 10rem 0 0;
      }
    }
  }
`
