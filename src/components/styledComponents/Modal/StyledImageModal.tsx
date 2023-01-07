import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import styled from 'styled-components'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'
import Animation from '../Animations/StyledAnimations'
import { StyledHeadingM } from '../Headings/StyledHeadings'
// MUI //
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CloseIcon from '@mui/icons-material/Close'
// MODELS //
import { IMeditation } from '../../../models/IMeditation'
// FIREBASE //
import { arrayUnion, updateDoc } from 'firebase/firestore'
import { getFavorites } from '../../../utils/getFavorites'
import { getUID } from '../../../utils/getUID'
import { getProgress } from '../../../utils/getProgress'
// DATE-FNS //
import { differenceInSeconds } from 'date-fns'

interface IModalProps {
  meditation: IMeditation
  closeModal: () => void
}

export default function ImageModal(props: IModalProps) {
  const [fillHeart, setFillHeart] = useState(false)
  const [isMeditating, setIsMeditating] = useState(false)
  const [startTime, setStartTime] = useState<Date | number>()

  useEffect(() => {
    fillFavorite()
  }, [fillHeart])

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
    const userRef = await getUID()
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

  ////////////////////////////////////
  // REMOVE FAVORITE FROM FIRESTORE //
  ////////////////////////////////////
  const removeFavorite = async (m: IMeditation) => {
    const userRef = await getUID()
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

  const handleTime = (time: number | Date) => {
    setStartTime(time)
  }

  ////////////////////////////
  // STOP MEDITATION / TIMER //
  ////////////////////////////
  const stopMeditation = () => {
    setIsMeditating(false)

    // get time / results & save
    const result = differenceInSeconds(new Date(), startTime as number)
    saveMeditatedMinutes(result)
  }

  ////////////////////////////////
  // SAVE PROGRESS IN FIRESTORE //
  ////////////////////////////////
  const saveMeditatedMinutes = async (time: number) => {
    const userRef = await getUID()
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

  return (
    <StyledModal backgroundImage={`url(${props.meditation.img})`}>
      <StyledFlexWrapper
        align="flex-end"
        justify="flex-end"
        direction="row"
        padding="1rem 1rem 0rem"
        width="auto"
        margin="unset"
        gap="1rem"
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
            props.closeModal()
            stopMeditation()
          }}
        >
          <CloseIcon style={{ color: '#f7dba8' }} fontSize="medium" />
        </StyledImageWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper padding="0">
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
      ></Animation>
    </StyledModal>
  )
}

export const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-image: ${(props: IStylingProps) => props.backgroundImage || ''};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  overflow: hidden;

  @media ${devices.desktop} {
    justify-content: flex-start;
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

  .description {
    @media ${devices.desktop} {
      width: 55%;
    }
    p {
      margin: 0.2rem 0 0.4rem;
      padding: 0;
      font-size: 1rem;
      font-weight: 300;
      text-align: center;
    }
  }
`
