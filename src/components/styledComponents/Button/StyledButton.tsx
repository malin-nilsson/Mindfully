import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0.9rem;
  border: ${(props: IStylingProps) => props.border || 'none'};
  font-weight: ${(props: IStylingProps) => props.fontWeight || '600'};
  font-size: ${(props: IStylingProps) => props.fontSize || '0.9rem'};
  padding: 1rem 2rem;
  width: ${(props: IStylingProps) => props.width || '100%'};
  color: ${(props: IStylingProps) => props.color || 'var(--mid-blue)'};
  margin: ${(props: IStylingProps) => props.margin || ''};
  background-color: ${(props: IStylingProps) =>
    props.bgColor || 'var(--dark-beige)'};
  transition: transform 0.2s ease-in-out;

  @media ${devices.tablet} {
    font-size: ${(props: IStylingProps) => props.fontSize || '1rem'};
    width: ${(props: IStylingProps) => props.width || '100%'};
  }

  @media ${devices.desktop} {
    width: ${(props: IStylingProps) => props.width || '100%'};
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-0.15rem);
  }

  img {
    transform: rotate(-30deg);
  }
`
