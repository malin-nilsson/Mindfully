import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledHeadingXXL = styled.h1`
  font-family: var(--text-font);
  font-size: 3rem;
  font-weight: 300;
  margin: 0;
  padding: 0;
  color: ${(props: IStylingProps) => props.color || 'var(--dark-beige)'};
  text-align: center;

  @media ${devices.tablet} {
    font-size: 2.6rem;
  }

  @media ${devices.desktop} {
    font-size: 2.8rem;
    text-align: left;
  }
`

export const StyledHeadingXL = styled.h1`
  font-family: var(--logo-font);
  font-size: 2.3rem;
  text-align: center;
  margin: 1rem 0;
  padding: 0;
  color: ${(props: IStylingProps) => props.color || 'var(--mid-blue)'};

  @media ${devices.tablet} {
    font-size: 2.9rem;
    letter-spacing: 0.02rem;
  }
`

export const StyledHeadingL = styled.h2`
  font-family: var(--logo-font);
  font-size: 2rem;
  text-align: center;
  margin: 1rem 0;
  padding: 0;
  color: ${(props: IStylingProps) => props.color || 'var(--mid-blue)'};

  @media ${devices.tablet} {
    font-size: 2.2rem;
    letter-spacing: 0.02rem;
  }
`

export const StyledHeadingM = styled.h3`
  font-family: var(--text-font);
  color: ${(props: IStylingProps) => props.color || 'var(--dark-beige)'};
  font-size: ${(props: IStylingProps) => props.fontSize || '1.7rem'};
  margin: ${(props: IStylingProps) => props.margin || '0'};
  padding: ${(props: IStylingProps) => props.padding || '0'};
  text-align: left;
  font-weight: ${(props: IStylingProps) => props.fontWeight || '300'};

  @media ${devices.tablet} {
    font-size: ${(props: IStylingProps) => props.fontSize || '2rem'};
  }
`

export const StyledHeadingS = styled.h4`
  font-family: var(--text-font);
  color: ${(props: IStylingProps) => props.color || 'var(--dark-beige)'};
  font-size: ${(props: IStylingProps) => props.fontSize || '1.3rem'};
  margin: 0;
  font-weight: ${(props: IStylingProps) => props.fontWeight || '100'};

  border-bottom: ${(props: IStylingProps) =>
    props.borderBottom || '2px solid var(--mid-blue)'};
`

export const StyledHeadingXS = styled.h5`
  font-family: var(--text-font);
  color: ${(props: IStylingProps) => props.color || 'var(--dark-beige)'};
  font-size: ${(props: IStylingProps) => props.fontSize || '0.9rem'};
  text-transform: ${(props: IStylingProps) =>
    props.textTransform || 'uppercase'};
  margin: 0;
  font-weight: ${(props: IStylingProps) => props.fontWeight || '500'};

  border-bottom: ${(props: IStylingProps) =>
    props.borderBottom || ' 2px solid var(--mid-blue)'};
`

export const StyledHeadingLogo = styled.h4`
  font-family: var(--logo-font);
  color: ${(props: IStylingProps) => props.color || 'var(--mid-blue)'};
  text-transform: lowercase;
  letter-spacing: 0.05rem;
  font-size: ${(props: IStylingProps) => props.fontSize || '2rem'};
  margin: 0 0 0 0.5rem;
  padding: 0;
  display: inline;
`
