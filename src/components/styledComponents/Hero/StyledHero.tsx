import styled from 'styled-components'
import { devices } from '../../Breakpoints/Breakpoints'

export const StyledHero = styled.div`
  background-image: url('/assets/wave-dkblue.svg');
  background-position: bottom;
  background-size: cover;
  height: 100vh;
  padding: 0 0 45rem;
  background-repeat: no-repeat;

  @media ${devices.tablet} {
    height: 100vh;
  }

  @media ${devices.desktop} {
    padding: 0 0 6rem;
    background-size: contain;
    background-attachment: fixed;
  }
`
