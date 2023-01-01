import { useEffect, useState } from 'react'
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
  const [errorMessage, setErrorMessage] = useState('')
  const [registering, setRegistering] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  })

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
          const userData = {
            firstName: response.user.displayName,
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
        console.log(error)
        setErrorMessage(error.message)
        setAuthing(false)
      })
  }

  /////////////////////////////////////
  // SIGN UP WITH EMAIL AND PASSWORD //
  /////////////////////////////////////
  const signUpWithEmailAndPassword = (
    email: string,
    password: string,
    displayName: string,
  ) => {
    if (errorMessage !== '') setErrorMessage('')

    setRegistering(true)
    setLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const userData = {
          firstName: firstName,
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
        setErrorMessage(error.message)

        if (error.code.includes('auth/weak-password')) {
          setErrorMessage('Please enter a stronger password.')
        } else if (error.code.includes('auth/email-already-in-use')) {
          setErrorMessage('Email is already in use.')
        } else if (error.code.includes('auth/invalid-email')) {
          setErrorMessage('Email is invalid.')
        } else {
          setErrorMessage('Unable to sign up. Please try again later.')
        }
        setRegistering(false)
      })
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
            <StyledForm onSubmit={(e) => e.preventDefault()}>
              <StyledHeadingM>Sign up</StyledHeadingM>
              <p>
                Creating an account enables you to save your progress &#128522;
              </p>
              <div className="input-group">
                <label>First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
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
              <p>{errorMessage}</p>
            </StyledForm>
          </StyledFlexWrapper>
        </motion.div>
      )}
    </>
  )
}
