import { useRef, useState } from 'react'
import { IMeditation } from '../../../models/IMeditation'
import { StyledButton } from '../Button/StyledButton'
import { StyledAnimation } from './StyledAnimation'

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
