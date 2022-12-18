import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { StyledCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { Timestamp } from '@firebase/firestore'
import { UserContext } from '../../context/UserContext'

export default function Profile() {
  const [email, setEmail] = useState('')
  const [signupDate, setSignupDate] = useState('')
  const auth = getAuth()
  let currentUser = useContext(UserContext)

  return (
    <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
      <StyledFlexWrapper>
        <StyledHeadingXL color="var(--dark-beige)">Profile</StyledHeadingXL>
      </StyledFlexWrapper>

      <StyledFlexWrapper width="100%">
        <StyledCard
          align="flex-start"
          width="50%"
          height="10rem"
          padding="3rem"
          direction="row"
        >
          <StyledFlexWrapper>Bild här</StyledFlexWrapper>

          <StyledFlexWrapper align="flex-start">
            <StyledFlexWrapper direction="row" align="flex-start" margin="0">
              <StyledHeadingXS color="var(--mid-blue)">
                Email address:
              </StyledHeadingXS>
              <span>{currentUser.user.email}</span>
            </StyledFlexWrapper>

            <StyledFlexWrapper direction="row" align="flex-start" margin="0">
              <StyledHeadingXS color="var(--mid-blue)">
                Registered:
              </StyledHeadingXS>
              <span>{currentUser.user.metadata.creationTime}</span>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </StyledCard>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
