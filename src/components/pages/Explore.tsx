import { ChangeEvent, useEffect, useState } from 'react'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { MeditationCatalog as meditations } from '../../data/Meditations'
import { StyledSelect } from '../styledComponents/Select/Select'
import { IMeditation } from '../../models/IMeditation'
import Modal from '../styledComponents/Modal/StyledModal'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { getAuth } from 'firebase/auth'

export default function Explore() {
  const [allMeditations, setAllMeditations] = useState<IMeditation[]>(
    meditations,
  )
  const [filteredMeditations, setFilteredMeditations] = useState<
    IMeditation[]
  >()
  const [showFilteredMeditations, setShowFilteredMeditations] = useState(false)
  const [modal, setModal] = useState(false)
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    title: '',
    tag: '',
    img: '',
    icon: '',
    audio: '',
    id: 0,
  })
  const [fillHeart, setFillHeart] = useState(false)
  const auth = getAuth()

  // useEffect(() => {
  //   getFavorites()
  // }, [fillHeart])

  // const getFavorites = async () => {
  //   if (auth.currentUser) {
  //     // Get user from "Users" collection
  //     const userRef = doc(db, 'users', auth.currentUser.uid)

  //     try {
  //       // Get docs for user
  //       const docSnap = await getDoc(userRef)
  //       if (docSnap.exists()) {
  //         // Get user favorites
  //         const faves: IMeditation[] = docSnap.data().favorites
  //         if (faves) {
  //           for (let j = 0; j < faves.length; j++) {
  //             for (let i = 0; i < allMeditations.length; i++) {
  //               if (faves[j].id === allMeditations[i].id) {
  //                 setFillHeart(true)
  //                 console.log(faves[j], allMeditations[i])
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         console.log('Document does not exist')
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

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

  const hideModal = () => {
    setModal(false)
  }

  const showMeditation = (m: IMeditation) => {
    setSelectedMeditation(m)
    setModal(true)
  }

  return (
    <>
      {modal ? (
        <Modal meditation={selectedMeditation} closeModal={hideModal}></Modal>
      ) : (
        <>
          <StyledFlexWrapper
            justify="flex-start"
            padding="1.5rem 0 0"
            width="100%"
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Explore
              </StyledHeadingXL>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
          <StyledFlexWrapper direction="row" color="var(--dark-beige)">
            <span>Filter: </span>
            <StyledSelect>
              <select onChange={(e) => handleOnChange(e.target.value)}>
                <>
                  <option value="All">All meditations</option>;
                  <option value="Sound Meditation">Sound Meditation</option>;
                  <option value="Guided Breathing Meditation">
                    Guided Breathing Meditation
                  </option>
                </>
              </select>
            </StyledSelect>
          </StyledFlexWrapper>

          <StyledFlexWrapper
            padding="4rem 1rem 1.5rem"
            direction="row"
            gap="3rem"
          >
            {showFilteredMeditations && filteredMeditations
              ? filteredMeditations.map((meditation) => {
                  return (
                    <StyledMeditationCard
                      borderRadius="15px"
                      height="11rem"
                      justify="center"
                      key={meditation.id}
                      padding="1.5rem 1rem"
                      background="var(--dark-blue)"
                      border="1px solid var(--light-blue)"
                      color="var(--dark-beige)"
                      onClick={() => showMeditation(meditation)}
                    >
                      <StyledImageWrapper maxHeight="50px">
                        <img src={meditation.icon} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="22px">
                          {fillHeart ? (
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
                      borderRadius="15px"
                      height="11rem"
                      justify="center"
                      key={meditation.id}
                      padding="1.5rem 1rem"
                      background="var(--dark-blue)"
                      border="1px solid var(--light-blue)"
                      color="var(--dark-beige)"
                      onClick={() => showMeditation(meditation)}
                    >
                      <StyledImageWrapper maxHeight="50px">
                        <img src={meditation.icon} alt="Emoji"></img>
                        <span>{meditation.title} </span>
                      </StyledImageWrapper>
                      <StyledFlexWrapper align="flex-end" width="100%">
                        <StyledImageWrapper maxHeight="22px">
                          {fillHeart ? (
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
        </>
      )}
    </>
  )
}
