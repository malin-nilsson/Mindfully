import React from 'react'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'

export default function Home() {
  return (
    <StyledFlexWrapper
      bgColor="var(--dark-blue)"
      height="100vh"
      justify="flex-start"
      padding="5rem 0"
    >
      <StyledHeadingXL color="var(--dark-beige)">Hi, Malin.</StyledHeadingXL>
      <StyledText
        margin="0"
        color="var(--dark-beige)"
        fontSize="1.5rem"
        fontWeight="300"
      >
        How are you feeling today?
      </StyledText>
    </StyledFlexWrapper>
  )
}
