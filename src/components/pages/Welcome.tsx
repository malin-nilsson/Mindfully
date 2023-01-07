// REACT ROUTER //
import { Link } from 'react-router-dom'
// STYLED COMPONENTS //
import { StyledButton } from '../styledComponents/Button/StyledButton'
import {
  StyledHeadingLogo,
  StyledHeadingS,
} from '../styledComponents/Headings/StyledHeadings'
import {
  StyledButtonWrapper,
  StyledFlexWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'

export default function Welcome() {
  return (
    <>
      <div className="landingpage-box beige">
        <StyledFlexWrapper
          padding="0"
          direction="column"
          align="center"
          justify="center"
          width="100%"
          margin="1rem 0"
          height="100%"
        >
          <StyledFlexWrapper direction="row" gap="unset">
            <StyledImageWrapper maxHeight="25px" margin="00">
              <img
                src="/assets/logo/logo-dkblue.png"
                alt="Mindfully Logo"
              ></img>
            </StyledImageWrapper>
            <StyledHeadingLogo color="var(--dark-blue)">
              Mindfully
            </StyledHeadingLogo>
          </StyledFlexWrapper>

          <StyledFlexWrapper width="100%" className="login-wrapper">
            <StyledFlexWrapper margin="1rem 0 0">
              <StyledHeadingS color="var(--dark-blue)" borderBottom="unset">
                Welcome to Mindfully.
              </StyledHeadingS>
            </StyledFlexWrapper>
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
                  border="1px solid var(--dark-blue)"
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
      </div>
    </>
  )
}
