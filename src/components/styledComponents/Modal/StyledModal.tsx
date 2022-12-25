import styled from 'styled-components'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import CloseIcon from '@mui/icons-material/Close'
import { StyledCard } from '../Card/Card'
import { StyledHeadingM, StyledHeadingXS } from '../Headings/StyledHeadings'
import UpdateIcon from '@mui/icons-material/Update'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Slider } from '@mui/material'
import { StyledButton } from '../Button/StyledButton'
import { devices } from '../../breakpoints/Breakpoints'
import { createRef, useEffect, useRef, useState } from 'react'
import { IMeditation } from '../../../models/IMeditation'
import { IStylingProps } from '../models/IStylingProps'
import { doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { getAuth } from 'firebase/auth'

interface IModalProps {
  meditation: IMeditation
  closeModal: () => void
}

export default function Modal(props: IModalProps) {
  const auth = getAuth()
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

  const ref = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    getFavorites()
  }, [fillHeart, sliderValue])

  const getFavorites = async () => {
    if (auth.currentUser) {
      // Get user from "Users" collection
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves: IMeditation[] = docSnap.data().favorites
          if (faves) {
            faves.forEach((fave) => {
              if (fave.id === props.meditation.id) {
                setFillHeart(true)
              }
            })
          }
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const saveFavorite = async (favorite: IMeditation) => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves = docSnap.data().favorites
          if (faves) {
            for (let i = 0; i < faves.length; i++) {
              // If favorite already exists in Firestore, return
              if (faves[i].id === favorite.id) {
                return
              } // Else, add favorite to Firestore
              else {
                // Add new favorite to existing Firestore array

                const favorites = arrayUnion(favorite)
                // Update favorites doc in firestore
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
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeFavorite = async (m: IMeditation) => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves: IMeditation[] = docSnap.data().favorites

          if (faves) {
            for (let i = 0; i < faves.length; i++) {
              if (faves[i].id === m.id) {
                faves.splice(i, 1)
                await updateDoc(userRef, {
                  favorites: faves,
                })
                setFillHeart(false)
              } // Else, remove favorite to Firestore
              else {
                console.log('hej')
              }
            }

            if (faves.length > 1) {
              console.log('hoho')
            }
          }
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const startMeditation = () => {
    ref.current?.play()
  }

  return (
    <StyledModal backgroundImage={`url(${props.meditation.img})`}>
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
          maxHeight="20px"
          borderRadius="50%"
          background="var(--dark-blue)"
          padding="0.7rem"
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
          padding="0.55rem"
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
        <audio ref={ref}>
          <source src={props.meditation.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <StyledFlexWrapper margin="unset">
          <ArrowBackIosNewIcon
            fontSize="large"
            style={{ color: 'var(--dark-beige)' }}
          />
        </StyledFlexWrapper>
        <StyledCard
          align="flex-start"
          width="unset"
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
          </StyledFlexWrapper>

          <StyledFlexWrapper
            direction="row"
            align="center"
            justify="flex-start"
            margin="unset"
            width="100%"
            gap="unset"
          >
            <StyledFlexWrapper gap="unset" margin="unset" align="flex-start">
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
                onClick={() => startMeditation()}
              >
                {isMeditating ? 'Stop meditation' : 'Start meditation'}
              </StyledButton>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </StyledCard>
      </StyledFlexWrapper>
    </StyledModal>
  )
}

export const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 20;
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
  z-index: 10;

  @media ${devices.desktop} {
    justify-content: space-between;
  }

  .modal-footer-wrapper {
    gap: 0.5rem;
    margin: 0;

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
