import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  background: var(--dark-beige);
  border-radius: ${(props: IStylingProps) => props.borderRadius || ''};
  width: ${(props: IStylingProps) => props.width || ''};
`
