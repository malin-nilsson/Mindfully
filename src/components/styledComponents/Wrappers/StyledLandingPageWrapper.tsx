import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export default function LandingPageWrapper() {
  return (
    <>
      <div className="landingpage-box"></div>
      <div className="landingpage-box"></div>
    </>
  )
}

export const StyledLandingPageWrapper = styled.div`
  background-color: ${(props: IStylingProps) =>
    props.bgColor || 'var(--dark-beige)'};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;

  @media ${devices.desktop} {
    flex-direction: row;
  }

  .landingpage-box {
    width: 50%;
    background-color: var(--dark-blue);
    display: flex;
    justify-content: center;
    align-items: center;

    > div:nth-of-type(1) {
      background-color: var(--dark-beige);
    }
  }
`
