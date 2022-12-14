import styled from 'styled-components'
import { devices } from '../../Breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  width: ${(props: IStylingProps) => props.width || ''};
  padding: ${(props: IStylingProps) => props.padding || ''};
`
export const StyledButtonWrapper = styled.div`
  @media ${devices.desktop} {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
`
