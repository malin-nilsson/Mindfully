import styled from 'styled-components'
import { devices } from '../../Breakpoints/Breakpoints'

export const StyledHeadingL = styled.h2`
  font-family: var(--heading-font);
  font-size: 2.4rem;
  text-align: center;
  margin: 1rem 0;
  padding: 0;

  @media ${devices.tablet} {
    font-size: 2.7rem;
  }
`

export const StyledHeadingM = styled.h3`
  font-family: var(--heading-font);
  color: var(--dark-beige);
  font-size: 1.7rem;
  margin: 0;
  padding: 0;
  text-align: left;

  @media ${devices.tablet} {
    font-size: 2rem;
  }
`

export const StyledHeadingLogo = styled.h4`
  font-family: var(--logo-font);
  color: var(--dark-blue);
  text-transform: lowercase;
  letter-spacing: 0.15rem;
  font-size: 1.3rem;
  margin: 0 0 0 1rem;
  padding: 0;
  display: inline;
`
