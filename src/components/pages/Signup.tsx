import { useEffect, useRef, useState } from 'react'
// STYLED COMPONENTS //
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import Loader from '../styledComponents/Loader/StyledLoader'
// MUI //
import GoogleIcon from '@mui/icons-material/Google'
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

export default function Signup() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [registering, setRegistering] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [loader, setLoader] = useState(false)
  const [missingFields, setMissingFields] = useState(false)
  const shakeRef = useRef<HTMLFormElement | null>(null)

  /////////////////////////
  // SIGN UP WITH GOOGLE //
  /////////////////////////
  const signInWithGoogle = async () => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const additionalUserInfo = getAdditionalUserInfo(response)

        // Check if user already exists
        const isNewUser = additionalUserInfo && additionalUserInfo.isNewUser
        if (!isNewUser) {
          navigate('/home')
        } else {
          const splitName = response.user.displayName?.split(' ')[0]
          const userData = {
            firstName: splitName,
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
        shakeContainer()
        console.log(error)
        setErrorMessage(error.message)
        setError(true)
        setAuthing(false)
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
    if (errorMessage !== '') {
      setErrorMessage('')
    }
    if (firstName && email && password) {
      const splitName = firstName.split(' ')[0]
      setRegistering(true)
      setLoader(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCred) => {
          const userData = {
            firstName: splitName,
            email: email,
            createdAt: userCred.user.metadata.creationTime,
          }

          await updateProfile(userCred.user, {
            displayName: userData.firstName,
          }).then(async () => {
            await setDoc(doc(db, 'users', userCred.user.uid), {
              userData,
            })
          })
        })
        .catch((error) => {
          shakeContainer()
          setError(true)

          if (error.code.includes('auth/weak-password')) {
            setErrorMessage('Please enter a stronger password.')
          } else if (error.code.includes('auth/email-already-in-use')) {
            setErrorMessage('Email is already in use.')
          } else if (error.code.includes('auth/invalid-email')) {
            setErrorMessage('Email is invalid. Please try again.')
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

  const shakeContainer = () => {
    if (shakeRef.current) {
      shakeRef.current.className = 'shake'

      shakeRef.current.classList.remove('shake')
    }
  }

  return (
    <>
      {loader ? (
        <Loader></Loader>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StyledFlexWrapper>
            <StyledForm ref={shakeRef} onSubmit={(e) => e.preventDefault()}>
              <StyledHeadingM>Sign up</StyledHeadingM>
              <p>
                Creating an account enables you to save your progress &#128522;
              </p>
              {missingFields && (
                <p className="error">Please fill out missing fields.</p>
              )}
              {errorMessage && <p className="error">{errorMessage}</p>}
              <div className="input-group">
                <label>First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  className={error && !firstName ? 'error-input' : ''}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={error && !email ? 'error-input' : ''}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className={error && !password ? 'error-input' : ''}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <StyledButton
                onClick={() =>
                  signUpWithEmailAndPassword(email, password, firstName)
                }
                type="button"
                margin="1rem 0 0.5rem"
                disabled={registering}
                width="100%"
              >
                Create account
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
