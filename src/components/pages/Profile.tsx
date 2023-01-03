import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import {
  StyledMeditationCard,
  StyledProfileCard,
} from '../styledComponents/Card/Card'
import { StyledHeadingXL } from '../styledComponents/Headings/StyledHeadings'
import {
  StyledButtonWrapper,
  StyledFlexWrapper,
} from '../styledComponents/Wrappers/StyledFlexWrapper'

import { StyledImageWrapper } from '../styledComponents/Wrappers/StyledImageWrapper'
import { StyledButton } from '../styledComponents/Button/StyledButton'
// FIREBASE //
import {
  getAuth,
  onAuthStateChanged,
  updateEmail,
  updateProfile,
} from 'firebase/auth'
// REACT ROUTER //
import { useNavigate } from 'react-router-dom'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// MUI //
import CheckIcon from '@mui/icons-material/Check'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [disabledName, setDisabledName] = useState(true)
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    email: '',
  })
  const [newFirstName, setNewFirstName] = useState(userInfo.firstName)
  const [newEmail, setNewEmail] = useState(userInfo.email)
  const [confirmationName, setConfirmationName] = useState('')
  const [confirmationEmail, setConfirmationEmail] = useState('')
  const [missingFields, setMissingFields] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserInfo({
          firstName: user.displayName as string,
          email: user.email as string,
        })

        setNewEmail(user.email as string)
        setNewFirstName(user.displayName as string)
      } else {
        navigate('/')
      }
    })
  }, [auth])

  const saveFirstName = async () => {
    setMissingFields('')
    if (auth.currentUser && newFirstName) {
      updateProfile(auth.currentUser, {
        displayName: newFirstName,
      })
        .then(() => {
          setConfirmationName('Your changes have been saved.')
          setDisabledName(true)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setMissingFields('Please fill out missing fields.')
    }
  }

  const saveEmail = () => {
    setMissingFields('')
    if (auth.currentUser && newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          setConfirmationEmail('Your changes have been saved.')
          setDisabledEmail(true)
        })
        .catch((error) => {
          if (error.code.includes('auth/weak-password')) {
            setErrorMessage('Please enter a stronger password.')
          } else if (error.code.includes('auth/email-already-in-use')) {
            setErrorMessage('Email is already in use.')
          } else if (error.code.includes('auth/invalid-email')) {
            setErrorMessage('Email is invalid. Please try again.')
          } else {
            console.log(error)
            setErrorMessage('Unable to sign up. Please try again later.')
          }
        })
    } else {
      setMissingFields('Please fill out missing fields.')
    }
  }

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

        <StyledFlexWrapper width="100%" color="var(--dark-beige)">
          <StyledProfileCard>
            <div className="profile-wrapper">
              <StyledImageWrapper>
                <SentimentSatisfiedAltIcon style={{ fontSize: '4rem' }} />
              </StyledImageWrapper>

              <StyledFlexWrapper
                color="var(--dark-beige)"
                align="flex-start"
                width="100%"
                margin="unset"
              >
                {missingFields && <p className="error"> {missingFields}</p>}
                {errorMessage && <p className="error"> {errorMessage}</p>}
                <label>First name</label>
                <input
                  type="text"
                  disabled={disabledName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  value={newFirstName}
                ></input>
                {confirmationName && (
                  <>
                    <p className="confirmation">
                      <CheckIcon /> {confirmationName}
                    </p>
                  </>
                )}
                <StyledButtonWrapper direction="row" width="100%" gap="1rem">
                  <StyledButton
                    onClick={() => {
                      setDisabledName(!disabledName)
                      setConfirmationName('')
                    }}
                    padding="0.5rem"
                    fontSize="0.8rem"
                    borderRadius="0.5rem"
                  >
                    {disabledName ? 'Edit' : 'Cancel'}
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      saveFirstName()
                    }}
                    padding="0.5rem"
                    fontSize="0.8rem"
                    borderRadius="0.5rem"
                    bgColor="var(--dark-blue)"
                    color="var(--dark-beige)"
                    border="2px solid var(--dark-beige)"
                  >
                    Save
                  </StyledButton>
                </StyledButtonWrapper>

                <label>Email address</label>
                <input
                  type="email"
                  disabled={disabledEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={newEmail}
                ></input>
                {confirmationEmail && (
                  <>
                    <p className="confirmation">
                      <CheckIcon /> {confirmationEmail}
                    </p>
                  </>
                )}
                <StyledButtonWrapper direction="row" width="100%" gap="1rem">
                  <StyledButton
                    onClick={() => {
                      setDisabledEmail(!disabledEmail)
                      setConfirmationEmail('')
                    }}
                    padding="0.5rem"
                    fontSize="0.8rem"
                    borderRadius="0.5rem"
                  >
                    {disabledEmail ? 'Edit' : 'Cancel'}
                  </StyledButton>
                  <StyledButton
                    onClick={() => {
                      saveEmail()
                    }}
                    padding="0.5rem"
                    fontSize="0.8rem"
                    borderRadius="0.5rem"
                    bgColor="var(--dark-blue)"
                    color="var(--dark-beige)"
                    border="2px solid var(--dark-beige)"
                  >
                    Save
                  </StyledButton>
                </StyledButtonWrapper>
              </StyledFlexWrapper>
            </div>
          </StyledProfileCard>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </motion.div>
  )
}
