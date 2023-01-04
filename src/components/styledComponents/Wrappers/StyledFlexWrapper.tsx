import styled, { keyframes } from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

const fadeOut = keyframes`
    0% {opacity: 1;}
            100% {opacity: 0;}
`

const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`

const shake = keyframes` 
10%, 90% { transform: translate3d(-1px, 0, 0); }

20%, 80% {
  transform: translate3d(2px, 0, 0);
}

30%, 50%, 70% {
  transform: translate3d(-4px, 0, 0);
}

40%, 60% {
  transform: translate3d(4px, 0, 0);
}
`
export const StyledFlexWrapper = styled.div`
  display: ${(props: IStylingProps) => props.display || 'flex'};
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  flex-wrap: wrap;
  justify-content: ${(props: IStylingProps) => props.justify || 'center'};
  align-items: ${(props: IStylingProps) => props.align || 'center'};
  gap: ${(props: IStylingProps) => props.gap || '1rem'};
  margin: ${(props: IStylingProps) => props.margin || '0 auto'};
  height: ${(props: IStylingProps) => props.height || ''};
  background-color: ${(props: IStylingProps) => props.bgColor || ''};
  width: ${(props: IStylingProps) => props.width || ''};
  padding: ${(props: IStylingProps) => props.padding || ''};
  color: ${(props: IStylingProps) => props.color || 'var(--mid-blue)'};
  border-radius: ${(props: IStylingProps) => props.borderRadius || ''};

  .favorites-wrapper {
    @media ${devices.tablet} {
      width: 100%;
      margin: 2rem 0;
    }

    @media ${devices.desktop} {
      width: 100%;
    }
  }

  .landing-wrapper {
    display: flex;

    @media ${devices.tablet} {
      gap: 3rem;
    }
    @media ${devices.desktop} {
      gap: 6rem;
    }
  }
  .landing-heading-wrapper {
    padding: 1.5rem 0 0;

    @media ${devices.desktop} {
      width: 50%;
      padding: 2rem 0;
    }
  }

  .history-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    background-color: var(--dark-blue);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-radius: 1rem;

    @media ${devices.desktop} {
      width: 40%;
      padding: 1.5rem 2rem;
    }

    span {
      display: inline-block;
      color: var(--dark-beige);
      font-size: 0.85rem;
    }

    .history-single {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .shake {
    animation: ${shake} 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  .timer {
    font-size: 2rem;
    color: var(--light-beige);
    -webkit-text-stroke: 1px var(--mid-blue);
    font-weight: 500;

    @media ${devices.desktop} {
      font-size: 2.7rem;
    }
  }

  .profile-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    label {
      color: var(--dark-beige);
      text-transform: uppercase;
      font-size: 0.9rem;
    }

    input {
      box-sizing: border-box;
      padding: 0.7rem;
      width: 100%;
      border: 1px solid var(--dark-beige);
      font-size: 1rem;

      &:focus {
        outline: none;
        border: 1px solid var(--dark-beige);
      }
      &:disabled {
        background-color: #908b8b;
        color: var(--light-beige);
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 1rem 0;
      width: 100%;
    }
    .confirmation {
      color: var(--dark-beige);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .error {
      color: #a90000;
      margin: 0;
      padding: 0.5rem;
      background-color: var(--dark-beige);
      border: 1px solid #a90000;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .error-input {
      border: 1px solid #a90000;
    }

    span {
      font-size: 0.85rem;
    }
  }
  .link-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
    background-color: var(--dark-beige);
    padding: 0.5rem 1.5rem;
    color: var(--dark-blue);
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    &:hover {
      transform: translateY(-0.15rem);
      cursor: pointer;
    }
  }

  .show {
    display: flex;
    visibility: visible;
    animation: ${fadeIn} 0.5s forwards;
    animation-fill-mode: forwards;
  }

  .hide {
    visibility: none;
    animation: ${fadeOut} 0.5s forwards;
    animation-fill-mode: forwards;
  }
`

export const StyledButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  gap: ${(props: IStylingProps) => props.gap || ''};

  @media ${devices.tablet} {
    width: ${(props: IStylingProps) => props.width || '50%'};
  }

  @media ${devices.desktop} {
    width: ${(props: IStylingProps) => props.width || '30%'};
  }
`

export const StyledProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;

  @media ${devices.tablet} {
    padding: 1.5rem 0;
    margin: 1rem 0;
    flex-direction: row;
    gap: 2rem;
    padding: 2rem 0 2.5rem;
    margin: 2rem 0;
    align-items: center;
    justify-content: center;
  }
`
