import {
  StyledHeadingM,
  StyledHeadingS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { moods } from '../../assets/Moods/Moods'
import { StyledCard } from '../styledComponents/Card/Card'
import { StyledHeroBg } from '../styledComponents/Hero/StyledHero'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [selfAssessment, setSelfAssessment] = useState(false)
  const [cards, setCards] = useState(true)
  const [loading, setLoading] = useState(true)

  return (
    <StyledHeroBg>
      {cards && (
        <>
          <StyledFlexWrapper
            justify="flex-start"
            padding="1.5rem 0 0"
            width="100%"
          >
            <StyledFlexWrapper>
              <StyledHeadingXL color="var(--dark-beige)">
                Hi, Malin.
              </StyledHeadingXL>
            </StyledFlexWrapper>
          </StyledFlexWrapper>

          <StyledFlexWrapper padding="2rem 0 1.5rem" direction="row" gap="3rem">
            <Link to="/explore">
              <StyledCard>
                <StyledHeadingS color="var(--dark-blue)">
                  Find a Meditation
                </StyledHeadingS>

                <StyledImageWrapper maxHeight="40px">
                  <img src="/assets/icons/zen.png"></img>
                </StyledImageWrapper>

                <p>
                  Explore the library and come back every time you need a
                  mindful break.
                </p>
              </StyledCard>
            </Link>

            <StyledCard
              onClick={() => {
                setSelfAssessment(true)
                setCards(false)
              }}
            >
              <StyledHeadingS color="var(--dark-blue)">
                Self assessment
              </StyledHeadingS>
              <StyledImageWrapper maxHeight="40px">
                <img src="/assets/icons/lightbulb.png"></img>
              </StyledImageWrapper>
              <p>
                Take a quick assessment to see which meditation fits you the
                best at this moment.
              </p>
            </StyledCard>
          </StyledFlexWrapper>
        </>
      )}

      {selfAssessment && (
        <>
          <StyledFlexWrapper padding="4rem 0 1rem">
            <StyledHeadingM>How are you feeling today?</StyledHeadingM>
          </StyledFlexWrapper>
          <StyledFlexWrapper
            margin="2rem auto"
            direction="row"
            width="80%"
            gap="3rem"
          >
            {moods.map((mood) => {
              return (
                <StyledCard
                  width="15%"
                  borderRadius="15px"
                  height="7rem"
                  justify="center"
                >
                  <StyledImageWrapper maxHeight="60px">
                    <img src={mood} alt="Emoji"></img>
                    Sad
                  </StyledImageWrapper>
                </StyledCard>
              )
            })}
          </StyledFlexWrapper>
        </>
      )}
    </StyledHeroBg>
  )
}
