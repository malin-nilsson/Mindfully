import { useEffect, useRef, useState } from 'react'
// STYLED COMPONENTS/
import { devices } from '../../breakpoints/Breakpoints'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import { StyledButton } from '../Button/StyledButton'
import { StyledTimerCard } from '../Card/Card'
import { StyledHeadingXS, StyledHeadingM } from '../Headings/StyledHeadings'
import styled from 'styled-components'
// MUI //
import UpdateIcon from '@mui/icons-material/Update'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { Slider } from '@mui/material'
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// DATE DNS //
import { differenceInSeconds } from 'date-fns'
// FIREBASE //
import { arrayUnion, updateDoc } from 'firebase/firestore'
import { getFavorites } from '../../../utils/getFavorites'
import { getProgress } from '../../../utils/getProgress'
import { getUser } from '../../../utils/getUser'
import { motion } from 'framer-motion'

interface IModalProps {
  meditation: IMeditation
  closeModal: () => void
}

export default function VideoModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)
  const [isMeditating, setIsMeditating] = useState(false)
  const [sliderValue, setSliderValue] = useState(5)
  const [startTime, setStartTime] = useState<Date | number>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [timer, setTimer] = useState('00:00:00')
  const [showTimer, setShowTimer] = useState(true)

  useEffect(() => {
    fillFavorite()
  }, [fillHeart, sliderValue])

  /////////////////////
  // TIMER FUNCTIONS //
  ////////////////////
  const getTimeRemaining = (e: string) => {
    const total = Date.parse(e) - Date.parse(new Date().toString())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)

    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)

    if (total >= 1) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      )
    } else if (total === 0) {
      setTimer('00' + ':' + '00' + ':' + '00')
      stopMeditation()
    }
  }

  const clearTimer = (e?: Date, time?: number) => {
    const minutes = () => {
      if (time && time < 9) {
        return `0${time}`
      } else {
        return time
      }
    }

    setTimer(`00:${minutes()}:00`)
    if (interval.current) clearInterval(interval.current)

    const id = setInterval(() => {
      startTimer(e)
    }, 1000)

    interval.current = id
  }

  const getDeadTime = (time: number) => {
    let deadline = new Date()

    deadline.setMinutes(deadline.getMinutes() + time)

    return deadline
  }

  const onClickReset = (value: number) => {
    clearTimer(getDeadTime(value), value)
  }

  ////////////////////////////
  // FILL HEART IF FAVORITE //
  ////////////////////////////
  const fillFavorite = async () => {
    const faves = await getFavorites()
    if (faves) {
      faves.forEach((fave) => {
        if (fave.id === props.meditation.id) {
          setFillHeart(true)
        }
      })
    }
  }

  ///////////////////////////////
  // SAVE FAVORITE IN FIRESTORE //
  ///////////////////////////////
  const saveFavorite = async (favorite: IMeditation) => {
    const userRef = await getUser()
    const faves = await getFavorites()

    if (userRef) {
      try {
        if (faves) {
          for (let i = 0; i < faves.length; i++) {
            // If favorite already exists in Firestore, return
            if (faves[i].id === favorite.id) {
              return
            } // Else, add favorite to Firestore
            else {
              const favorites = arrayUnion(favorite)
              await updateDoc(userRef, {
                favorites,
              })
              setFillHeart(true)
            }
          }

          // If favorites array is empty, create new one and update doc
          if (faves.length === 0) {
            const faves = [favorite]
            await updateDoc(userRef, {
              favorites: faves,
            })
            setFillHeart(true)
          }
        } else {
          // If there isn't a favorites array, create one
          const faves = [favorite]
          await updateDoc(userRef, {
            favorites: faves,
          })
          setFillHeart(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  ////////////////////////////////////
  // REMOVE FAVORITE FROM FIRESTORE //
  ////////////////////////////////////
  const removeFavorite = async (m: IMeditation) => {
    const userRef = await getUser()
    const faves = await getFavorites()

    if (userRef) {
      try {
        if (faves) {
          for (let i = 0; i < faves.length; i++) {
            if (faves[i].id === m.id) {
              faves.splice(i, 1)
              await updateDoc(userRef, {
                favorites: faves,
              })
              setFillHeart(false)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  ////////////////////////////
  // START MEDITATION / TIMER //
  ////////////////////////////
  const startMeditation = () => {
    // start video & audio
    audioRef.current?.play()
    videoRef.current?.play()
    // start timer
    setStartTime(new Date())
    onClickReset(sliderValue)
    // toggle meditating state
    setIsMeditating(true)
  }

  ////////////////////////////
  // STOP MEDITATION / TIMER //
  ////////////////////////////
  const stopMeditation = () => {
    // stop timer / interval
    if (interval.current) clearInterval(interval.current)
    // pause video & audio
    videoRef.current?.pause()
    audioRef.current?.pause()
    // toggle meditating state
    setIsMeditating(false)

    // get time / results & save
    const result = differenceInSeconds(new Date(), startTime as number)
    saveMeditatedMinutes(result)
  }

  ////////////////////////////////
  // SAVE PROGRESS IN FIRESTORE //
  ////////////////////////////////
  const saveMeditatedMinutes = async (time: number) => {
    const userRef = await getUser()
    const progress = await getProgress()

    const meditation = {
      seconds: time,
      meditation: props.meditation,
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toDateString(),
    }

    if (time === 0 || Number.isNaN(time)) return

    if (userRef) {
      try {
        if (progress) {
          const newProgress = arrayUnion(meditation)
          await updateDoc(userRef, {
            progress: newProgress,
          })
        } else {
          const newProgress = [meditation]
          await updateDoc(userRef, {
            progress: newProgress,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // VISIBILITY STYLE

  return (
    <StyledVideo>
      <div className="video-container">
        <div className="video">
          <video ref={videoRef} loop muted>
            <source src={props.meditation.video} />
          </video>
        </div>

        <StyledFlexWrapper
          align="flex-end"
          justify="flex-end"
          direction="row"
          padding="2rem 1rem"
          width="auto"
          margin="unset"
          gap="1.5rem"
          className="modal-wrapper"
        >
          <StyledImageWrapper
            borderRadius="50%"
            background="var(--dark-blue)"
            padding="0.6rem"
            className="icon"
            onClick={() => {
              if (fillHeart) {
                removeFavorite(props.meditation)
              } else {
                saveFavorite(props.meditation)
              }
            }}
          >
            {fillHeart ? (
              <FavoriteIcon style={{ color: '#f7dba8' }} fontSize="medium" />
            ) : (
              <FavoriteBorderIcon
                style={{ color: '#f7dba8' }}
                fontSize="medium"
              />
            )}
          </StyledImageWrapper>

          <StyledImageWrapper
            align="flex-end"
            borderRadius="50%"
            background="var(--dark-blue)"
            padding="0.6rem"
            className="icon"
            onClick={() => {
              if (isMeditating) {
                stopMeditation()
                props.closeModal()
              } else {
                props.closeModal()
              }
            }}
          >
            <CloseIcon style={{ color: '#f7dba8' }} fontSize="medium" />
          </StyledImageWrapper>
        </StyledFlexWrapper>

        <StyledFlexWrapper
          justify="flex-start"
          align="center"
          direction="row"
          className="modal-footer-wrapper"
        >
          <audio ref={audioRef} loop>
            <source src={props.meditation.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <StyledFlexWrapper margin="unset" direction="row" width="100%">
            <StyledFlexWrapper margin="unset">
              <div className="icon-wrapper">
                <span
                  onClick={() => {
                    setShowTimer(!showTimer)
                  }}
                >
                  {showTimer ? (
                    <ArrowBackIosNewIcon
                      fontSize="large"
                      style={{ color: 'var(--dark-beige)' }}
                    />
                  ) : (
                    <ArrowForwardIosIcon
                      fontSize="large"
                      style={{ color: 'var(--dark-beige)' }}
                    />
                  )}
                </span>
              </div>
            </StyledFlexWrapper>
            <StyledTimerCard
              align="flex-start"
              justify="center"
              className={showTimer ? 'show modal-card' : 'hide'}
            >
              <StyledFlexWrapper
                direction="row"
                align="center"
                justify="flex-start"
                margin="unset"
              >
                <UpdateIcon />
                <StyledHeadingXS
                  textTransform="unset"
                  color="var(--dark-blue)"
                  borderBottom="none"
                  fontSize="1rem"
                >
                  Sound meditation timer
                </StyledHeadingXS>
              </StyledFlexWrapper>

              <StyledFlexWrapper
                direction="row"
                align="center"
                justify="flex-start"
                margin="unset"
                width="100%"
                gap="unset"
              >
                <StyledFlexWrapper
                  gap="unset"
                  margin="unset"
                  align="flex-start"
                >
                  <StyledHeadingM fontWeight="700" color="var(--dark-blue)">
                    {sliderValue}
                  </StyledHeadingM>
                  <StyledHeadingXS
                    textTransform="unset"
                    color="var(--dark-blue)"
                    borderBottom="none"
                  >
                    minutes
                  </StyledHeadingXS>
                </StyledFlexWrapper>

                <StyledFlexWrapper width="60%">
                  <Slider
                    aria-label="Minutes"
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    onChange={(event, value) => {
                      setSliderValue(value as number)
                    }}
                    step={5}
                    marks
                    min={5}
                    max={60}
                    style={{ color: '#001432' }}
                  />
                </StyledFlexWrapper>
                <StyledFlexWrapper width="100%">
                  <StyledButton
                    width="100%"
                    bgColor="var(--dark-blue)"
                    color="var(--dark-beige)"
                    margin="1rem 0"
                    fontWeight="300"
                    onClick={() => {
                      isMeditating ? stopMeditation() : startMeditation()
                    }}
                    className="modal-button"
                  >
                    <StyledImageWrapper>
                      {isMeditating ? (
                        <StopCircleIcon />
                      ) : (
                        <PlayCircleFilledIcon />
                      )}
                    </StyledImageWrapper>
                    {isMeditating ? 'Stop' : 'Play'}
                  </StyledButton>
                </StyledFlexWrapper>
              </StyledFlexWrapper>
            </StyledTimerCard>
            <StyledFlexWrapper
              margin="unset"
              className={showTimer ? 'show' : 'hide'}
            >
              <span className="timer">{timer}</span>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </StyledFlexWrapper>
      </div>
    </StyledVideo>
  )
}

const StyledVideo = styled.div`
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

  .modal-button {
    padding: 1rem;

    @media ${devices.desktop} {
      padding: 1.3rem 2rem;
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
      width: 25rem;
      height: 15rem;
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
