import styled, { keyframes } from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

// Keyframes
const rotate = keyframes`
  from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
`

const grow = keyframes`
  from {
      transform: scale(0.9);
    }
  
    to {
      transform: scale(1.1);
    }
`

const shrink = keyframes`
 from {
    transform: scale(1.1);
  }

  to {
    transform: scale(0.9);
  }
`

const inhale = keyframes`
 from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`

const exhale = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.5);
  }
`

export const StyledAnimation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .animation-outer-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3.5rem 0 0;
    height: 300px;
    width: 300px;
    position: relative;
    transform: scale(0.9);
  }

  .animation-outer-container.grow-478 {
    animation: ${grow} 4s linear forwards;
  }

  .animation-outer-container.grow-five {
    animation: ${grow} 5s linear forwards;
  }

  .animation-outer-container.grow-box {
    animation: ${grow} 4s linear forwards;
  }

  .animation-outer-container.shrink-478 {
    animation: ${shrink} 8s linear forwards;
  }

  .animation-outer-container.shrink-five {
    animation: ${shrink} 5s linear forwards;
  }

  .animation-outer-container.shrink-box {
    animation: ${shrink} 4s linear forwards;
  }

  .animate-circle.animate-circle-inhale {
    animation: ${inhale} 4s linear forwards;
  }

  .animate-circle.animate-circle-exhale {
    animation: ${exhale} 8s linear forwards;
  }

  .gradient-circle {
    height: 13.75rem;
    width: 13.75rem;
  }

  .animate-circle {
    background-color: ${(props: IStylingProps) =>
      props.bgColor || 'var(--dark-beige)'};
    height: 90%;
    width: 90%;
    border-radius: 50%;
    transform: scale(0.5);
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .animation-ball {
    background-color: ${(props: IStylingProps) =>
      props.bgColor || 'var(--dark-beige)'};
    outline: ${(props: IStylingProps) =>
      props.outline || '1px solid var(--mid-blue)'};
    border-radius: 50%;
    height: 1.3rem;
    width: 1.3rem;
    display: block;
  }
  .animation-ball-container-478 {
    position: absolute;
    top: -40px;
    left: 140px;
    width: 20px;
    height: 190px;
    animation: ${rotate} 19s linear forwards infinite;
    animation-play-state: paused;
    transform-origin: bottom center;
  }
  .animation-ball-container-box {
    position: absolute;
    top: -40px;
    left: 140px;
    width: 20px;
    height: 190px;
    animation: ${rotate} 12s linear forwards infinite;
    animation-play-state: paused;
    transform-origin: bottom center;
  }
  .animation-ball-container-five {
    position: absolute;
    top: -40px;
    left: 140px;
    width: 20px;
    height: 190px;
    animation: ${rotate} 10s linear forwards infinite;
    animation-play-state: paused;
    transform-origin: bottom center;
  }
  .animation-inner-container {
    background-color: ${(props: IStylingProps) =>
      props.bgColor || 'var(--dark-beige)'};
    outline: ${(props: IStylingProps) =>
      props.outline || '10px solid var(--light-beige)'};
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .animation-text {
    font-size: 3rem;
    text-align: center;
    font-weight: 100;
    z-index: 100;
    color: #010f1c;
  }

  .animation-button {
    padding: 0.7rem;
    margin: 0.5rem 0;
    width: 50%;
    border: 1px solid var(--light-beige);
    font-weight: 500;
    @media ${devices.tablet} {
      width: 30%;
    }
    @media ${devices.desktop} {
      width: auto;
      padding: 0.5rem 1.3rem;
      font-size: 0.9rem;
    }
  }
`
