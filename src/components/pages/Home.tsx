import React from 'react'
import { StyledHeadingL } from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { moods } from '../../assets/Moods/Moods'
import { StyledCard } from '../styledComponents/Card/Card'
import { getAuth, signOut } from 'firebase/auth'

export default function Home() {
  const auth = getAuth()

  return (
    <StyledFlexWrapper
      bgColor="var(--dark-blue)"
      justify="flex-start"
      padding="3rem 0"
      height="100vh"
    >
      <button onClick={() => signOut(auth)}>Sign out</button>
      <StyledHeadingL color="var(--dark-beige)">
        {' '}
        <StyledImageWrapper maxHeight="45px" margin="0 1.3rem 0 0">
          <img src="/assets/icons/flower.png" alt="Flower"></img>
        </StyledImageWrapper>
        Hi, Malin.
      </StyledHeadingL>
      <StyledText
        margin="0"
        color="var(--dark-beige)"
        fontSize="1.6rem"
        fontWeight="100"
      >
        How are you feeling today?
      </StyledText>
      <StyledFlexWrapper direction="row">
        {moods.map((mood) => {
          return (
            <StyledCard>
              <StyledImageWrapper maxHeight="30px">
                <img src={mood} alt="Emoji"></img>
                Sad
              </StyledImageWrapper>
            </StyledCard>
          )
        })}
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
