import React, { useState } from 'react'
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
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from 'firebase/auth'

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
      .then((response) => {
        console.log(response.user.uid)
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
      .then((userCred) => {
        updateProfile(userCred.user, { displayName })
        console.log(userCred)
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
          bgColor="var(--dark-blue)"
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
