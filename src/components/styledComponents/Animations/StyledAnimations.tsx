import { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { IMeditation } from '../../../models/IMeditation'
import { devices } from '../../breakpoints/Breakpoints'
import { StyledButton } from '../Button/StyledButton'
import { IStylingProps } from '../models/IStylingProps'

interface IAnimationProps {
  meditation: IMeditation
  handleTime: (time: Date | number) => void
}

export default function Animation(props: IAnimationProps) {
  const [isMeditating, setIsMeditating] = useState(false)

  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  // Refs for animation
  const outerContainer = useRef<HTMLDivElement | null>(null)
  const circle = useRef<HTMLDivElement | null>(null)
  const text = useRef<HTMLParagraphElement | null>(null)
  const ball = useRef<HTMLDivElement | null>(null)
  const button = useRef<HTMLButtonElement | null>(null)
  //

  const handleFourBreathing = () => {
    props.handleTime(new Date())
    fourBreathing()
  }

  const handleBoxBreathing = () => {
    props.handleTime(new Date())
    boxBreathing()
  }

  const handleFiveBreaths = () => {
    props.handleTime(new Date())
    fiveMindfulBreaths()
  }

  ////////////////////
  /// BOX BREATHING //
  ////////////////////
  const boxBreathing = () => {
    setIsMeditating(true)

    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      boxBreathing()
    }, props.meditation.totalTime)

    interval.current = id
    console.log(interval.current)

    if (
      text.current &&
      outerContainer.current &&
      circle.current &&
      ball.current &&
      button.current
    ) {
      button.current.style.display = 'none'
      ball.current.style.animationPlayState = 'running'
      text.current.innerText = 'Breathe In'
      outerContainer.current.className = 'animation-outer-container grow-box'

      setTimeout(() => {
        if (text.current) {
          text.current.innerText = 'Hold'
        }

        setTimeout(() => {
          if (text.current && outerContainer.current && circle.current) {
            text.current.innerText = 'Breathe Out'
            outerContainer.current.className =
              'animation-outer-container shrink-box'
          }
        }, props.meditation.holdTime)
      }, props.meditation.breatheTime)
    }
  }

  //////////////////////
  /// 4-7-8 BREATHING //
  //////////////////////
  const fourBreathing = () => {
    setIsMeditating(true)

    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      fourBreathing()
    }, props.meditation.totalTime)

    interval.current = id

    if (
      text.current &&
      outerContainer.current &&
      circle.current &&
      ball.current &&
      button.current
    ) {
      button.current.style.display = 'none'
      ball.current.style.animationPlayState = 'running'
      text.current.innerText = 'Breathe In'
      outerContainer.current.className = 'animation-outer-container grow-478'
      circle.current.className = 'animate-circle animate-circle-inhale'

      setTimeout(() => {
        if (text.current) {
          text.current.innerText = 'Hold'
        }

        setTimeout(() => {
          if (text.current && outerContainer.current && circle.current) {
            text.current.innerText = 'Breathe Out'
            outerContainer.current.className =
              'animation-outer-container shrink-478'
            circle.current.className = 'animate-circle animate-circle-exhale'
          }
        }, props.meditation.holdTime)
      }, props.meditation.breatheTime)
    }
  }

  //////////////////////////
  // FIVE MINDFUL BREATHS //
  //////////////////////////
  const fiveMindfulBreaths = () => {
    setIsMeditating(true)

    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      fiveMindfulBreaths()
    }, props.meditation.totalTime)

    interval.current = id

    if (
      text.current &&
      outerContainer.current &&
      circle.current &&
      ball.current &&
      button.current
    ) {
      button.current.style.display = 'none'
      ball.current.style.animationPlayState = 'running'
      text.current.innerText = 'Breathe In'
      outerContainer.current.className = 'animation-outer-container grow-five'

      setTimeout(() => {
        if (text.current && outerContainer.current && circle.current) {
          text.current.innerText = 'Breath Out'
          outerContainer.current.className =
            'animation-outer-container shrink-five'
          circle.current.className = 'animate-circle animate-circle-exhale'
        }
      }, props.meditation.breatheTime)
    }
  }

  const applyClass = () => {
    if (
      props.meditation.title === '4-7-8 Breathing Technique' &&
      ball.current
    ) {
      return 'animation-ball-container-478'
    } else if (
      props.meditation.title === 'Box Breathing Technique' &&
      ball.current
    ) {
      return 'animation-ball-container-box'
    } else if (
      props.meditation.title === 'Five Mindful Breaths' &&
      ball.current
    ) {
      return 'animation-ball-container-five'
    }
  }

  return (
    <StyledAnimation>
      <div ref={outerContainer} className="animation-outer-container">
        <div className="animation-inner-container"></div>
        <div ref={circle} className="animate-circle" id="animate-circle">
          <p ref={text} className="animation-text">
            Ready?
          </p>
        </div>

        <div ref={ball} className={applyClass()}>
          <span className="animation-ball"></span>
        </div>
        <div className="gradient-circle"></div>
      </div>
      <StyledButton
        className="animation-button"
        onClick={() => {
          if (props.meditation.title === '4-7-8 Breathing Technique') {
            handleFourBreathing()
          } else if (props.meditation.title === 'Box Breathing Technique') {
            handleBoxBreathing()
          } else {
            handleFiveBreaths()
          }
        }}
        ref={button}
      >
        Start
      </StyledButton>
    </StyledAnimation>
  )
}

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
      width: 10%;
    }
  }
`
