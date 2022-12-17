import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { StyledCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledText } from '../styledComponents/Text/StyledText'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { Timestamp } from '@firebase/firestore'

export default function Profile() {
  const [email, setEmail] = useState('')
  const [signupDate, setSignupDate] = useState('')
  const auth = getAuth()

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        let date = new Date(user.metadata.creationTime as string).toDateString()
        setEmail(user.email as string)
        setSignupDate(date)
      } else {
        console.log('unauthorized')
      }
    })
    return () => AuthCheck()
  }, [])

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
              <StyledHeadingXS color="var(--dark-blue)">
                Email address:
              </StyledHeadingXS>
              <span>{email}</span>
            </StyledFlexWrapper>

            <StyledFlexWrapper direction="row" align="flex-start" margin="0">
              <StyledHeadingXS color="var(--dark-blue)">
                Registered:
              </StyledHeadingXS>
              <span>{signupDate}</span>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </StyledCard>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  )
}
