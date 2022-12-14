import { Link } from 'react-router-dom'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledHeadingL } from '../styledComponents/Headings/StyledHeadings'
import {
  StyledButtonWrapper,
  StyledFlexWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'

export default function Welcome() {
  return (
    <>
      <StyledFlexWrapper>
        <StyledHeadingL>Take a mindful break.</StyledHeadingL>
        <StyledButtonWrapper>
          <Link to="/login">
            <StyledButton margin="1rem 0">
              <span>
                <img src="/assets/stars-dkblue.png" alt="Stars"></img>
              </span>
              Log in
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton
              bgColor="var(--dark-blue)"
              color="var(--dark-beige)"
              border="1px solid var(--dark-beige)"
              margin="1rem 0"
            >
              <span>
                <img src="/assets/stars-beige.png" alt="Stars"></img>
              </span>
              Create a free account
            </StyledButton>
          </Link>
        </StyledButtonWrapper>
      </StyledFlexWrapper>
    </>
  )
}
