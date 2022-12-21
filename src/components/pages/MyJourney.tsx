import React from 'react'
import {
  StyledHeadingS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'

export default function MyJourney() {
  return (
    <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
      <StyledFlexWrapper>
        <StyledHeadingXL color="var(--dark-beige)">My journey</StyledHeadingXL>
      </StyledFlexWrapper>

      <StyledFlexWrapper>
        <StyledHeadingS>Meditated minutes:</StyledHeadingS>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
