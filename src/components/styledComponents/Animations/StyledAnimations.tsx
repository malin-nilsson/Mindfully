import React, { useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { IMeditation } from '../../../models/IMeditation'
import { StyledButton } from '../Button/StyledButton'
import { StyledHeadingM } from '../Headings/StyledHeadings'

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
  /// Box Breathing animation //
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
      text.current.innerText = 'Breathe In!'
      outerContainer.current.className = 'animation-outer-container grow-box'

      setTimeout(() => {
        if (text.current) {
          text.current.innerText = 'Hold'
        }

        setTimeout(() => {
          if (text.current && outerContainer.current && circle.current) {
            text.current.innerText = 'Breathe Out!'
            outerContainer.current.className =
              'animation-outer-container shrink-box'
          }
        }, props.meditation.holdTime)
      }, props.meditation.breatheTime)
    }
  }

  /// 4-7-8 Breathing animation //
  const fourBreathing = () => {
    setIsMeditating(true)

    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      fourBreathing()
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
      text.current.innerText = 'Breathe In!'
      outerContainer.current.className = 'animation-outer-container grow-478'
      circle.current.className = 'animate-circle animate-circle-inhale'

      setTimeout(() => {
        if (text.current) {
          text.current.innerText = 'Hold'
        }

        setTimeout(() => {
          if (text.current && outerContainer.current && circle.current) {
            text.current.innerText = 'Breathe Out!'
            outerContainer.current.className =
              'animation-outer-container shrink-478'
            circle.current.className = 'animate-circle animate-circle-exhale'
          }
        }, props.meditation.holdTime)
      }, props.meditation.breatheTime)
    }
  }

  return (
    <StyledAnimation>
      <StyledHeadingM color="var(--dark-blue)">
        {props.meditation.title}
      </StyledHeadingM>

      <div
        ref={outerContainer}
        className="animation-outer-container"
        id="animation-container"
      >
        <div className="animation-inner-container"></div>
        <div ref={circle} className="animate-circle" id="animate-circle">
          <p ref={text} className="animation-text">
            Ready?
          </p>
        </div>

        <div
          ref={ball}
          className={
            props.meditation.title === '4-7-8 Breathing Technique'
              ? 'animation-ball-container-478'
              : 'animation-ball-container-box'
          }
        >
          <span className="animation-ball"></span>
        </div>
        <div className="gradient-circle"></div>
      </div>
      <StyledButton
        className="animation-button"
        width="10%"
        onClick={() => {
          props.meditation.title === '4-7-8 Breathing Technique'
            ? handleFourBreathing()
            : handleBoxBreathing()
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
  margin: 4.5rem 0 1.5rem;
  height: 300px;
  width: 300px;
  position: relative;
  transform: scale(0.9);
}

.animation-outer-container.grow-478 {
  animation: ${grow} 4s linear forwards;
}

.animation-outer-container.grow-box {
  animation: ${grow} 4s linear forwards;
}

.animation-outer-container.shrink-478 {
  animation: ${shrink} 8s linear forwards;
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
  background-color: var(--dark-beige);
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
  background-color: var(--mid-blue);
  outline: 2px solid var(--dark-beige);
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
  .animation-inner-container {
  background-color: var(--mid-blue);
  outline: 10px solid var(--dark-beige);
  height: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.animation-text {
  font-size: 2rem;
  z-index: 900;
  color: #010f1c;
}

.animation-button {
    padding: 1rem;
    margin: 0.5rem 0;
}









  /* .animation-outer-wrapper {
    background-color: var(--mid-blue);
    border: 10px solid var(--dark-beige);
    border-radius: 50%;
    width: 22rem;
    height: 22rem;
    margin: 2.5rem 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  } */
/* 
  .animation-ball {
    background: var(--mid-blue);
    border: 1px solid var(--dark-beige);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    position: absolute;
    top: -2rem;
    left: 10.5rem;
    /* animation: ${rotate} 19s linear forwards infinite;
    animation-play-state: running;
    transform-origin: bottom center; */
  /* } */ 
  /* .animation-inner-wrapper {
    width: 100%;
    background-color: var(--dark-beige);
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: var(--dark-blue);
      font-size: 1.3rem;
    }
  } */
`