import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledCard = styled.div`
  display: ${(props: IStylingProps) => props.display || 'flex'};
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  gap: ${(props: IStylingProps) => props.gap || '2rem'};
  justify-content: ${(props: IStylingProps) => props.justify || 'flex-start'};
  align-items: ${(props: IStylingProps) => props.align || 'center'};
  flex-wrap: wrap;
  color: ${(props: IStylingProps) => props.color || ' var(--mid-blue)'};
  padding: ${(props: IStylingProps) =>
    props.padding || ' 1.7rem 1.6rem 1.3rem'};
  background-color: ${(props: IStylingProps) =>
    props.bgColor || 'var(--dark-beige)'};
  border-radius: ${(props: IStylingProps) => props.borderRadius || '15px'};
  width: ${(props: IStylingProps) => props.width || '15.5rem'};
  height: ${(props: IStylingProps) => props.height || '14rem'};
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translate(-0.2rem, -0.5rem);
    background: var(--light-beige);
  }

  p {
    margin: 0 0 1rem;
    font-size: 0.9rem;
  }
  span {
    text-align: center;
    font-size: 0.9rem;
    font-weight: 100;
  }
`

export const StyledTimerCard = styled(StyledCard)`
  @media ${devices.desktop} {
    height: 14rem;
    width: 15rem;
    padding: 0rem;
  }
  &:hover {
    cursor: unset;
    transform: unset;
    background: var(--dark-beige);
  }
`

export const StyledMeditationCard = styled(StyledCard)`
  background: var(--dark-blue);
  color: var(--dark-beige);
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--light-blue);
  width: 100%;
  height: ${(props: IStylingProps) => props.height || '14rem'};
  padding: 1.5rem 1rem;
  border-radius: 15px;
  justify-content: center;
  height: 11rem;

  &:hover {
    cursor: pointer;
    transform: translate(-0.2rem, -0.5rem);
    background: var(--light-blue);
  }

  @media ${devices.tablet} {
    width: ${(props: IStylingProps) => props.width || '20%'};
    margin: unset;
    padding: ${(props: IStylingProps) => props.padding || ''};
  }
`
export const StyledProfileCard = styled(StyledMeditationCard)`
  height: unset;
  padding: 2rem;
  width: 90%;
  box-sizing: border-box;
  background: var(--dark-blue);
  margin: 0 0 2rem;

  &:hover {
    cursor: default;
    transform: unset;
    background: var(--light-blue);
  }

  @media ${devices.tablet} {
    width: 70%;
    padding: 2rem 3rem;
  }

  @media ${devices.desktop} {
    padding: 1.5rem 3rem;
    width: 50%;
  }

  .profile-picture-btn {
    width: 100%;
    padding: 1rem 0.5rem;
    font-size: 0.8rem;

    @media ${devices.tablet} {
      width: 30%;
      padding: 0.5rem;
    }
  }
`
