import React from 'react';
import styled from 'styled-components/macro';

const Button = styled.button`
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 16px;
  color: ${props => props.theme.normalText};
`;

const DeleteButton = props => (
  <Button onClick={props.onClick}>{props.text}</Button>
);

export default DeleteButton;
