import styled from 'styled-components'
import { devices } from '../../breakpoints/Breakpoints'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-top: 0.8rem auto;
  padding: 2.5rem 1rem;
  width: 90%;
  color: var(--mid-blue);

  @media ${devices.tablet} {
    padding: 2.5rem 3.5rem 1.5rem;
    width: 100%;
  }

  input {
    font-size: 0.9rem;
    padding: 1rem;
    outline: none;
    border: 1px solid var(--mid-blue);
    border-radius: 0.3rem;
    background-color: var(--mid-blue);
    color: var(--light-beige);

    &:focus {
      outline: none;
      border: 1px solid var(--light-beige);
    }
  }

  input[type='text'],
  [type='email'],
  [type='password'] {
    background: var(--light-blue);
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

  .input-icon-container {
    position: relative;
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 1rem 1rem 1rem 2.6rem;
    }
    .input-icon {
      position: absolute;
      top: 0;
      left: 0;
      padding: 16px;
    }
  }

  .password-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.8rem;
      margin: 0 0 0.5rem;
      text-decoration: underline;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .forgot-password {
    width: 100%;
    p {
      font-size: 1.1rem;
      font-weight: 300;
    }

    span {
      font-size: 0.9rem;
      font-weight: 300;
    }
  }

  a {
    color: var(--mid-blue);
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

  .history-icon {
    &:hover {
      cursor: pointer;
    }
  }
`
