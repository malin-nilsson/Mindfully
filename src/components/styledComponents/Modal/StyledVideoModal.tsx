import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'

export const StyledVideo = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 25;

  @media ${devices.desktop} {
    justify-content: space-between;
    align-items: flex-start;
  }

  .video-container {
    width: 100vw;
  }

  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    object-position: top;
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
  }

  .modal-wrapper {
    position: relative;
    margin-left: auto;
    padding: 1rem 1rem 2rem;

    @media ${devices.tablet} {
      padding: 1rem;
    }
  }

  .modal-footer-wrapper {
    gap: 0.5rem;
    margin: 0;
    position: fixed;
    top: 50;
    width: 100%;

    @media ${devices.tablet} {
      gap: 2rem;
      margin: 0 1rem 1rem;
    }

    @media ${devices.desktop} {
      position: fixed;
      bottom: 0;
      width: unset;
    }
  }

  .modal-card {
    padding: 0.5rem;
    width: 80%;
    height: 12rem;
    gap: 1rem;

    @media ${devices.tablet} {
      width: 60%;
    }

    @media ${devices.desktop} {
      padding: 1rem 1.5rem;
      width: 15rem;
      height: 12rem;
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
`
