import { useEffect, useState } from 'react'
// STYLED COMPONENTS //
import { StyledProfileCard } from '../styledComponents/Card/Card'
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
  updatePassword,
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
  const [disabledPassword, setDisabledPassword] = useState(true)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    email: '',
  })
  const [newFirstName, setNewFirstName] = useState(userInfo.firstName)
  const [newEmail, setNewEmail] = useState(userInfo.email)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmationName, setConfirmationName] = useState('')
  const [confirmationEmail, setConfirmationEmail] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [missingFields, setMissingFields] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
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
          setError(true)
          console.log(error)
        })
    } else {
      setError(true)
      setMissingFields('Please fill out missing fields.')
    }
  }

  const saveEmail = () => {
    setMissingFields('')
    setError(false)
    setErrorMessage('')
    setPasswordErrorMessage('')
    if (auth.currentUser && newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          setConfirmationEmail('Your changes have been saved.')
          setDisabledEmail(true)
        })
        .catch((error) => {
          setError(true)

          if (error.code.includes('auth/email-already-in-use')) {
            setEmailErrorMessage('Email is already in use.')
          } else if (error.code.includes('auth/invalid-email')) {
            setEmailErrorMessage('Email is invalid. Please try again.')
          } else if (error.code.includes('auth/requires-recent-login')) {
            setEmailErrorMessage(
              "It's been a while since you logged in. For security reasons, sign out and sign in again to change your password.",
            )
          } else {
            console.log(error)
            setEmailErrorMessage(
              'Unable to make changes right now. Please try again later.',
            )
          }
        })
    } else {
      setError(true)

      setMissingFields('Please fill out missing fields.')
    }
  }

  const savePassword = async () => {
    setMissingFields('')

    if (auth.currentUser && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError(true)
        setPasswordErrorMessage("Passwords don't match. Please try again.")
      } else {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setConfirmationPassword('Your new password has been saved.')
            setDisabledPassword(true)
          })
          .catch((error) => {
            setError(true)
            if (error.code.includes('auth/weak-password')) {
              setPasswordErrorMessage('Please enter a stronger password.')
            } else if (error.code.includes('auth/requires-recent-login')) {
              setPasswordErrorMessage(
                "It's been a while since you logged in. For security reasons, sign out and sign in again to change your password.",
              )
            } else {
              console.log(error.message)
              setPasswordErrorMessage(
                'Unable to make changes right now. Please try again later.',
              )
            }
          })
      }
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

                <div className="input-group">
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
                        setErrorMessage('')
                        setPasswordErrorMessage('')
                      }}
                      padding="0.8rem"
                      fontSize="0.8rem"
                      borderRadius="0.5rem"
                    >
                      {disabledName ? 'Edit' : 'Cancel'}
                    </StyledButton>
                    {disabledName ? (
                      ''
                    ) : (
                      <StyledButton
                        onClick={() => {
                          saveFirstName()
                        }}
                        padding="0.8rem"
                        fontSize="0.8rem"
                        borderRadius="0.5rem"
                        bgColor="var(--dark-blue)"
                        color="var(--dark-beige)"
                        border="2px solid var(--dark-beige)"
                      >
                        Save
                      </StyledButton>
                    )}
                  </StyledButtonWrapper>
                </div>

                <div className="input-group">
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
                  {emailErrorMessage && (
                    <p className="error"> {emailErrorMessage}</p>
                  )}
                  <StyledButtonWrapper direction="row" width="100%" gap="1rem">
                    <StyledButton
                      onClick={() => {
                        setDisabledEmail(!disabledEmail)
                        setConfirmationEmail('')
                        setPasswordErrorMessage('')
                        setEmailErrorMessage('')
                        setErrorMessage('')
                        setConfirmationPassword('')
                      }}
                      padding="0.8rem"
                      fontSize="0.8rem"
                      borderRadius="0.5rem"
                    >
                      {disabledEmail ? 'Edit' : 'Cancel'}
                    </StyledButton>
                    {disabledEmail ? (
                      ''
                    ) : (
                      <StyledButton
                        onClick={() => {
                          saveEmail()
                        }}
                        padding="0.8rem"
                        fontSize="0.8rem"
                        borderRadius="0.5rem"
                        bgColor="var(--dark-blue)"
                        color="var(--dark-beige)"
                        border="2px solid var(--dark-beige)"
                      >
                        Save
                      </StyledButton>
                    )}
                  </StyledButtonWrapper>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <span>Old password:</span>
                  <input
                    type="password"
                    disabled={true}
                    placeholder="******"
                  ></input>
                  <span>New password:</span>
                  <input
                    type="password"
                    disabled={disabledPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></input>
                  <span>Confirm password:</span>
                  <input
                    type="password"
                    disabled={disabledPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                  {confirmationPassword && (
                    <>
                      <p className="confirmation">
                        <CheckIcon /> {confirmationPassword}
                      </p>
                    </>
                  )}
                  {passwordErrorMessage && (
                    <p className="error"> {passwordErrorMessage}</p>
                  )}

                  <StyledButtonWrapper direction="row" width="100%" gap="1rem">
                    <StyledButton
                      onClick={() => {
                        setDisabledPassword(!disabledPassword)
                        setPasswordErrorMessage('')
                        setErrorMessage('')
                        setConfirmationPassword('')
                      }}
                      padding="0.8rem"
                      fontSize="0.8rem"
                      borderRadius="0.5rem"
                    >
                      {disabledPassword ? 'Edit' : 'Cancel'}
                    </StyledButton>
                    {disabledPassword ? (
                      ''
                    ) : (
                      <StyledButton
                        onClick={() => {
                          savePassword()
                        }}
                        padding="0.8rem"
                        fontSize="0.8rem"
                        borderRadius="0.5rem"
                        bgColor="var(--dark-blue)"
                        color="var(--dark-beige)"
                        border="2px solid var(--dark-beige)"
                      >
                        Save
                      </StyledButton>
                    )}
                  </StyledButtonWrapper>
                </div>
              </StyledFlexWrapper>
            </div>
          </StyledProfileCard>
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </motion.div>
  )
}
