import { useState } from 'react'
// STYLED COMPONENTS //
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import Loader from '../styledComponents/Loader/StyledLoader'
// MUI //
import GoogleIcon from '@mui/icons-material/Google'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import LoginIcon from '@mui/icons-material/Login'
// REACT ROUTER //
import { Link, useNavigate } from 'react-router-dom'
// FIREBASE //
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
// FRAMER MOTION //
import { motion } from 'framer-motion'

export default function Login() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [authenticating, setAuthenticating] = useState(false)
  const [loader, setLoader] = useState(false)
  const [missingFields, setMissingFields] = useState(false)
  const [login, setLogin] = useState(true)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [passwordResetMessage, setPasswordResetMessage] = useState(false)

  /////////////////////////
  // SIGN IN WITH GOOGLE //
  /////////////////////////
  const signInWithGoogle = async () => {
    setAuthing(true)
    setLoader(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        setLoader(false)
        const additionalUserInfo = getAdditionalUserInfo(response)

        // Check if user already exists
        const isNewUser = additionalUserInfo && additionalUserInfo.isNewUser
        if (!isNewUser) {
          navigate('/home')
        } else {
          // If user doesn't exist, create new user
          const userData = {
            firstName: response.user.displayName,
            email: response.user.email,
            createdAt: response.user.metadata.creationTime,
          }

          await setDoc(doc(db, 'users', response.user.uid), {
            userData,
          })
        }
      })
      .catch((error) => {
        setError(true)
        setErrorMessage(error.message)
        setAuthing(false)
      })
  }

  ///////////////////////////////////
  // SIGN IN WITH EMAIL & PASSWORD //
  ///////////////////////////////////
  const signInWithEmailPassword = () => {
    if (errorMessage !== '') setErrorMessage('')
    setLoader(true)
    setAuthenticating(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate('/home')
      })
      .catch((error) => {
        setLoader(false)
        setAuthenticating(false)
        setError(true)
        if (error.code.includes('auth/user-not-found')) {
          setErrorMessage(
            "Sorry, we couldn't find that user. Did you enter the correct e-mail address?",
          )
        } else if (error.code.includes('auth/wrong-password')) {
          setErrorMessage(
            'The password you entered is incorrect. Please double-check and try again.',
          )
        } else if (email === '' || password === '') {
          setErrorMessage('Please fill out missing fields.')
        } else {
          setErrorMessage('Unable to sign in. Please try again later.')
        }
      })
  }

  ////////////////////
  // RESET PASSWORD //
  ////////////////////
  const resetPassword = () => {
    setError(false)
    setMissingFields(false)

    if (forgotPasswordEmail) {
      sendPasswordResetEmail(auth, forgotPasswordEmail)
        .then(() => {
          setPasswordResetMessage(true)
        })
        .catch((error) => {
          setError(true)

          if (error.code.includes('auth/invalid-email')) {
            setErrorMessage(
              'Email is invalid. Are you sure you entered the correct email address?',
            )
          } else {
            setErrorMessage(error.message)
          }
        })
    } else if (forgotPasswordEmail === '') {
      setError(true)
      setMissingFields(true)
    } else {
      setError(true)
      setErrorMessage('Unable to reset password. Please try again later.')
    }
  }

  return (
    <>
      {loader && <Loader />}

      {login ? (
        <motion.div
          className="landingpage-box beige"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StyledFlexWrapper width="100%">
            <StyledForm
              onSubmit={(e) => e.preventDefault()}
              className={errorMessage || missingFields ? 'shake' : ''}
            >
              <StyledHeadingM color="var(--mid-blue)" margin="1rem 0">
                Welcome back.
              </StyledHeadingM>
              {errorMessage && <p className="error">{errorMessage}</p>}

              <div className="input-group">
                <label>Email</label>
                <div className="input-icon-container">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    className={error && !email ? 'error-input' : ''}
                  />
                  <span className="input-icon">
                    <EmailIcon style={{ color: '#c7b091' }} fontSize="small" />
                  </span>
                </div>
              </div>
              <div className="input-group">
                <div className="password-group">
                  {' '}
                  <label>Password</label>{' '}
                  <span
                    onClick={() => {
                      setErrorMessage('')
                      setError(false)
                      setLogin(!login)
                      setMissingFields(false)
                      setPasswordResetMessage(false)
                      setForgotPasswordEmail('')
                    }}
                  >
                    Forgot password?
                  </span>{' '}
                </div>
                <div className="input-icon-container">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className={error && !password ? 'error-input' : ''}
                  />
                  <span className="input-icon">
                    <LockIcon style={{ color: '#c7b091' }} fontSize="small" />
                  </span>
                </div>
              </div>
              <StyledButton
                onClick={() => signInWithEmailPassword()}
                disabled={authenticating}
                margin="1rem 0 0.5rem"
                width="100%"
                border="1px solid var(--mid-blue)"
                id="login-btn"
              >
                <LoginIcon />
                Log in
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => signInWithGoogle()}
                disabled={authing}
                bgColor="var(--mid-blue)"
                color="var(--dark-beige)"
                border="1px solid var(--dark-beige)"
                width="100%"
              >
                <GoogleIcon />
                Log in with Google
              </StyledButton>

              <p>
                Don't have an account? <Link to="/signup">Create one.</Link>
              </p>
            </StyledForm>
            <div className="copyright">
              &#169; Malin Nilsson 2023,{' '}
              <a
                href="https://www.github.com/malin-nilsson"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                Github
              </a>
            </div>
          </StyledFlexWrapper>
        </motion.div>
      ) : (
        <motion.div
          className="landingpage-box beige"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StyledFlexWrapper>
            <StyledForm
              onSubmit={(e) => e.preventDefault()}
              className={errorMessage || missingFields ? 'shake' : ''}
            >
              <span
                onClick={() => {
                  setErrorMessage('')
                  setLogin(true)
                  setError(false)
                }}
                className="history-icon"
              >
                <ArrowBackIosIcon />
              </span>

              <StyledHeadingM color="var(--mid-blue)">
                Forgot your password?
              </StyledHeadingM>
              <div className="forgot-password">
                <p>
                  {' '}
                  Not to worry &#128591; Enter your email below and we will send
                  a reset link.
                </p>
                <span>
                  Psst... If you don't receive an email, check all the folders
                  in your email, including Junk and Spam.
                </span>
              </div>

              {errorMessage && <p className="error">{errorMessage}</p>}
              {missingFields && (
                <p className="error">Please fill out missing fields.</p>
              )}
              <div className="input-group">
                <label>Email</label>
                <div className="input-icon-container">
                  <input
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    className={error && !email ? 'error-input' : ''}
                  />
                  <span className="input-icon">
                    <EmailIcon style={{ color: '#c7b091' }} fontSize="small" />
                  </span>
                </div>
              </div>

              <StyledButton
                type="button"
                onClick={() => {
                  resetPassword()
                }}
                disabled={authing}
                bgColor="var(--mid-blue)"
                color="var(--dark-beige)"
                border="1px solid var(--dark-beige)"
                width="100%"
              >
                Reset password
              </StyledButton>

              {passwordResetMessage && (
                <StyledFlexWrapper
                  justify="flex-start"
                  direction="row"
                  align="center"
                  margin="unset"
                  padding="0"
                >
                  {' '}
                  <CheckIcon />A password reset email has been sent!
                </StyledFlexWrapper>
              )}
            </StyledForm>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
