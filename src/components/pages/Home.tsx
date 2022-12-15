import React from 'react'
import { StyledHeadingL } from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'

export default function Home() {
  return (
    <StyledFlexWrapper
      bgColor="var(--dark-blue)"
      height="100vh"
      justify="flex-start"
      padding="3rem 0"
    >
      <StyledHeadingL color="var(--dark-beige)">
        {' '}
        <StyledImageWrapper maxHeight="45px" margin="0 1.3rem 0 0">
          <img src="/assets/flower.png" alt="Flower"></img>
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
    </StyledFlexWrapper>
  )
}
