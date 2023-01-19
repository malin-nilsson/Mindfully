import { useRef, useState } from 'react'
// DATE FNS //
import { differenceInSeconds } from 'date-fns'
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// STYLED COMPONENTS //
import { StyledButton } from '../Button/StyledButton'
import { StyledAnimation } from './StyledAnimation'
// SERVICES //
import { saveProgress } from '../../../services/saveProgress'

interface IAnimationProps {
  meditation: IMeditation
  handleTime: (time: Date | number) => void
  handleInterval: (interval: NodeJS.Timer) => void
  stopMeditation: () => void
  handleSnackbar: () => void
}

export default function Animation(props: IAnimationProps) {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [intervalNo, setintervalNo] = useState<ReturnType<
    typeof setInterval
  > | null>(null)
  // Refs for animation //
  const outerContainer = useRef<HTMLDivElement | null>(null)
  const circle = useRef<HTMLDivElement | null>(null)
  const text = useRef<HTMLParagraphElement | null>(null)
  const ball = useRef<HTMLDivElement | null>(null)
  const button = useRef<HTMLButtonElement | null>(null)

  const handleFourBreathing = () => {
    props.handleTime(new Date())
    fourBreathing()
  }

  const handleBoxBreathing = () => {
    props.handleTime(new Date())
    boxBreathing()
  }

  const handleFiveBreaths = () => {
    handleTime(new Date())
    fiveMindfulBreaths()
  }

  //////////////////////////////
  /// BOX BREATHING ANIMATION //
  /////////////////////////////
  const boxBreathing = () => {
    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      boxBreathing()
    }, props.meditation.totalTime)

    interval.current = id
    props.handleInterval(interval.current)

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

  ////////////////////////////////
  /// 4-7-8 BREATHING ANIMATION //
  ////////////////////////////////
  const fourBreathing = () => {
    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      fourBreathing()
    }, props.meditation.totalTime)

    interval.current = id
    props.handleInterval(interval.current)

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

  ///////////////////////////////////////////////
  // STOP FIVE MINDFUL BREATHS & SAVE PROGRESS //
  ///////////////////////////////////////////////
  /* We have to handle Five Mindful Breaths in this
  component due to different functionality */
  let startTime: number | Date
  const handleTime = (time: number | Date) => {
    startTime = time
  }
  const stopMeditation = () => {
    clearInterval(intervalNo as NodeJS.Timer)
    // get time / results & save
    const result = differenceInSeconds(new Date(), startTime as number)
    saveTime(result)
  }
  const saveTime = async (time: number) => {
    const timeFormat: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    const meditation = {
      seconds: time,
      meditation: props.meditation,
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', timeFormat),
    }

    if (time === 0 || Number.isNaN(time)) {
      return
    }
    saveProgress(meditation)
    props.handleSnackbar()
  }

  const handleInterval = (interval: NodeJS.Timer) => {
    setintervalNo(interval)
  }

  ////////////////////////////////////
  // FIVE MINDFUL BREATHS ANIMATION //
  ////////////////////////////////////
  let breath = 0
  const fiveMindfulBreaths = () => {
    if (interval.current) clearInterval(interval.current)
    breath++
    interval.current && handleInterval(interval.current)

    // After five breaths, stop medtitation
    if (breath > 5 && ball.current && outerContainer.current && text.current) {
      ball.current.style.animationPlayState = 'paused'
      outerContainer.current.classList.remove('grow-five')
      text.current.innerHTML = 'Session completed &#127882;'
      stopMeditation()

      return
    }
    // Until then, keep going
    else {
      const id = setInterval(() => {
        fiveMindfulBreaths()
      }, props.meditation.totalTime)

      interval.current = id
      props.handleInterval(interval.current)

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
  }

  // Apply class depending on type of meditation
  const applyClass = () => {
    if (props.meditation.title === '4-7-8 Breathing Technique') {
      return 'animation-ball-container-478'
    } else if (props.meditation.title === 'Box Breathing Technique') {
      return 'animation-ball-container-box'
    } else if (props.meditation.title === 'Five Mindful Breaths') {
      return 'animation-ball-container-five'
    }
  }

  return (
    <StyledAnimation>
      <div ref={outerContainer} className="animation-outer-container">
        <div className="animation-inner-container safari_only"></div>
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
