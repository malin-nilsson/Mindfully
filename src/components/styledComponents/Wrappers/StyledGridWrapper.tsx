import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'

export const StyledGridWrapper = styled.div`
  display: block;

  @media ${devices.desktop} {
    display: grid;
    grid-template-columns: 1fr 3.5fr;
  }
`
