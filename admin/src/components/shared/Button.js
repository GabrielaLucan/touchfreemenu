import React from 'react';
import styled from 'styled-components/macro';
import { transition, wideFont } from './helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  ${transition('filter', 'box-shadow')};
  ${wideFont};

  height: 45px;
  border: 0;
  border-radius: 30px;
  padding: 0 25px 0 25px;
  background: ${(props) => props.theme.accent};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  box-shadow: 0 5px 30px rgba(255, 255, 255, 0.05);
  transition: 200ms;
  margin-top: 16px;

  a {
    color: #ffffff;
  }

  :hover {
    filter: brightness(110%);
  }

  :active {
    filter: brightness(90%);
  }

  :focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent + '4d'};
  }

  &[disabled] {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }

  &.cancel {
    background: transparent;
    color: ${(props) => props.theme.accent};
    box-shadow: none;
  }
`;

export default class Button extends React.Component {
  render() {
    const { icon, text, onClick, disabled, downloadUrl, downloadName, type, style } = this.props;

    return (
      <StyledButton disabled={disabled} className={type} onClick={onClick} style={style}>
        {icon && <FontAwesomeIcon icon={icon} />}
        {downloadUrl ? (
          <a
            href={downloadUrl}
            download={downloadName}
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: '-15px -25px', padding: '15px 25px', marginLeft: '-35px', paddingLeft: '42px', display: 'inline-block', textDecoration: 'none' }}
          >
            {text}
          </a>
        ) : (
          <span style={{ marginLeft: icon ? '8px' : '0', textDecoration: 'none' }}>{text}</span>
        )}
      </StyledButton>
    );
  }
}
