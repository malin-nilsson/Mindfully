import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 0.9rem;
  border: ${(props: IStylingProps) => props.border || 'none'};
  font-weight: 600;
  font-size: 0.9rem;
  padding: 1rem 2rem;
  width: 100%;
  color: ${(props: IStylingProps) => props.color || 'var(--dark-blue)'};
  margin: ${(props: IStylingProps) => props.margin || ''};
  background-color: ${(props: IStylingProps) =>
    props.bgColor || 'var(--dark-beige)'};
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translateY(-0.15rem);
  }

  img {
    max-height: 25px;
    transform: rotate(-30deg);
    margin-right: 5px;
  }
`
