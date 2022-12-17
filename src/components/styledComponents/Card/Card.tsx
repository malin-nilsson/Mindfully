import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledCard = styled.div`
  display: flex;
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  gap: 2rem;
  justify-content: ${(props: IStylingProps) => props.justify || 'flex-start'};
  align-items: ${(props: IStylingProps) => props.align || 'center'};
  flex-wrap: wrap;
  color: var(--mid-blue);
  padding: ${(props: IStylingProps) =>
    props.padding || ' 1.7rem 1.6rem 1.3rem'};
  background: var(--dark-beige);
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
    font-size: 0.9rem;
    font-weight: 100;
  }
`

export const StyledMeditationCard = styled(StyledCard)`
  background: var(--dark-blue);
  color: var(--dark-beige);
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--light-blue);

  &:hover {
    cursor: pointer;
    transform: translate(-0.2rem, -0.5rem);
    background: var(--light-blue);
  }
`
