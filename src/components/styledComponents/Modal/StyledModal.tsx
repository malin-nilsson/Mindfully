import styled from 'styled-components'
import { StyledFlexWrapper } from '../Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../Wrappers/StyledImageWrapper'
import CloseIcon from '@mui/icons-material/Close'
import { StyledCard } from '../Card/Card'
import { StyledHeadingM, StyledHeadingXS } from '../Headings/StyledHeadings'
import UpdateIcon from '@mui/icons-material/Update'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Slider } from '@mui/material'
import { StyledButton } from '../Button/StyledButton'
import { devices } from '../../breakpoints/Breakpoints'
import { useEffect, useState } from 'react'
import { IMeditation } from '../../../models/IMeditation'
import { IStylingProps } from '../models/IStylingProps'

export default function Modal() {
  const [selectedMeditation, setSelectedMeditation] = useState<IMeditation>({
    id: 0,
    tag: '',
    title: '',
    icon: '',
    img: '',
    audio: '',
  })

  useEffect(() => {
    const meditation = JSON.parse(
      localStorage.getItem('selectedMeditation') as string,
    )
    setSelectedMeditation(meditation)
  }, [])

  return (
    <StyledModal backgroundImage={`url(${selectedMeditation.img})`}>
      <StyledFlexWrapper
        align="flex-end"
        padding="2rem 1rem"
        width="auto"
        margin="unset"
        className="modal-wrapper"
      >
        <StyledImageWrapper
          align="flex-end"
          borderRadius="50%"
          background="var(--dark-blue)"
          padding="0.2rem"
        >
          <CloseIcon style={{ color: '#f7dba8' }} fontSize="medium" />
        </StyledImageWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper
        justify="flex-start"
        align="center"
        direction="row"
        className="modal-footer-wrapper"
      >
        <StyledFlexWrapper margin="unset">
          <ArrowBackIosNewIcon
            fontSize="large"
            style={{ color: 'var(--dark-beige)' }}
          />
        </StyledFlexWrapper>
        <StyledCard
          align="flex-start"
          width="unset"
          className="modal-card"
          justify="center"
        >
          <StyledFlexWrapper
            direction="row"
            align="center"
            justify="flex-start"
            margin="unset"
          >
            <UpdateIcon />
            <StyledHeadingXS
              textTransform="unset"
              color="var(--dark-blue)"
              borderBottom="none"
              fontSize="1rem"
            >
              Meditation length
            </StyledHeadingXS>
          </StyledFlexWrapper>

          <StyledFlexWrapper
            direction="row"
            align="center"
            justify="flex-start"
            margin="unset"
            width="100%"
            gap="unset"
          >
            <StyledFlexWrapper gap="unset" margin="unset" align="flex-start">
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
            <StyledFlexWrapper width="100%">
              <StyledButton
                width="100%"
                bgColor="var(--dark-blue)"
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
  justify-content: flex-start;
  background-image: ${(props: IStylingProps) => props.backgroundImage || ''};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media ${devices.desktop} {
    justify-content: space-between;
  }

  .modal-footer-wrapper {
    gap: 0.5rem;
    margin: 0;

    @media ${devices.tablet} {
      gap: 2rem;
      margin: 0 1rem 1rem;
    }
  }

  .modal-card {
    padding: 0.5rem;
    width: 80%;
    height: 12rem;
    gap: 1rem;

    @media ${devices.tablet} {
      padding: 1rem 1.5rem;
    }

    @media ${devices.desktop} {
      padding: 1rem 1.5rem;
      width: 25rem;
      height: 13rem;
      justify-content: center;
      gap: 1.5rem;
    }
  }
`
