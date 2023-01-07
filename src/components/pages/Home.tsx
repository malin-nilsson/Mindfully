import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import {
  StyledHeadingL,
  StyledHeadingM,
  StyledHeadingS,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { moods } from '../../data/Moods'
import { StyledCard } from '../styledComponents/Card/Card'
// REACT ROUTER //
import { Link, useNavigate } from 'react-router-dom'
// FIREBASE //
import { getAuth } from 'firebase/auth'
// FRAMER MOTION //
import { motion } from 'framer-motion'
import { getFirstName } from '../../utils/getFirstName'
import Loader from '../styledComponents/Loader/StyledLoader'

export default function Home() {
  const [selfAssessment, setSelfAssessment] = useState(false)
  const [cards, setCards] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoader(true)
    greetUser()
  }, [])

  const greetUser = async () => {
    const firstName = await getFirstName()
    setDisplayName(firstName.firstName)

    let data = [
        [18, 24, 'Good evening'],
        [0, 4, 'Good evening'],
        [5, 11, 'Good morning'],
        [12, 17, 'Good afternoon'],
      ],
      hour = new Date().getHours()

    for (let i = 0; i < data.length; i++) {
      if (hour >= data[i][0] && hour <= data[i][1]) {
        setGreeting(data[i][2].toString())
      }
    }

    setLoader(false)
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <>
            <StyledFlexWrapper
              justify="flex-start"
              padding="1.5rem 0 0"
              width="100%"
            >
              <StyledFlexWrapper>
                <StyledHeadingL color="var(--dark-beige)">
                  {greeting}, {displayName}.
                </StyledHeadingL>
              </StyledFlexWrapper>
            </StyledFlexWrapper>

            <StyledFlexWrapper
              padding="2rem 0 1.5rem"
              direction="row"
              gap="3rem"
            >
              <Link to="/explore">
                <StyledCard>
                  <StyledHeadingS color="var(--mid-blue)">
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
                <StyledHeadingS color="var(--mid-blue)">
                  Self assessment
                </StyledHeadingS>
                <StyledImageWrapper maxHeight="40px">
                  <img src="/assets/icons/lightbulb.png"></img>
                </StyledImageWrapper>
                <p>
                  Take a quick assessment and see which meditation fits you the
                  best at this moment.
                </p>
              </StyledCard>
            </StyledFlexWrapper>
          </>

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
                      key={mood.id}
                    >
                      <StyledImageWrapper maxHeight="60px">
                        <img src={mood.img} alt="Emoji"></img>
                        {mood.title}
                      </StyledImageWrapper>
                    </StyledCard>
                  )
                })}
              </StyledFlexWrapper>
            </>
          )}
        </motion.div>
      )}
    </>
  )
}
