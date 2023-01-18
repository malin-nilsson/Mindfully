import { Outlet } from 'react-router-dom'
import { StyledImageWrapper } from './styledComponents/Wrappers/StyledImageWrapper'
import { StyledLandingPageWrapper } from './styledComponents/Wrappers/StyledLandingPageWrapper'

// LANDING PAGE LAYOUT (LOGIN/SIGNUP) //
export default function LayoutStartpage() {
  return (
    <StyledLandingPageWrapper>
      <div className="landingpage-box blue">
        <StyledImageWrapper>
          <img src="/assets/flowers.png" />
        </StyledImageWrapper>
      </div>
      <Outlet></Outlet>
    </StyledLandingPageWrapper>
  )
}
