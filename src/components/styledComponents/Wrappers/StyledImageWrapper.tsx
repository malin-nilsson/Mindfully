import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledImageWrapper = styled.span`
  img {
    max-height: ${(props: IStylingProps) => props.maxHeight || ''};
    margin: ${(props: IStylingProps) => props.margin || '0 0.1rem 0 0'};
  }
`
