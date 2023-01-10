import { Link } from 'react-router-dom'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledHeadingS } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'

export default function NotFound() {
  return (
    <StyledFlexWrapper
      position="absolute"
      top="0"
      left="0"
      height="100vh"
      width="100vw"
      bgColor="var(--mid-blue)"
      padding="1rem 0"
    >
      <div className="not-found-wrapper">
        <StyledImageWrapper maxHeight="25rem">
          <img src="/assets/404.png" alt="404" />
        </StyledImageWrapper>
        <StyledHeadingS borderBottom="unset">
          Uh oh, we couldn't find that page.
        </StyledHeadingS>
        <Link to="/">
          <StyledButton>Go back</StyledButton>
        </Link>
      </div>
    </StyledFlexWrapper>
  )
}
