import React from 'react'
import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import Animation from '../Animations/Animation'
import { StyledHeadingM } from '../Headings/StyledHeadings'
import { StyledImageModal } from './StyledImageModal'
// MUI //
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloseIcon from '@mui/icons-material/Close'
import { Snackbar } from '@mui/material'
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// SERVICES //
import { getFavorites } from '../../../services/getFavorites'
import { saveProgress } from '../../../services/saveProgress'
// DATE-FNS //
import { differenceInSeconds } from 'date-fns'
// FRAMER MOTION //
import { motion } from 'framer-motion'

interface IModalProps {
  meditation: IMeditation
  closeModal: (progress?: boolean) => void
  handleSaveFavorite: (m: IMeditation) => void
  handleRemoveFavorite: (m: IMeditation) => void
}

export default function ImageModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)
  const [isMeditating, setIsMeditating] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [alternativeSnackbar, setAlternativeSnackbar] = useState(false)
  const [startTime, setStartTime] = useState<Date | number>()
  const [intervalNo, setintervalNo] = useState<ReturnType<
    typeof setInterval
  > | null>(null)

  useEffect(() => {
    fillFavorite()
  }, [])

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

  const handleTime = (time: number | Date) => {
    setStartTime(time)
    setSnackbar(true)
  }

  /////////////////////////////
  // STOP MEDITATION / TIMER //
  /////////////////////////////
  const stopMeditation = () => {
    setIsMeditating(false)
    clearInterval(intervalNo as NodeJS.Timer)
    // get time / results & save
    const result = differenceInSeconds(new Date(), startTime as number)
    saveTime(result)
  }

  ////////////////////////////////
  // SAVE PROGRESS IN FIRESTORE //
  ////////////////////////////////
  const saveTime = async (time: number) => {
    const meditation = {
      seconds: time,
      meditation: props.meditation,
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toDateString(),
    }

    if (time === 0 || Number.isNaN(time)) {
      props.closeModal()
      return
    }
    saveProgress(meditation)
    props.closeModal(true)
  }

  const handleInterval = (interval: NodeJS.Timer) => {
    setintervalNo(interval)
  }

  // SNACKBAR //
  const handleSnackbar = () => {
    setAlternativeSnackbar(true)
  }

  const action = (
    <React.Fragment>
      <CloseIcon fontSize="small" onClick={() => setSnackbar(false)} />
    </React.Fragment>
  )

  return (
    <>
      <StyledImageModal
        backgroundImage={`url(${props.meditation.image?.asset.url})`}
      >
        <StyledFlexWrapper
          align="flex-end"
          justify="flex-end"
          direction="row"
          className="modal-wrapper"
          width="auto"
          margin="unset"
          gap="1rem"
        >
          <StyledImageWrapper
            borderRadius="50%"
            background="var(--dark-blue)"
            padding="0.6rem"
            className="icon"
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
            className="icon"
            role="button"
            tabIndex={0}
            onClick={() => {
              stopMeditation()
            }}
          >
            <CloseIcon style={{ color: '#f7dba8' }} fontSize="medium" />
          </StyledImageWrapper>
        </StyledFlexWrapper>
        <StyledFlexWrapper padding="0" gap="0.5rem">
          <StyledHeadingM color="var(--dark-blue)" fontSize="1.85rem">
            {props.meditation.title}
          </StyledHeadingM>
          <div className="description">
            <p>{props.meditation.description}</p>
          </div>
        </StyledFlexWrapper>
        <Animation
          meditation={props.meditation}
          handleTime={handleTime}
          handleInterval={handleInterval}
          stopMeditation={stopMeditation}
          handleSnackbar={handleSnackbar}
        ></Animation>
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
                  fontSize: '0.9rem',
                },
              }}
              open={snackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={6000}
              message="We're saving your progress as you meditate &nbsp; &#128171;"
              onClose={() => setSnackbar(false)}
              action={action}
            />
          </motion.div>
        )}
        {alternativeSnackbar && (
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
                  fontSize: '0.9rem',
                },
              }}
              open={alternativeSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={6000}
              message="Your meditation time has been saved &nbsp; &#128171;"
              onClose={() => setAlternativeSnackbar(false)}
              action={action}
            />
          </motion.div>
        )}
      </StyledImageModal>
    </>
  )
}
