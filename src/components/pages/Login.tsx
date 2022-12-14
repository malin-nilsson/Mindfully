import React from 'react'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <StyledFlexWrapper>
      <StyledForm>
        <StyledHeadingM>Welcome back.</StyledHeadingM>
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
