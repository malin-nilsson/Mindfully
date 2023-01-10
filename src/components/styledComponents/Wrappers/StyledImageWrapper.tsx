import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledImageWrapper = styled.span`
  border-radius: ${(props: IStylingProps) => props.borderRadius || ''};
  background: ${(props: IStylingProps) => props.background || ''};
  padding: ${(props: IStylingProps) => props.padding || ''};
  border: ${(props: IStylingProps) => props.border || ''};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: auto;
    max-height: ${(props: IStylingProps) => props.maxHeight || ''};
    margin: ${(props: IStylingProps) => props.margin || '0 0.1rem 0 0'};
  }

  span {
    font-size: 1rem;
    margin: 1rem 0;
  }

  .profile-picture {
    border-radius: 50%;
    height: 8rem;
    width: 8rem;
  }

  .image {
    position: relative;

    .upload-icon {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      background-color: var(--dark-beige);
      border-radius: 50%;
      padding: 0.5rem;
      margin-right: -10px;
      margin-bottom: -5px;
    }
  }
`
