import { useRef, useState } from 'react'
// STYLED COMPONENTS //
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import Loader from '../styledComponents/Loader/StyledLoader'
// MUI //
import GoogleIcon from '@mui/icons-material/Google'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
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
import { StyledLandingPageWrapper } from '../styledComponents/Wrappers/StyledLandingPageWrapper'

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
  const shakeRef = useRef<HTMLFormElement | null>(null)
  const [login, setLogin] = useState(true)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

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
        console.log(error)
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

  // PASSWORD RESET //
  const resetPassword = () => {
    setError(false)
    setMissingFields(false)
    if (forgotPasswordEmail) {
      sendPasswordResetEmail(auth, forgotPasswordEmail)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          setError(true)
          setErrorMessage(error.message)
        })
    } else {
      setError(true)
      setMissingFields(true)
    }
  }

  return (
    <>
      {loader && <Loader />}

      <StyledLandingPageWrapper>
        <div className="landingpage-box">
          <h1>Image here</h1>
        </div>
        {login ? (
          <div className="landingpage-box">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <StyledFlexWrapper>
                <StyledForm
                  ref={shakeRef}
                  onSubmit={(e) => e.preventDefault()}
                  className={errorMessage || missingFields ? 'shake' : ''}
                >
                  <StyledHeadingM>Welcome back</StyledHeadingM>
                  {errorMessage && <p className="error">{errorMessage}</p>}

                  <div className="input-group">
                    <label>Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email address"
                      className={error && !email ? 'error-input' : ''}
                    />
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
                        }}
                      >
                        Forgot password?
                      </span>{' '}
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                      className={error && !password ? 'error-input' : ''}
                    />
                  </div>
                  <StyledButton
                    onClick={() => signInWithEmailPassword()}
                    disabled={authenticating}
                    margin="1rem 0 0.5rem"
                    width="100%"
                  >
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
                    <GoogleIcon></GoogleIcon>Log in with Google
                  </StyledButton>

                  <p>
                    Don't have an account? <Link to="/signup">Create one.</Link>
                  </p>
                </StyledForm>
              </StyledFlexWrapper>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StyledFlexWrapper>
              <StyledForm
                ref={shakeRef}
                onSubmit={(e) => e.preventDefault()}
                className={errorMessage || missingFields ? 'shake' : ''}
              >
                <span onClick={() => setLogin(true)} className="history-icon">
                  <ArrowBackIosIcon />
                </span>

                <StyledHeadingM>Forgot your password?</StyledHeadingM>
                <div className="forgot-password">
                  <p>
                    {' '}
                    Not to worry, we got you! &#128591; Enter your email below
                    and we'll send a reset link.
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
                  <input
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    className={error && !email ? 'error-input' : ''}
                  />
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
              </StyledForm>
            </StyledFlexWrapper>
          </motion.div>
        )}
      </StyledLandingPageWrapper>
    </>
  )
}
