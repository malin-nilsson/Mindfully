import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import {
  StyledHeadingL,
  StyledHeadingS,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledCard } from '../styledComponents/Cards/Cards'
import Loader from '../styledComponents/Loader/StyledLoader'
// REACT ROUTER //
import { Link } from 'react-router-dom'
// FRAMER MOTION //
import { motion } from 'framer-motion'
import { getFirstName } from '../../utils/getFirstName'

export default function Home() {
  const [displayName, setDisplayName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoader(true)
    greetUser()
  }, [])

  const greetUser = async () => {
    const user = await getFirstName()
    const name = user.firstName
    const firstName = name.split(' ')[0]

    setDisplayName(firstName)

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

          <StyledFlexWrapper padding="2rem 0 1.5rem" direction="row" gap="3rem">
            <Link to="/explore">
              <StyledCard>
                <StyledHeadingS color="var(--mid-blue)">
                  Find a Meditation
                </StyledHeadingS>

                <StyledImageWrapper maxHeight="40px">
                  <img
                    src="/assets/icons/zen.png"
                    alt="Illustration of person meditating"
                  ></img>
                </StyledImageWrapper>

                <p>
                  Explore the library and come back every time you need a
                  mindful break.
                </p>
              </StyledCard>
            </Link>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
