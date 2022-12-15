import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledHeadingXL = styled.h1`
  font-family: var(--heading-font);
  font-size: 2.4rem;
  text-align: center;
  margin: 1rem 0;
  padding: 0;
  color: ${(props: IStylingProps) => props.color || 'var(--dark-blue)'};

  @media ${devices.tablet} {
    font-size: 2.7rem;
  }
`

export const StyledHeadingL = styled.h2`
  font-family: var(--heading-font);
  font-size: 2.4rem;
  text-align: center;
  margin: 1rem 0;
  padding: 0;
  color: ${(props: IStylingProps) => props.color || 'var(--dark-blue)'};

  @media ${devices.tablet} {
    font-size: 2.5rem;
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
  color: ${(props: IStylingProps) => props.color || 'var(--dark-blue)'};
  text-transform: lowercase;
  letter-spacing: 0.05rem;
  font-size: 1.4rem;
  margin: 0 0 0 0.5rem;
  padding: 0;
  display: inline;

  @media ${devices.desktop} {
    margin: 0 0 0 1rem;
  }
`
