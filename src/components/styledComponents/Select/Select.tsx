import styled from 'styled-components'

export const StyledSelect = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  position: relative;
  background-color: var(--dark-beige);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  select {
    font-size: 1rem;
    font-weight: normal;
    max-width: 100%;
    padding: 1rem;
    border: none;
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  select:active,
  select:focus {
    outline: none;
    box-shadow: none;
  }

  select:hover {
    cursor: pointer;
  }

  .select-icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    display: inline-block;
    margin-left: 1rem;
    display: flex;
  }
`
