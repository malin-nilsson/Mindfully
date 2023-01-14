import React from 'react'
import { Suspense, useEffect, useState } from 'react'
// STYLED COMPONENTS //
import { StyledMeditationCard } from '../styledComponents/Cards/Cards'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledSelect } from '../styledComponents/Select/Select'
import Loader from '../styledComponents/Loader/StyledLoader'
import { StyledButton } from '../styledComponents/Button/StyledButton'
// MODELS //
import { IMeditation } from '../../models/IMeditation'
// MUI //
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// UTILS //
import { getFavorites } from '../../utils/getFavorites'
import { getMeditations } from '../../utils/getMeditations'
import { saveFavorite } from '../../utils/saveFavorite'
import { removeFavorite } from '../../utils/removeFavorite'

const VideoModal = React.lazy(() =>
  import('../styledComponents/Modal/VideoModal'),
)
const ImageModal = React.lazy(() =>
  import('../styledComponents/Modal/ImageModal'),
)

export default function Explore() {
  const [allMeditations, setAllMeditations] = useState<IMeditation[]>()
  const [filteredMeditations, setFilteredMeditations] = useState<
    IMeditation[]
  >()
  const [showFilteredMeditations, setShowFilteredMeditations] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [hideMeditations, setHideMeditations] = useState(false)
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
  const [favorites, setFavorites] = useState<IMeditation[]>()
  const dependencyExpression = favorites && favorites.length

  useEffect(() => {
    window.scrollTo(0, 0)
    showMeditations()
  }, [dependencyExpression])

  const showMeditations = async () => {
    const meditations: IMeditation[] = await getMeditations()
    setAllMeditations(meditations)

    const faves = await getFavorites()

    if (faves) {
      const isFavorite: IMeditation[] = []

      for (let j = 0; j < faves.length; j++) {
        for (let i = 0; i < meditations.length; i++) {
          if (faves[j]._id === meditations[i]._id) {
            isFavorite.push(meditations[i])
          }
        }
      }
      setFavorites(isFavorite)
      setLoader(false)
    } else {
      setLoader(false)
    }
  }

  const checkIfFavorite = (m: IMeditation) => {
    return favorites?.includes(m)
  }

  ////////////////////////
  // FILTER MEDITATIONS //
  ////////////////////////
  const filterMeditations = (e: string) => {
    let filtered: IMeditation[] = []

    if (e === 'All') {
      setShowFilteredMeditations(false)
    } else {
      allMeditations?.forEach((meditation) => {
        if (meditation.tag === e) {
          filtered.push(meditation)
        }
      })
      setFilteredMeditations(filtered)
      setShowFilteredMeditations(true)
    }
  }

  /////////////////
  // CLOSE MODAL //
  /////////////////
  const hideModal = () => {
    setLoader(false)
    setVideoModal(false)
    setImageModal(false)
    setHideMeditations(false)
  }

  ////////////////
  // SHOW MODAL //
  ////////////////
  const showModal = (m: IMeditation) => {
    setHideMeditations(true)
    setLoader(true)
    setSelectedMeditation(m)
    if (m.tag === 'Guided Breathing Meditation') {
      setImageModal(true)
      setTimeout(stopLoader, 2000)
    } else if (m.tag === 'Sound Meditation') {
      setVideoModal(true)
      setTimeout(stopLoader, 2500)
    }
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
            transition={{ duration: 0.6 }}
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
      {allMeditations && (
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
            display={hideMeditations ? 'none' : 'flex'}
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Explore
              </StyledHeadingXL>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
          <StyledFlexWrapper
            display={hideMeditations ? 'none' : 'flex'}
            direction="row"
            color="var(--dark-beige)"
            flexWrap="nowrap"
          >
            <div className="filter-wrapper">
              <StyledButton onClick={() => filterMeditations('All')}>
                All Meditations
              </StyledButton>
              <StyledButton
                onClick={() => filterMeditations('Guided Breathing Meditation')}
              >
                Guided Meditation
              </StyledButton>
              <StyledButton
                onClick={() => filterMeditations('Sound Meditation')}
              >
                Sound Meditation
              </StyledButton>
            </div>

            <div className="filter-wrapper-mobile">
              <StyledSelect>
                <span className="select-icon">
                  <ExpandMoreIcon style={{ color: '#000' }} fontSize="medium" />
                </span>
                <select onChange={(e) => filterMeditations(e.target.value)}>
                  <>
                    <option value="All">All meditations</option>;
                    <option value="Sound Meditation">Sound Meditation</option>;
                    <option value="Guided Breathing Meditation">
                      Guided Meditation
                    </option>
                  </>
                </select>
              </StyledSelect>
            </div>
          </StyledFlexWrapper>
          {error && errorMessage}

          <StyledFlexWrapper
            padding="4rem 1rem 1.5rem"
            direction="row"
            gap="3rem"
            display={hideMeditations ? 'none' : 'flex'}
          >
            {showFilteredMeditations && filteredMeditations
              ? filteredMeditations.map((meditation) => {
                  return (
                    <StyledMeditationCard
                      display={hideMeditations ? 'none' : 'flex'}
                      key={meditation._id}
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="3rem">
                        <img src={meditation.icon.asset.url} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="2rem">
                          {checkIfFavorite(meditation) ? (
                            <FavoriteIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          )}
                        </StyledImageWrapper>
                      </StyledFlexWrapper>
                    </StyledMeditationCard>
                  )
                })
              : allMeditations &&
                allMeditations.map((meditation) => {
                  return (
                    <StyledMeditationCard
                      display={hideMeditations ? 'none' : 'flex'}
                      key={meditation._id}
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="2.5rem">
                        <img src={meditation.icon.asset.url} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="2rem">
                          {checkIfFavorite(meditation) ? (
                            <FavoriteIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          ) : (
                            <FavoriteBorderIcon
                              style={{ color: '#f7dba8' }}
                              fontSize="medium"
                            />
                          )}
                        </StyledImageWrapper>
                      </StyledFlexWrapper>
                    </StyledMeditationCard>
                  )
                })}
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
