import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledText = styled.p`
  color: ${(props: IStylingProps) => props.color || 'var(--dark-blue'};
  margin: ${(props: IStylingProps) => props.margin || '1rem'};
  font-size: ${(props: IStylingProps) => props.fontSize || '1rem'};
  font-weight: ${(props: IStylingProps) => props.fontWeight || '400'};
`
