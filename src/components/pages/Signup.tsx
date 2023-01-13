import { useRef, useState } from 'react'
// STYLED COMPONENTS //
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrappers'
import Loader from '../styledComponents/Loader/StyledLoader'
// MUI //
import GoogleIcon from '@mui/icons-material/Google'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
// REACT ROUTER //
import { Link, useNavigate } from 'react-router-dom'
// FIREBASE //
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
// FRAMER MOTION //
import { motion } from 'framer-motion'
// MUI //
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function Signup() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [registering, setRegistering] = useState(false)
  const [loader, setLoader] = useState(false)
  const [missingFields, setMissingFields] = useState(false)

  /////////////////////////
  // SIGN UP WITH GOOGLE //
  /////////////////////////
  const signInWithGoogle = async () => {
    setRegistering(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const additionalUserInfo = getAdditionalUserInfo(response)

        // Check if user already exists
        const isNewUser = additionalUserInfo && additionalUserInfo.isNewUser
        if (!isNewUser) {
          navigate('/home')
        } else {
          const userData = {
            firstName: firstName,
            email: response.user.email,
            createdAt: response.user.metadata.creationTime,
          }

          await setDoc(doc(db, 'users', response.user.uid), {
            userData,
          })
          navigate('/home')
        }
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setError(true)
        setRegistering(false)
      })
  }

  /////////////////////////////////////
  // SIGN UP WITH EMAIL AND PASSWORD //
  /////////////////////////////////////
  const signUpWithEmailAndPassword = (
    email: string,
    password: string,
    firstName: string,
  ) => {
    setError(false)
    setMissingFields(false)
    setErrorMessage('')
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (firstName && email && password) {
      setRegistering(true)
      setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCred) => {
          const userData = {
            firstName: firstName,
            email: email,
            createdAt: userCred.user.metadata.creationTime,
          }
          await setDoc(doc(db, 'users', userCred.user.uid), {
            userData,
          })
        })
        .catch((error) => {
          setError(true)

          if (error.code.includes('auth/weak-password')) {
            setErrorMessage('Please enter a stronger password.')
          } else if (error.code.includes('auth/email-already-in-use')) {
            setErrorMessage('Email is already in use.')
          } else if (error.code.includes('auth/invalid-email')) {
            setErrorMessage('Please enter a valid email address.')
          } else {
            setErrorMessage('Unable to sign up. Please try again later.')
          }
          setRegistering(false)
        })
      setLoader(false)
    } else if (firstName === '' || email === '' || password === '') {
      setError(true)
      setMissingFields(true)
    }
  }

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <motion.div
          className="landingpage-box beige signup"
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
              <Link to="/login">
                <ArrowBackIosIcon />
              </Link>
              <StyledHeadingM color="var(--mid-blue)">Sign up</StyledHeadingM>
              <p>
                Creating an account enables you to track your progress and save
                favorite meditations &#128522;
              </p>
              {missingFields && (
                <p className="error">Please fill out missing fields.</p>
              )}
              {errorMessage && <p className="error">{errorMessage}</p>}
              <div className="input-group">
                <label>First name</label>
                <div className="input-icon-container">
                  <input
                    type="text"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className={error && !firstName ? 'error-input' : ''}
                  />
                  <span className="input-icon">
                    <AccountCircleIcon
                      style={{ color: '#c7b091' }}
                      fontSize="small"
                    />
                  </span>
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <div className="input-icon-container">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={error && !email ? 'error-input' : ''}
                  />
                  <span className="input-icon">
                    <EmailIcon style={{ color: '#c7b091' }} fontSize="small" />
                  </span>
                </div>
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="input-icon-container">
                  <input
                    type="password"
                    placeholder="Password"
                    className={error && !password ? 'error-input' : ''}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="input-icon">
                    <LockIcon style={{ color: '#c7b091' }} fontSize="small" />
                  </span>
                </div>
              </div>
              <StyledButton
                onClick={() =>
                  signUpWithEmailAndPassword(email, password, firstName)
                }
                type="button"
                margin="1rem 0 0.5rem"
                disabled={registering}
                width="100%"
                border="1px solid var(--mid-blue)"
                id="create-account"
              >
                Create account
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => signInWithGoogle()}
                disabled={registering}
                bgColor="var(--mid-blue)"
                color="var(--dark-beige)"
                border="1px solid var(--dark-beige)"
                width="100%"
              >
                <GoogleIcon></GoogleIcon>Sign up with Google
              </StyledButton>
              <p>
                Already have an account? <Link to="/login">Log in.</Link>
              </p>
            </StyledForm>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
