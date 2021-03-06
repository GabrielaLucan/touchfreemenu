import styled from 'styled-components/macro';
import { transition } from '../helpers';

const Input = styled.select`
  --border: ${(props) => (props.error ? props.theme.error : props.theme.accent)};
  --shadow: ${(props) => (props.error ? props.theme.error + '4d' : props.theme.accent + '4d')};

  ${(props) =>
    props.error
      ? `
    border: 1px solid var(--border)
    `
      : `
    border: 1px solid ${props.theme.border}
  `};
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
  outline: none;
  resize: vertical;

  background-image: url(../arrow.png);
  background-position-x: 96.5%;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position-y: 14px;

  :hover,
  :focus {
    border: 1px solid var(--border);
  }

  &[disabled] {
    opacity: 0.6;
    cursor: default;
    box-shadow: none;
    border-color: ${(props) => props.theme.border};
  }
`;

export default Input;
