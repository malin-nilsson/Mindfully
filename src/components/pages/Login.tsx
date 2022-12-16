import React, { useState } from 'react'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default function Login() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)

  const signInWithGoogle = async () => {
    setAuthing(true)

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <StyledFlexWrapper>
      <StyledForm>
        <StyledHeadingM>Welcome back</StyledHeadingM>
        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <StyledButton margin="1rem 0 0.5rem">Sign in</StyledButton>
        <StyledButton
          type="button"
          onClick={() => signInWithGoogle()}
          disabled={authing}
          bgColor="var(--dark-blue)"
          color="var(--dark-beige)"
          border="1px solid var(--dark-beige)"
        >
          <GoogleIcon></GoogleIcon>Sign in with Google
        </StyledButton>
        <p>
          Don't have an account? <Link to="/signup">Create one here.</Link>
        </p>
      </StyledForm>
    </StyledFlexWrapper>
  )
}
