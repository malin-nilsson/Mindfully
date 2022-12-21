import { ChangeEvent, useState } from 'react'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { MeditationCatalog as meditations } from '../../data/Meditations'
import { StyledSelect } from '../styledComponents/Select/Select'
import { db } from '../../firebase/config'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { IMeditation } from '../../models/IMeditation'
import { getAuth } from 'firebase/auth'

export default function Explore() {
  const auth = getAuth()
  const [allMeditations, setAllMeditations] = useState<IMeditation[]>(
    meditations,
  )
  const [filteredMeditations, setFilteredMeditations] = useState<
    IMeditation[]
  >()
  const [showFilteredMeditations, setShowFilteredMeditations] = useState(false)

  const saveFavorite = async (favorite: IMeditation) => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid)

      try {
        // Get docs for user
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          // Get user favorites
          const faves = docSnap.data().favorites

          for (let i = 0; i < faves.length; i++) {
            // If favorite already exists in Firestore, return
            if (faves[i].title === favorite.title) {
              return
            } // Else, add favorite to Firestore
            else {
              // Add new favorite to existing Firestore array
              const favorites = arrayUnion(favorite)
              // Update favorites doc in firestore
              await updateDoc(userRef, {
                favorites,
              })
            }
          }
        } else {
          console.log('document does not exist')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

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

  return (
    <>
      <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
        <StyledFlexWrapper>
          <StyledHeadingXL color="var(--dark-beige)">Explore</StyledHeadingXL>
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

      <StyledFlexWrapper padding="4rem 1rem 1.5rem" direction="row" gap="3rem">
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
                  onClick={() => saveFavorite(meditation)}
                >
                  <StyledImageWrapper maxHeight="50px">
                    <img src={meditation.img} alt="Emoji"></img>
                    <span>{meditation.title} </span>
                  </StyledImageWrapper>
                  <StyledFlexWrapper align="flex-end" width="100%">
                    <StyledImageWrapper maxHeight="22px">
                      <img
                        src="/assets/icons/favorite-outlined.png"
                        alt="Heart"
                      ></img>
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
                  onClick={() => saveFavorite(meditation)}
                >
                  <StyledImageWrapper maxHeight="50px">
                    <img src={meditation.img} alt="Emoji"></img>
                    <span>{meditation.title} </span>
                  </StyledImageWrapper>
                  <StyledFlexWrapper align="flex-end" width="100%">
                    <StyledImageWrapper maxHeight="22px">
                      <img
                        src="/assets/icons/favorite-outlined.png"
                        alt="Heart"
                      ></img>
                    </StyledImageWrapper>
                  </StyledFlexWrapper>
                </StyledMeditationCard>
              )
            })}
      </StyledFlexWrapper>
    </>
  )
}
