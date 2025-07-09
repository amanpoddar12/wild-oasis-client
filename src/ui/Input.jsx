import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-700);
  font-size: 1.4rem;
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
    border-color: var(--color-brand-600);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-grey-400);
  }

  /* Ensure text is always visible */
  &:not(:disabled) {
    color: var(--color-grey-700);
    background-color: var(--color-grey-0);
  }

  /* Fix for autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--color-grey-0) inset;
    -webkit-text-fill-color: var(--color-grey-700);
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default Input;