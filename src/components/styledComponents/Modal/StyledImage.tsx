import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledImageModal = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: ${(props: IStylingProps) => props.backgroundImage || ''};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  overflow: hidden;

  @media ${devices.desktop} {
    justify-content: flex-start;
  }

  .modal-card {
    padding: 0.5rem;
    width: 80%;
    height: 12rem;
    gap: 1rem;

    @media ${devices.tablet} {
      padding: 1rem 1.5rem;
    }

    @media ${devices.desktop} {
      padding: 1rem 1.5rem;
      width: 25rem;
      height: 13rem;
      justify-content: center;
      gap: 1.5rem;
    }
  }

  .icon {
    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: translate(-0.1rem, -0.2rem);
    }
  }

  .description {
    border-bottom: 2px solid var(--mid-blue);
    @media ${devices.desktop} {
      width: 55%;
    }
    p {
      margin: 0.2rem 0 0.4rem;
      padding: 0.5rem;
      font-size: 1rem;
      font-weight: 300;
      text-align: center;

      @media ${devices.desktop} {
        padding: 0;
      }
    }
  }
`
