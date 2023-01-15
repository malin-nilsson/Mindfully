import React from 'react'
import { Suspense, useEffect, useState } from 'react'
// MODELS //
import { IMeditation } from '../../models/IMeditation'
// STYLED COMPONENTS //
import { StyledMeditationCard } from '../styledComponents/Cards/Cards'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import Loader from '../styledComponents/Loader/StyledLoader'
// MUI //
import FavoriteIcon from '@mui/icons-material/Favorite'
// FIRESTORE //
import { getFavorites } from '../../services/getFavorites'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// SERVICES //
import { removeFavorite } from '../../services/removeFavorite'
import { saveFavorite } from '../../services/saveFavorite'

const VideoModal = React.lazy(() =>
  import('../styledComponents/Modal/VideoModal'),
)
const ImageModal = React.lazy(() =>
  import('../styledComponents/Modal/ImageModal'),
)

export default function Favorites() {
  const [favorites, setFavorites] = useState<IMeditation[]>()
  const [noFavorites, setNoFavorites] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [hideFavorites, setHideFavorites] = useState(false)
  const [loader, setLoader] = useState(true)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    image: {
      asset: {
        url: '',
        _id: '',
      },
    },
    icon: {
      asset: {
        url: '',
        _id: '',
      },
    },
    audio: {
      asset: {
        url: '',
        _id: '',
      },
    },
    video: {
      asset: {
        url: '',
        _id: '',
      },
    },
    breatheTime: 0,
    holdTime: 0,
    totalTime: 0,
    description: '',
    _id: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    showFavorites()
  }, [favorites])

  const showFavorites = async () => {
    const faves = await getFavorites()

    if (faves) {
      setFavorites(faves)
      setLoader(false)
    } else {
      setNoFavorites(true)
      setLoader(false)
    }
  }

  const showModal = (m: IMeditation) => {
    setSelectedMeditation(m)
    setLoader(true)
    setHideFavorites(true)

    if (m.tag === 'Guided Breathing Meditation') {
      setImageModal(true)
      setTimeout(stopLoader, 2000)
    } else if (m.tag === 'Sound Meditation') {
      setVideoModal(true)
      setTimeout(stopLoader, 2500)
    }
  }

  const hideModal = () => {
    setLoader(false)
    setVideoModal(false)
    setImageModal(false)
    setHideFavorites(false)
  }

  const stopLoader = () => {
    setLoader(false)
  }

  const handleSaveFavorite = async (m: IMeditation) => {
    setError(false)
    const updatedFavorites = (await saveFavorite(m)) as IMeditation[] | string
    if (typeof updatedFavorites == 'string') {
      setError(true)
      setErrorMessage(updatedFavorites)
    } else {
      setFavorites(updatedFavorites)
    }
  }

  const handleRemoveFavorite = async (m: IMeditation) => {
    setError(false)
    const updatedFavorites = (await removeFavorite(m)) as IMeditation[] | string
    if (typeof updatedFavorites == 'string') {
      setError(true)
      setErrorMessage(updatedFavorites)
    } else {
      setFavorites(updatedFavorites)
    }
  }

  return (
    <>
      {loader && <Loader />}
      {videoModal && (
        <Suspense fallback={<Loader />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <VideoModal
              meditation={selectedMeditation}
              closeModal={hideModal}
              handleSaveFavorite={handleSaveFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          </motion.div>
        </Suspense>
      )}
      {imageModal && (
        <Suspense fallback={<Loader />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ImageModal
              meditation={selectedMeditation}
              closeModal={hideModal}
              handleSaveFavorite={handleSaveFavorite}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          </motion.div>
        </Suspense>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StyledFlexWrapper
          justify="flex-start"
          padding="1.5rem 0 0"
          width="100%"
          height="100%"
          display={hideFavorites ? 'none' : 'flex'}
        >
          <StyledFlexWrapper width="100%">
            <StyledHeadingXL color="var(--dark-beige)">
              Favorites
            </StyledHeadingXL>
            <StyledFlexWrapper align="center" width="100%">
              <StyledImageWrapper maxHeight="40px">
                <FavoriteIcon style={{ color: '#f7dba8' }} fontSize="large" />
              </StyledImageWrapper>
              {error && errorMessage}
            </StyledFlexWrapper>

            {noFavorites || (favorites && favorites.length < 1) ? (
              <StyledFlexWrapper color="var(--dark-beige)">
                <p>
                  Tap the heart icon on any meditation to add it to your
                  Favorites list.
                </p>
              </StyledFlexWrapper>
            ) : (
              <StyledFlexWrapper
                direction="row"
                gap="2rem"
                margin="1.5rem 1rem"
                className="favorites-wrapper"
                display={hideFavorites ? 'none' : 'flex'}
              >
                {favorites &&
                  favorites.map((favorite) => {
                    return (
                      <StyledMeditationCard
                        borderRadius="15px"
                        justify="center"
                        key={favorite._id}
                        padding="1.5rem 1rem"
                        background="var(--dark-blue)"
                        border="1px solid var(--light-blue)"
                        color="var(--dark-beige)"
                        onClick={() => showModal(favorite)}
                      >
                        <StyledImageWrapper maxHeight="50px">
                          <img src={favorite.icon?.asset.url} alt="Emoji"></img>
                          <span>{favorite.title} </span>
                        </StyledImageWrapper>
                        <StyledFlexWrapper align="flex-end" width="100%">
                          <StyledImageWrapper maxHeight="22px">
                            <FavoriteIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          </StyledImageWrapper>
                        </StyledFlexWrapper>
                      </StyledMeditationCard>
                    )
                  })}
              </StyledFlexWrapper>
            )}
          </StyledFlexWrapper>
        </StyledFlexWrapper>
      </motion.div>
    </>
  )
}
