import React from 'react'
import { Suspense, useEffect, useState } from 'react'
// STYLED COMPONENTS //
import { StyledMeditationCard } from '../styledComponents/Cards/Cards'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledSelect } from '../styledComponents/Select/Select'
import Loader from '../styledComponents/Loader/StyledLoader'
// DATA //
import { MeditationCatalog as meditations } from '../../data/Meditations'
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

const VideoModal = React.lazy(() =>
  import('../styledComponents/Modal/VideoModal'),
)
const ImageModal = React.lazy(() =>
  import('../styledComponents/Modal/ImageModal'),
)

export default function Explore() {
  const [allMeditations, setAllMeditations] = useState<IMeditation[]>(
    meditations,
  )
  const [filteredMeditations, setFilteredMeditations] = useState<
    IMeditation[]
  >()
  const [showFilteredMeditations, setShowFilteredMeditations] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [hideMeditations, setHideMeditations] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })
  const [favorites, setFavorites] = useState<IMeditation[]>()

  useEffect(() => {
    window.scrollTo(0, 0)
    matchFavorites()
  }, [favorites])

  const matchFavorites = async () => {
    const faves = await getFavorites()

    if (faves) {
      const isFavorite: IMeditation[] = []

      faves.map((fave) => {
        for (let i = 0; i < meditations.length; i++) {
          if (fave.title === meditations[i].title) {
            isFavorite.push(meditations[i])
          }
        }
      })
      setFavorites(isFavorite)
    } else {
      return
    }
  }

  const checkIfFavorite = (m: IMeditation) => {
    return favorites?.includes(m)
  }

  ////////////////////////
  // FILTER MEDITATIONS //
  ////////////////////////
  const handleOnChange = (e: string) => {
    let filtered: IMeditation[] = []

    if (e === 'All') {
      setShowFilteredMeditations(false)
    } else {
      allMeditations.forEach((meditation) => {
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

  return (
    <>
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
          >
            <span>Filter: </span>
            <StyledSelect>
              <span className="select-icon">
                <ExpandMoreIcon style={{ color: '#000' }} fontSize="medium" />
              </span>
              <select onChange={(e) => handleOnChange(e.target.value)}>
                <>
                  <option value="All">All meditations</option>;
                  <option value="Sound Meditation">Sound Meditations</option>;
                  <option value="Guided Breathing Meditation">
                    Guided Meditations
                  </option>
                </>
              </select>
            </StyledSelect>
          </StyledFlexWrapper>

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
                      key={meditation.id}
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="3rem">
                        <img src={meditation.icon} alt="Emoji"></img>
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
                      key={meditation.id}
                      onClick={() => showModal(meditation)}
                    >
                      <StyledImageWrapper maxHeight="2.5rem">
                        <img src={meditation.icon} alt="Emoji"></img>
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
