import { Outlet } from 'react-router-dom'
import { StyledImageWrapper } from './styledComponents/Wrappers/StyledImageWrapper'
import { StyledLandingPageWrapper } from './styledComponents/Wrappers/StyledLandingPageWrapper'

export default function LayoutStartpage() {
  return (
    <StyledLandingPageWrapper>
      <div className="landingpage-box blue">
        <StyledImageWrapper maxHeight="20rem">
          <img src="/assets/flowers.png" />
        </StyledImageWrapper>
      </div>
      <Outlet></Outlet>
    </StyledLandingPageWrapper>
  )
}
