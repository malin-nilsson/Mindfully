import styled from 'styled-components'
import { devices } from '../../Breakpoints/Breakpoints'

export const StyledHero = styled.div`
  background-image: url('/assets/wave-beige.svg');
  background-position: bottom;
  background-size: cover;
  height: 100vh;
  padding-bottom: 18rem;
  background-repeat: no-repeat;

  @media ${devices.desktop} {
    padding-bottom: unset;
    background-size: contain;
    background-attachment: fixed;
  }
`
