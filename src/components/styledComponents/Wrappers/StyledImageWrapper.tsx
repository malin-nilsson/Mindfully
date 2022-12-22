import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledImageWrapper = styled.span`
  border-radius: ${(props: IStylingProps) => props.borderRadius || ''};
  background: ${(props: IStylingProps) => props.background || ''};
  padding: ${(props: IStylingProps) => props.padding || ''};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    max-height: ${(props: IStylingProps) => props.maxHeight || ''};
    margin: ${(props: IStylingProps) => props.margin || '0 0.1rem 0 0'};
  }

  span {
    font-size: 1.1rem;
    margin: 1rem 0;
  }
`
