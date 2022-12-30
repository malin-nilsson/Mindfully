import { Link } from 'react-router-dom'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import {
  StyledHeadingM,
  StyledHeadingXXL,
} from '../styledComponents/Headings/StyledHeadings'
import {
  StyledButtonWrapper,
  StyledFlexWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'

export default function Welcome() {
  return (
    <>
      <StyledFlexWrapper gap="unset">
        <StyledFlexWrapper
          padding="0 2rem"
          direction="row"
          align="center"
          justify="center"
          className="landing-wrapper"
        >
          <div className="landing-heading-wrapper">
            <StyledHeadingXXL>
              Mindfulness for any mind, any mood, and any goal.
            </StyledHeadingXXL>
          </div>

          <StyledButtonWrapper>
            <Link to="/login">
              <StyledButton
                bgColor="var(--mid-blue)"
                color="var(--dark-beige)"
                margin="0.5rem 0"
                border="1px solid var(--dark-beige)"
              >
                <StyledImageWrapper maxHeight="22px">
                  <img src="/assets/icons/stars-beige.png" alt="Stars"></img>
                </StyledImageWrapper>
                Log in
              </StyledButton>
            </Link>
            <Link to="/signup">
              <StyledButton
                border="1px solid var(--mid-blue)"
                margin="0.5rem 0"
              >
                <StyledImageWrapper maxHeight="22px">
                  <img src="/assets/icons/stars-dkblue.png" alt="Stars"></img>
                </StyledImageWrapper>
                Create a free account
              </StyledButton>
            </Link>
          </StyledButtonWrapper>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </>
  )
}
