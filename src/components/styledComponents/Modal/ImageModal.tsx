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
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// UTILS //
import { getFavorites } from '../../../utils/getFavorites'
// DATE-FNS //
import { differenceInSeconds } from 'date-fns'
import { saveProgress } from '../../../utils/saveProgress'

interface IModalProps {
  meditation: IMeditation
  closeModal: () => void
  handleSaveFavorite: (m: IMeditation) => void
  handleRemoveFavorite: (m: IMeditation) => void
}

export default function ImageModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)
  const [isMeditating, setIsMeditating] = useState(false)
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
  }

  ////////////////////////////
  // STOP MEDITATION / TIMER //
  ////////////////////////////
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

    if (time === 0 || Number.isNaN(time)) return

    saveProgress(meditation)
  }

  const handleInterval = (interval: NodeJS.Timer) => {
    setintervalNo(interval)
  }

  return (
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
            props.closeModal()
            stopMeditation()
          }}
        >
          <CloseIcon style={{ color: '#f7dba8' }} fontSize="medium" />
        </StyledImageWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper padding="0" gap="0.5rem">
        <StyledHeadingM color="var(--dark-blue)">
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
      ></Animation>
    </StyledImageModal>
  )
}
