import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: ${(props: IStylingProps) => props.justify || 'center'};
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  height: ${(props: IStylingProps) => props.height || ''};
  background-color: ${(props: IStylingProps) => props.bgColor || ''};
  width: ${(props: IStylingProps) => props.width || ''};
  padding: ${(props: IStylingProps) => props.padding || ''};
`
export const StyledButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;

  @media ${devices.tablet} {
    width: 50%;
  }

  @media ${devices.desktop} {
    width: 30%;
  }
`
