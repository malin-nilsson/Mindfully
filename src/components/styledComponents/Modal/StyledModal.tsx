import React from 'react'
import styled from 'styled-components'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import CloseIcon from '@mui/icons-material/Close'
import { StyledCard } from '../Card/Card'
import { StyledHeadingM, StyledHeadingXS } from '../Headings/StyledHeadings'
import UpdateIcon from '@mui/icons-material/Update'
import { Slider } from '@mui/material'
import { StyledButton } from '../Button/StyledButton'

export default function Modal() {
  return (
    <StyledModal>
      <StyledFlexWrapper
        align="flex-end"
        padding="2rem 1rem"
        width="auto"
        margin="unset"
      >
        <StyledImageWrapper align="flex-end">
          <CloseIcon style={{ color: '#fff' }} fontSize="large" />
        </StyledImageWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper
        margin="0 1rem 1rem"
        justify="flex-end"
        align="flex-start"
      >
        <StyledCard padding="0" align="flex-start" width="25rem">
          <StyledFlexWrapper
            direction="row"
            align="center"
            justify="flex-start"
            padding="0.5rem 0.8rem"
            margin="unset"
          >
            <UpdateIcon />
            <StyledHeadingXS
              textTransform="unset"
              color="var(--dark-blue)"
              borderBottom="none"
            >
              Meditation length
            </StyledHeadingXS>
          </StyledFlexWrapper>

          <StyledFlexWrapper
            direction="row"
            align="center"
            justify="flex-start"
            margin="0 1rem"
            width="100%"
            gap="unset"
          >
            <StyledFlexWrapper gap="unset" margin="unset">
              <StyledHeadingM fontWeight="700" color="var(--dark-blue)">
                15
              </StyledHeadingM>
              <StyledHeadingXS
                textTransform="unset"
                color="var(--dark-blue)"
                borderBottom="none"
              >
                minutes
              </StyledHeadingXS>
            </StyledFlexWrapper>

            <StyledFlexWrapper width="60%">
              <Slider
                aria-label="Minutes"
                defaultValue={10}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={60}
                style={{ color: '#001432' }}
              />
            </StyledFlexWrapper>
            <StyledFlexWrapper width="80%">
              <StyledButton
                width="100%"
                bgColor="var(--mid-blue)"
                color="var(--dark-beige)"
                margin="1rem 0"
                fontWeight="300"
              >
                Start meditation
              </StyledButton>
            </StyledFlexWrapper>
          </StyledFlexWrapper>
        </StyledCard>
      </StyledFlexWrapper>
    </StyledModal>
  )
}

export const StyledModal = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 20;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`
