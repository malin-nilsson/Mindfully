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
  flex-wrap: ${(props: IStylingProps) => props.flexWrap || 'wrap'};
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
  position: ${(props: IStylingProps) => props.position || ''};
  top: ${(props: IStylingProps) => props.top || ''};
  left: ${(props: IStylingProps) => props.left || ''};
  border: ${(props: IStylingProps) => props.border || ''};
  box-sizing: border-box;

  span {
    font-size: 0.95rem;
    font-weight: 300;
  }

  .favorites-wrapper {
    width: 100%;
    box-sizing: border-box;

    @media ${devices.tablet} {
      margin: 2rem 0;
    }
  }

  .landing-wrapper {
    display: flex;

    @media ${devices.tablet} {
      gap: 2rem;
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

  .login-wrapper {
    margin: 2rem 0;
    @media ${devices.desktop} {
      margin: 6rem 0;
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
    width: 95%;
    padding: 1.5rem;
    box-sizing: border-box;

    @media ${devices.tablet} {
      width: 85%;
      padding: 1.5rem 2rem;
    }

    @media ${devices.desktop} {
      width: 70%;
      gap: 1.5rem;
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
      padding: 0.2rem 0 0.6rem;
      border-bottom: 1px solid var(--mid-blue);
    }
  }

  .icon-wrapper {
    &:hover {
      cursor: pointer;
    }
  }

  .copyright {
    font-size: 0.75rem;
    margin-left: auto;
    padding: 0.5rem 1.5rem;

    a {
      color: #000;
      text-decoration: underline;
    }
  }

  .filter-wrapper-mobile {
    @media ${devices.tablet} {
      display: none;
    }
  }
  .filter-wrapper {
    display: none;

    @media ${devices.tablet} {
      display: flex;
      width: 70%;
      padding: 0;
      gap: 2.5rem;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 1rem;
    }

    button {
      font-weight: 500;
      width: auto;
      font-size: 0.85rem;
      padding: 1.1rem 1.2rem;
    }
  }
  .filter-link {
    &:hover {
      cursor: pointer;
    }
  }
  .active-link {
    border-bottom: 1px solid black;
  }

  .shake {
    animation: ${shake} 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  .timer {
    font-size: 1rem;
    color: var(--light-beige);
    font-weight: 500;
    text-align: left;

    @media ${devices.desktop} {
      font-size: 1.7rem;
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
        -webkit-text-fill-color: var(--light-beige);
        opacity: 1; /* required on iOS */
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 1rem 0;
      width: 100%;

      span {
        text-align: left;
      }
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
      width: 100%;
      box-sizing: border-box;
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
    animation: ${fadeIn} 0.3s forwards;
    animation-fill-mode: forwards;
  }

  .hide {
    visibility: none;
    animation: ${fadeOut} 0.3s forwards;
    animation-fill-mode: forwards;
  }

  .not-found-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img {
      max-height: 10rem;

      @media ${devices.tablet} {
        max-height: 15rem;
      }
      @media ${devices.desktop} {
        max-height: 25rem;
      }
    }

    button {
      margin: 2rem 0;
      width: 100%;
    }

    h4 {
      text-align: center;
    }
  }
`

export const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  gap: ${(props: IStylingProps) => props.gap || ''};
  box-sizing: border-box;
  padding: ${(props: IStylingProps) => props.padding || '0 1rem'};

  @media ${devices.tablet} {
    width: ${(props: IStylingProps) => props.width || '50%'};
    padding: unset;
  }
`

export const StyledProgressWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 2rem;
  padding: 1rem;
  background-color: var(--dark-blue);
  font-size: 0.8rem;

  @media ${devices.tablet} {
    padding: 1.5rem 0;
    margin: 1rem 0;
    flex-direction: row;
    padding: 2rem 1rem;
    margin: 2rem 0;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 1rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  @media ${devices.desktop} {
    padding: 2rem;
    width: 85%;
    gap: 3.5rem;
  }

  /* SAFARI */
  .safari_only:not(:root:root) {
    margin: 0.5rem 0;
  }
`
