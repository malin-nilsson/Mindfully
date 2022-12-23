import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { MeditationContext } from '../../context/MeditationContext'
import { db } from '../../firebase/config'
import { IMeditation } from '../../models/IMeditation'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import Modal from '../styledComponents/Modal/StyledModal'

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
        getFavorites()
      } else {
        navigate('/')
      }
    })
  }, [auth])

  const getFavorites = async () => {
    if (auth.currentUser) {
      // Get user from "Users" collection
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves = docSnap.data().favorites
          if (faves) {
            setFavorites(faves)
          }
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
                <img
                  src="/assets/icons/favorite-outlined.png"
                  alt="Heart"
                ></img>
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
                            <img
                              src="/assets/icons/favorite-filled.png"
                              alt="Heart"
                            ></img>
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
