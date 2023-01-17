import React from 'react'
import { useEffect, useRef, useState } from 'react'
// STYLED COMPONENTS/
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import { StyledButton } from '../Button/StyledButton'
import { StyledTimerCard } from '../Cards/Cards'
import { StyledVideo } from './StyledVideoModal'
import { StyledHeadingXS, StyledHeadingS } from '../Headings/StyledHeadings'
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
import { Snackbar } from '@mui/material'
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// DATE FNS //
import { differenceInSeconds } from 'date-fns'
// SERVICES //
import { getFavorites } from '../../../services/getFavorites'
import { saveProgress } from '../../../services/saveProgress'
// FRAMER MOTION //
import { motion } from 'framer-motion'

interface IModalProps {
  meditation: IMeditation
  closeModal: (progress?: boolean) => void
  handleSaveFavorite: (m: IMeditation) => void
  handleRemoveFavorite: (m: IMeditation) => void
}

export default function VideoModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)
  const [isMeditating, setIsMeditating] = useState(false)
  const [sliderValue, setSliderValue] = useState(5)
  const [snackbar, setSnackbar] = useState(false)
  const [startTime, setStartTime] = useState<Date | number>()
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [timer, setTimer] = useState('')
  const [showTimer, setShowTimer] = useState(true)
  const [showTime, setShowTime] = useState(false)

  useEffect(() => {
    fillFavorite()
  }, [sliderValue])

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
    setShowTime(true)

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
        if (fave._id === props.meditation._id) {
          setFillHeart(true)
        }
      })
    }
  }

  //////////////////////////////
  // START MEDITATION / TIMER //
  /////////////////////////////
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

  /////////////////////////////
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
    saveTime(result)
  }

  ////////////////////////////////
  // SAVE PROGRESS IN FIRESTORE //
  ////////////////////////////////
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

    if (time === 0 || Number.isNaN(time)) return

    saveProgress(meditation)
    setSnackbar(true)
  }

  // SNACKBAR CLOSE ICON //
  const action = (
    <React.Fragment>
      <CloseIcon fontSize="small" onClick={() => setSnackbar(false)} />
    </React.Fragment>
  )

  return (
    <StyledVideo>
      <div className="video-container">
        <div className="video">
          <video
            ref={videoRef}
            poster={props.meditation.image?.asset.url}
            loop
            muted
            playsInline
          >
            <source src={props.meditation.video?.asset.url} />
            Your browser does not support the video tag.
          </video>
        </div>

        <StyledFlexWrapper
          align="flex-end"
          justify="flex-end"
          direction="row"
          width="auto"
          margin="unset"
          gap="1rem"
          className="modal-wrapper"
        >
          <StyledImageWrapper
            borderRadius="50%"
            background="var(--dark-blue)"
            padding="0.6rem"
            className="icon-favorite"
            role="button"
            tabIndex={0}
            onClick={() => {
              if (fillHeart) {
                setFillHeart(false)
                props.handleRemoveFavorite(props.meditation)
              } else {
                setFillHeart(true)
                props.handleSaveFavorite(props.meditation)
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
            className="icon-close"
            role="button"
            tabIndex={0}
            onClick={() => {
              if (isMeditating) {
                stopMeditation()
                props.closeModal(true)
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
            <source src={props.meditation.audio?.asset.url} type="audio/mpeg" />
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
                  Set timer
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
                  <StyledHeadingS
                    borderBottom="none"
                    fontWeight="700"
                    color="var(--dark-blue)"
                  >
                    {sliderValue}
                  </StyledHeadingS>
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
                    padding="0.8rem"
                    color="var(--dark-beige)"
                    margin="1rem 0"
                    fontWeight="300"
                    onClick={() => {
                      isMeditating ? stopMeditation() : startMeditation()
                    }}
                    className="modal-button"
                    id="meditation-button"
                  >
                    <StyledImageWrapper>
                      {isMeditating ? (
                        <StopCircleIcon />
                      ) : (
                        <PlayCircleFilledIcon />
                      )}
                    </StyledImageWrapper>
                    {isMeditating ? 'Stop' : 'Start'}
                  </StyledButton>
                </StyledFlexWrapper>
              </StyledFlexWrapper>
            </StyledTimerCard>

            {showTime && (
              <StyledFlexWrapper
                margin="unset"
                justify="flex-start"
                align="flex-start"
                className={showTimer ? 'show' : 'hide'}
              >
                {' '}
                <span className="timer">{timer}</span>
              </StyledFlexWrapper>
            )}
          </StyledFlexWrapper>
        </StyledFlexWrapper>
      </div>
      {snackbar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Snackbar
            ContentProps={{
              sx: {
                background: 'var(--mid-blue)',
                color: 'var(--dark-beige)',
                border: '1px solid var(--dark-beige)',
                fontSize: '1rem',
              },
            }}
            open={snackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={5000}
            message="Your meditation time has been saved &nbsp; &#127942;"
            onClose={() => setSnackbar(false)}
            action={action}
          />
        </motion.div>
      )}
    </StyledVideo>
  )
}
