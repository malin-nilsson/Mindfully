import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import UpdateIcon from '@mui/icons-material/Update'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CloseIcon from '@mui/icons-material/Close'
import { IMeditation } from '../../../models/IMeditation'
import { useEffect, useRef, useState } from 'react'
import { differenceInMinutes } from 'date-fns'
import { arrayUnion, updateDoc } from 'firebase/firestore'
import { getFavorites } from '../../../utils/getFavorites'
import { getProgress } from '../../../utils/getProgress'
import { getUser } from '../../../utils/getUser'
import { Slider } from '@mui/material'
import { StyledButton } from '../Button/StyledButton'
import { StyledCard } from '../Card/Card'
import { StyledHeadingXS, StyledHeadingM } from '../Headings/StyledHeadings'

interface IModalProps {
  meditation: IMeditation
  closeModal: () => void
}

export default function VideoModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)

  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    id: 0,
    tag: '',
    title: '',
    icon: '',
    img: '',
    audio: '',
  })
  const [isMeditating, setIsMeditating] = useState(false)
  const [sliderValue, setSliderValue] = useState(5)
  const [startTime, setStartTime] = useState<Date | number>()
  const ref = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const Ref = useRef<ReturnType<typeof setInterval> | null>(null)
  const [timer, setTimer] = useState('00:00:00')
  const [meditatedMinutes, setMeditatedMinutes] = useState(0)

  useEffect(() => {
    showFavorites()
  }, [fillHeart, sliderValue])

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

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      )
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
    if (Ref.current) clearInterval(Ref.current)

    const id = setInterval(() => {
      startTimer(e)
    }, 1000)

    Ref.current = id
  }

  const getDeadTime = (time: number) => {
    let deadline = new Date() // This is where you need to adjust if // you entend to add more time

    deadline.setMinutes(deadline.getMinutes() + time)

    return deadline
  }

  const onClickReset = (value: number) => {
    clearTimer(getDeadTime(value), value)
  }

  const showFavorites = async () => {
    const faves = await getFavorites()
    if (faves) {
      faves.forEach((fave) => {
        if (fave.id === props.meditation.id) {
          setFillHeart(true)
        }
      })
    }
  }

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

          if (faves.length === 0) {
            const faves = [favorite]
            await updateDoc(userRef, {
              favorites: faves,
            })
            setFillHeart(true)
          }
        } else {
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

  const startMeditation = () => {
    setStartTime(new Date())
    onClickReset(sliderValue)
    ref.current?.play()
    videoRef.current?.play()
    setIsMeditating(true)
  }

  const stopMeditation = () => {
    if (Ref.current) clearInterval(Ref.current)
    videoRef.current?.pause()
    ref.current?.pause()
    setIsMeditating(false)

    const result = differenceInMinutes(new Date(), startTime as number)

    saveMeditatedMinutes(result)
  }

  const saveMeditatedMinutes = async (time: number) => {
    const userRef = await getUser()
    const progress = await getProgress()

    const meditation = {
      minutes: time,
      meditation: props.meditation,
    }

    if (time === 0) return

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
            onClick={() => props.closeModal()}
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
          <audio ref={ref} loop>
            <source src={props.meditation.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <StyledFlexWrapper margin="unset" direction="row">
            <StyledFlexWrapper margin="unset">
              <ArrowBackIosNewIcon
                fontSize="large"
                style={{ color: 'var(--dark-beige)' }}
              />
            </StyledFlexWrapper>
            <StyledCard
              align="flex-start"
              className="modal-card"
              justify="center"
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
                  Meditation length
                </StyledHeadingXS>
                {timer}
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
                  >
                    {isMeditating ? 'Finish' : 'Start meditation'}
                  </StyledButton>
                </StyledFlexWrapper>
              </StyledFlexWrapper>
            </StyledCard>
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

  .video-container {
    width: 100vw;
  }

  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    object-position: top center;
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
    bottom: 0;

    @media ${devices.tablet} {
      gap: 2rem;
      margin: 0 1rem 1rem;
    }
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
`
