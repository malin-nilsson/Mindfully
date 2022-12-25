import React from 'react'
import { Link } from 'react-router-dom'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import {
  StyledHeadingM,
  StyledHeadingS,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'

export default function NotFound() {
  return (
    <StyledFlexWrapper height="100vh" bgColor="var(--mid-blue)">
      <StyledHeadingS borderBottom="unset">
        Uh oh, we couldn't find that page.
      </StyledHeadingS>
      <Link to="/">
        <StyledButton width="100%">Go back</StyledButton>
      </Link>
    </StyledFlexWrapper>
  )
}
