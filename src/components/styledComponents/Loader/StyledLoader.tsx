import styled, { keyframes } from 'styled-components'
import { StyledHeadingL } from '../Headings/StyledHeadings'
import { IStylingProps } from '../models/IStylingProps'

interface ILoaderProps {
  message?: string
}
export default function Loader(props: ILoaderProps) {
  return (
    <StyledLoader>
      <div className="loader-wrapper">
        <StyledHeadingL color="var(--dark-beige)">
          {props.message}
        </StyledHeadingL>
        <span className="loader"></span>
      </div>
    </StyledLoader>
  )
}

const loader = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const StyledLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: var(--dark-blue);
  z-index: 10;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  
  .loader-wrapper {
    margin: ${(props: IStylingProps) => props.margin || '12rem auto 0px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loader {
    width: 4.5rem;
    height: 4.5rem;
    border: 8px solid var(--dark-beige);
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: 1rem 0;
    display: inline-block;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${loader} 2s linear infinite;
  }
`
