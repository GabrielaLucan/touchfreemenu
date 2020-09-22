import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { transition, wideFont } from './helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const CustomInput = styled.input`
  display: none;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
`;

const CustomLabel = styled.label`
  ${transition('filter', 'box-shadow')};
  ${wideFont};

  height: 100%;
  border: 0;
  border-radius: 30px;
  padding: 15px 25px;
  padding-bottom: 14px;
  background: #7ac944;
  font-size: 14px;
  font-weight: 500;
  font-family: Arial;
  text-transform: uppercase;
  letter-spacing: 0;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  box-shadow: 0 5px 30px rgba(255, 255, 255, 0.05);
  transition: 200ms;
  white-space: nowrap;

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
  }
`;

export default class FileUploadButton extends Component {
  render() {
    const { text, onFileSelected, disabled } = this.props;

    return (
      <ButtonWrapper disabled={disabled} style={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
        <CustomLabel htmlFor='file-upload' className='custom-file-upload'>
          <FontAwesomeIcon style={{ marginRight: '8px' }} color='#fff' icon={faUpload} />
          <i className='fa fa-cloud-upload'></i> {text}
        </CustomLabel>
        <CustomInput accept="application/pdf" onChange={onFileSelected} onClick={(event) => (event.target.value = null)} id='file-upload' type='file' />
      </ButtonWrapper>
    );
  }
}
