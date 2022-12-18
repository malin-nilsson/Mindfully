import { useContext, useState } from 'react'
import { StyledCard, StyledMeditationCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXL,
  StyledHeadingM,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { MeditationCatalog as meditations } from '../../data/Meditations'
import { StyledSelect } from '../styledComponents/Select/Select'
import { UserContext } from '../../context/UserContext'

export default function Explore() {
  let currentUser = useContext(UserContext)
  const [allMeditations, setAllMeditations] = useState(true)
  return (
    <>
      <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
        <StyledFlexWrapper>
          <StyledHeadingXL color="var(--dark-beige)">
            Explore, {currentUser.user.displayName}
          </StyledHeadingXL>
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
                  width="20%"
                  borderRadius="15px"
                  height="11rem"
                  justify="center"
                  key={meditation.id}
                  padding="1.5rem 1rem"
                  background="var(--dark-blue)"
                  border="1px solid var(--light-blue)"
                  color="var(--dark-beige)"
                >
                  <StyledImageWrapper maxHeight="50px">
                    <img src={meditation.img} alt="Emoji"></img>
                    <span>{meditation.title} </span>
                  </StyledImageWrapper>
                </StyledMeditationCard>
              )
            })}
          </StyledFlexWrapper>
        </>
      )}
    </>
  )
}
