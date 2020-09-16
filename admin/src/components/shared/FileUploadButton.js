import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { transition, wideFont } from './helpers';

const CustomInput = styled.input`
  display: none;
`;

const CustomLabel = styled.label`
  ${transition('filter', 'box-shadow')};
  ${wideFont};

  height: 45px;
  border: 0;
  border-radius: 30px;
  margin-left: -45px;
  padding: 15px 25px;
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
  margin-bottom: 16px;

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
    const { text, onFileSelected } = this.props;

    return (
      <>
        <CustomLabel htmlFor='file-upload' className='custom-file-upload'>
          <i className='fa fa-cloud-upload'></i> {text}
        </CustomLabel>
        <CustomInput onChange={onFileSelected} id='file-upload' type='file' />
      </>
    );
  }
}
