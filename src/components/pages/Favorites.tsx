import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMeditation } from '../../models/IMeditation'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import ImageModal from '../styledComponents/Modal/StyledImageModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { getUser } from '../../utils/getUser'
import { getFavorites } from '../../utils/getFavorites'
import { motion } from 'framer-motion'
import Loader from '../styledComponents/Loader/StyledLoader'
import VideoModal from '../styledComponents/Modal/StyledVideoModal'

export default function Favorites() {
  const [favorites, setFavorites] = useState<IMeditation[]>()
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [hideFavorites, setHideFavorites] = useState(false)
  const [loader, setLoader] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    showFavorites()
  }, [])

  const showFavorites = async () => {
    const userRef = await getUser()
    const faves = await getFavorites()

    if (userRef) {
      try {
        if (faves) {
          setFavorites(faves)
        } else {
          console.log('Document does not exist')
          setFavorites([])
        }
      } catch (error) {
        console.log(error)
      }
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

  return (
    <>
      {loader && <Loader message="Take a deep breath..."></Loader>}
      {videoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <VideoModal meditation={selectedMeditation} closeModal={hideModal} />
        </motion.div>
      )}
      {imageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ImageModal meditation={selectedMeditation} closeModal={hideModal} />
        </motion.div>
      )}
      {favorites && (
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
              </StyledFlexWrapper>

              {favorites.length < 1 ? (
                <StyledFlexWrapper color="var(--dark-beige)">
                  <p>
                    Tap the heart icon nex to any activity to add to your
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
                          height="11rem"
                          justify="center"
                          key={favorite.id}
                          padding="1.5rem 1rem"
                          background="var(--dark-blue)"
                          border="1px solid var(--light-blue)"
                          color="var(--dark-beige)"
                          onClick={() => showModal(favorite)}
                        >
                          <StyledImageWrapper maxHeight="50px">
                            <img src={favorite.icon} alt="Emoji"></img>
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
      )}
    </>
  )
}
