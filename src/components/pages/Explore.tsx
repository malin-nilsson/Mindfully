import React from 'react'
import { Link } from 'react-router-dom'
import { StyledCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXL,
  StyledHeadingS,
  StyledHeadingM,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { SoundMeditationCatalog as meditations } from '../../data/SoundMeditations'
import { StyledButton } from '../styledComponents/Button/StyledButton'

export default function Explore() {
  return (
    <>
      <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
        <StyledFlexWrapper>
          <StyledHeadingXL color="var(--dark-beige)">Explore</StyledHeadingXL>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper direction="row">
        <StyledButton fontWeight="300" width="18rem">
          Guided breathing meditations
        </StyledButton>
        <StyledButton fontWeight="300" width="18rem">
          Sound meditations
        </StyledButton>
      </StyledFlexWrapper>
      <StyledFlexWrapper padding="3rem 1rem 1rem">
        {' '}
        <StyledHeadingM>Sound meditations</StyledHeadingM>{' '}
      </StyledFlexWrapper>

      <StyledFlexWrapper padding="2rem 1rem 1.5rem" direction="row" gap="3rem">
        {meditations.map((meditation) => {
          return (
            <StyledCard
              width="25%"
              borderRadius="15px"
              height="12rem"
              justify="center"
              key={meditation.id}
            >
              <StyledImageWrapper maxHeight="150px">
                <img src={meditation.img} alt="Emoji"></img>
                {meditation.title}
              </StyledImageWrapper>
            </StyledCard>
          )
        })}
      </StyledFlexWrapper>
    </>
  )
}
