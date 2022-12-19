import { useContext } from 'react'
import { StyledCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { UserContext } from '../../context/UserContext'

export default function Profile() {
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
