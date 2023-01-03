import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 430px;
  margin-top: 0.8rem;
  background-color: rgba(9, 12, 40, 0.9);
  border-radius: 5rem;
  padding: 2.5rem 1rem;
  width: 90%;
  color: var(--dark-beige);

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  @media ${devices.tablet} {
    padding: 2.5rem 3.5rem 0.5rem;
    width: 100%;
  }

  input {
    font-size: 0.9rem;
    padding: 1rem;
    outline: none;
    border: 1px solid var(--dark-beige);
    border-radius: 0.9rem;
    color: var(--dark-beige);

    &:focus {
      outline: none;
      border: 1px solid var(--light-beige);
    }
  }

  input[type='text'],
  [type='email'],
  [type='password'] {
    background: var(--mid-blue);
  }

  label {
    text-transform: uppercase;
    font-size: 0.8rem;
    margin: 0 0 0.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
  }

  a {
    color: var(--dark-beige);
    text-decoration: underline;
  }

  p {
    font-size: 1rem;
    font-weight: 100;
  }

  .error {
    color: #a90000;
    margin: 0;
    padding: 0.5rem;
    background-color: var(--dark-beige);
    border: 1px solid #a90000;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .error-input {
    border: 1px solid #a90000;
  }
`
