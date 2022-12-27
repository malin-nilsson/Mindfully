import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { IMeditation } from '../../models/IMeditation'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import Modal from '../styledComponents/Modal/StyledModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { getUser } from '../../utils/getUser'
import { getFavorites } from '../../utils/getFavorites'

export default function Favorites() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<IMeditation[]>()
  const [modal, setModal] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        showFavorites()
      } else {
        navigate('/')
      }
    })
  }, [auth, favorites])

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

  const showMeditation = (m: IMeditation) => {
    setSelectedMeditation(m)
    setModal(true)
  }

  const hideModal = () => {
    setModal(false)
  }

  return (
    <>
      {modal ? (
        <Modal meditation={selectedMeditation} closeModal={hideModal}></Modal>
      ) : (
        <StyledFlexWrapper
          justify="flex-start"
          padding="1.5rem 0 0"
          width="100%"
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
                gap="3rem"
                width="100%"
                margin="1.5rem 0"
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
                        onClick={() => showMeditation(favorite)}
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
      )}
    </>
  )
}
