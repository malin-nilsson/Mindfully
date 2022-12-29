import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IMeditation } from '../../models/IMeditation'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import Modal from '../styledComponents/Modal/StyledImageModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { getUser } from '../../utils/getUser'
import { getFavorites } from '../../utils/getFavorites'
import Video from '../styledComponents/Modal/StyledVideoModal'
import { motion } from 'framer-motion'

export default function Favorites() {
  const [favorites, setFavorites] = useState<IMeditation[]>()
  const [videoModal, setVideoModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [hideFavorites, setHideFavorites] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })

  useEffect(() => {
    showFavorites()
  }, [favorites])

  const showFavorites = async () => {
    const userRef = await getUser()
    const faves = await getFavorites()

    if (userRef) {
      try {
        if (faves) {
          setFavorites(faves)
        } else {
          console.log('Document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showModal = (m: IMeditation) => {
    setSelectedMeditation(m)
    if (m.tag === 'Guided Breathing Meditation') {
      setImageModal(true)
      setHideFavorites(true)
    } else if (m.tag === 'Sound Meditation') {
      setVideoModal(true)
      setHideFavorites(true)
    }
  }

  const hideModal = () => {
    setVideoModal(false)
    setImageModal(false)
    setHideFavorites(false)
  }

  return (
    <>
      {videoModal && (
        // <Modal meditation={selectedMeditation} closeModal={hideModal}></Modal>
        <Video meditation={selectedMeditation} closeModal={hideModal} />
      )}
      {imageModal && (
        <Modal meditation={selectedMeditation} closeModal={hideModal} />
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

              {favorites === undefined ? (
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
