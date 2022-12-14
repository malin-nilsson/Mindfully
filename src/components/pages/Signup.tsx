import React from 'react'
import { StyledButton } from '../styledComponents/Button/StyledButton'
import { StyledForm } from '../styledComponents/Form/StyledForm'
import { StyledHeadingM } from '../styledComponents/Headings/StyledHeadings'
import { StyledFlexWrapper } from '../styledComponents/Wrappers/StyledFlexWrapper'
import GoogleIcon from '@mui/icons-material/Google'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <StyledFlexWrapper>
      <StyledForm>
        <StyledHeadingM>Create an account.</StyledHeadingM>
        <div className="input-group">
          <label>Choose a username</label>
          <input type="text" placeholder="Username" />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <StyledButton margin="1rem 0 0.5rem">Sign up</StyledButton>
        <StyledButton
          bgColor="var(--dark-blue)"
          color="var(--dark-beige)"
          border="1px solid var(--dark-beige)"
        >
          <GoogleIcon></GoogleIcon>Sign up with Google
        </StyledButton>
        <p>
          Already have an account? <Link to="/login">Log in here.</Link>
        </p>
      </StyledForm>
    </StyledFlexWrapper>
  )
}
