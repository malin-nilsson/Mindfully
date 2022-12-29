import { useContext, useEffect, useState } from 'react'
import { StyledCard } from '../styledComponents/Card/Card'
import {
  StyledHeadingXS,
  StyledHeadingXL,
} from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
// import { UserContext } from '../../context/UserContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Profile() {
  // let currentUser = useContext(UserContext)
  const auth = getAuth()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    signedUp: '',
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserInfo({
          email: user.email as string,
          signedUp: user.metadata.creationTime as string,
        })
      } else {
        navigate('/')
      }
    })
  }, [auth])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledFlexWrapper justify="flex-start" padding="1.5rem 0 0" width="100%">
        <StyledFlexWrapper>
          <StyledHeadingXL color="var(--dark-beige)">Profile</StyledHeadingXL>
        </StyledFlexWrapper>

        <StyledFlexWrapper width="100%">
          <StyledCard
            align="flex-start"
            width="50%"
            height="10rem"
            padding="3rem"
            direction="row"
          >
            <StyledFlexWrapper>Bild här</StyledFlexWrapper>

            <StyledFlexWrapper align="flex-start">
              <StyledFlexWrapper direction="row" align="flex-start" margin="0">
                <StyledHeadingXS color="var(--mid-blue)">
                  Email address:
                </StyledHeadingXS>
                <span>{userInfo.email}</span>
              </StyledFlexWrapper>

              <StyledFlexWrapper direction="row" align="flex-start" margin="0">
                <StyledHeadingXS color="var(--mid-blue)">
                  Registered:
                </StyledHeadingXS>
                <span>{userInfo.signedUp}</span>
              </StyledFlexWrapper>
            </StyledFlexWrapper>
          </StyledCard>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </motion.div>
  )
}
