import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledLink = styled.a`
  font-family: var(--text-font);
  color: ${(props: IStylingProps) => props.color || 'var(--dark-beige)'};
  font-size: ${(props: IStylingProps) => props.fontSize || '0.9rem'};
  text-transform: ${(props: IStylingProps) =>
    props.textTransform || 'uppercase'};
  margin: 0;
  font-weight: ${(props: IStylingProps) => props.fontWeight || '500'};
  display: inline;
`
