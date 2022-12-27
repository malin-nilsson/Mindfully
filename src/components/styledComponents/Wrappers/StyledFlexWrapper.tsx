import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledFlexWrapper = styled.div`
  display: flex;
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

  .favorites-wrapper {
    @media ${devices.tablet} {
      width: 100%;
      margin: 2rem 0;
    }

    @media ${devices.desktop} {
      width: 100%;
    }
  }
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

export const StyledProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
  padding: 1.5rem 0;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
`
