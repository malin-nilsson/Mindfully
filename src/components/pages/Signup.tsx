import { useState } from 'react'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function Signup() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [registering, setRegistering] = useState(false)
  const [confirm, setConfirm] = useState('')

  // Sign up with Google
  const signInWithGoogle = async () => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const userData = {
          firstName: response.user.displayName,
          email: response.user.email,
          createdAt: response.user.metadata.creationTime,
        }

        await setDoc(doc(db, 'users', response.user.uid), {
          userData,
        })
        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage(error.message)
        setAuthing(false)
      })
  }

  // Sign up with email and password
  const signUpWithEmailAndPassword = (
    email: string,
    password: string,
    displayName: string,
  ) => {
    if (errorMessage !== '') setErrorMessage('')

    setRegistering(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const userData = {
          firstName: displayName,
          email: email,
          createdAt: userCred.user.metadata.creationTime,
        }

        await setDoc(doc(db, 'users', userCred.user.uid), {
          userData,
        })
        updateProfile(userCred.user, { displayName })
        navigate('/home')
      })
      .catch((error) => {
        setErrorMessage(error.message)
        console.log(error)

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
    <StyledFlexWrapper>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <StyledHeadingM>Create an account</StyledHeadingM>
        <div className="input-group">
          <label>What's your first name?</label>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setDisplayName(e.target.value)}
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
            signUpWithEmailAndPassword(email, password, displayName)
          }
          type="button"
          margin="1rem 0 0.5rem"
          disabled={registering}
        >
          Sign up
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => signInWithGoogle()}
          disabled={authing}
          bgColor="var(--mid-blue)"
          color="var(--dark-beige)"
          border="1px solid var(--dark-beige)"
        >
          <GoogleIcon></GoogleIcon>Sign up with Google
        </StyledButton>
        <p>
          Already have an account? <Link to="/login">Log in here.</Link>
        </p>
        <p>{errorMessage}</p>
      </StyledForm>
    </StyledFlexWrapper>
  )
}
