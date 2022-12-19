import { useState } from 'react'
import { StyledMeditationCard } from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { MeditationCatalog as meditations } from '../../data/Meditations'
import { StyledSelect } from '../styledComponents/Select/Select'
import { db } from '../../firebase/config'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { IMeditation } from '../../models/IMeditation'
import { UserContext } from '../../context/UserContext'
import { getAuth } from 'firebase/auth'

export default function Explore() {
  const [allMeditations, setAllMeditations] = useState(true)
  const auth = getAuth()

  const saveFavorite = async (favorite: IMeditation) => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid)
      // Add new favorite to firestore array
      const favorites = arrayUnion(favorite)
      // Update favorites in firestore
      await updateDoc(userRef, {
        favorites,
      })
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
          <select>
            <option value="1">All meditations</option>
            <option value="2">Guided Breathing Meditations</option>
            <option value="3">Sound Meditations</option>
          </select>
        </StyledSelect>
      </StyledFlexWrapper>
      {allMeditations && (
        <>
          <StyledFlexWrapper
            padding="4rem 1rem 1.5rem"
            direction="row"
            gap="3rem"
          >
            {meditations.map((meditation) => {
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
      )}
    </>
  )
}
