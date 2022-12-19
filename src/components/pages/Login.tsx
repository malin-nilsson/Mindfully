import { useState } from 'react'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'

export default function Login() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [authenticating, setAuthenticating] = useState(false)

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

  const signInWithEmailPassword = () => {
    if (errorMessage !== '') setErrorMessage('')

    setAuthenticating(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
        setAuthenticating(false)

        if (error.code.includes('auth/user-not-found')) {
          setErrorMessage(
            'User not found. Did you enter the correct e-mail address?',
          )
        } else if (error.code.includes('auth/wrong-password')) {
          setErrorMessage(
            'The password you entered is incorrect, please try again.',
          )
        } else {
          setErrorMessage('Unable to sign up. Please try again later.')
        }
      })
  }

  return (
    <StyledFlexWrapper>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        <StyledHeadingM>Welcome back</StyledHeadingM>
        <div className="input-group">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <StyledButton
          onClick={() => signInWithEmailPassword()}
          disabled={authenticating}
          margin="1rem 0 0.5rem"
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
        >
          <GoogleIcon></GoogleIcon>Sign in with Google
        </StyledButton>
        <p>
          Don't have an account? <Link to="/signup">Create one here.</Link>
        </p>
        <p>{errorMessage}</p>
      </StyledForm>
    </StyledFlexWrapper>
  )
}
