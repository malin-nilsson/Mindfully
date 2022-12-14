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
      <StyledFlexWrapper padding="1.5rem">
        <StyledHeadingL>Take a mindful break.</StyledHeadingL>
        <StyledButtonWrapper>
          <Link to="/login">
            <StyledButton
              bgColor="var(--dark-blue)"
              color="var(--dark-beige)"
              margin="0.5rem 0"
            >
              <span>
                <img src="/assets/stars-beige.png" alt="Stars"></img>
              </span>
              Log in
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton border="1px solid var(--dark-blue)" margin="0.5rem 0">
              <span>
                <img src="/assets/stars-dkblue.png" alt="Stars"></img>
              </span>
              Create a free account
            </StyledButton>
          </Link>
        </StyledButtonWrapper>
      </StyledFlexWrapper>
    </>
  )
}
