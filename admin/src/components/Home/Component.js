import React, { Component } from 'react';
import styled from 'styled-components/macro';
import HomeMainSection from './MainSection';
import FileUploadButton from '../shared/FileUploadButton';
import Button from '../shared/Button';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`;

export default class Home extends Component {
  componentDidMount() {
    this.redirectIfNotLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn() {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
  }

  uploadSelectedFile = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('menu', file);

    this.props.uploadPdf(data);
  };

  render() {
    if (!this.props.token) {
      return null;
    }

    return (
      <Wrapper>
        <HomeMainSection>
          <FileUploadButton onFileSelected={this.uploadSelectedFile} text='Încarcă meniu nou (PDF)' />
          <Button>Vezi meniul curent (PDF)</Button>
        </HomeMainSection>
      </Wrapper>
    );
  }
}
