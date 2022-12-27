import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledLogoIcon = styled.div`
  position: ${(props: IStylingProps) => props.position || 'absolute'};
  padding: 1rem;
  z-index: 7;
  cursor: pointer;

  @media ${devices.desktop} {
    position: ${(props: IStylingProps) => props.position || ''};
    padding: 2rem 1.6rem 1rem;
  }
  img {
    height: 2.7rem;
    width: 2.7rem;
    transition: scale 0.15s ease-in-out;
    &:hover {
      scale: 1.1;
    }
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
