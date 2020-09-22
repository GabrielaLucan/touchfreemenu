import React, { Component } from 'react';
import styled from 'styled-components/macro';
import HomeMainSection from './MainSection';
import FileUploadButton from '../shared/FileUploadButton';
import Button from '../shared/Button';
import moment from 'moment';
import { faExternalLinkAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';

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

const PreviewWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;

  ${(props) => props.loading && 'filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none'};
`;

const Panel = styled.div`
  display: flex;
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  padding-right: 26px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.span`
  color: #818e99;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  font-weight: 700;
  letter-spacing: 0.05em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8px;
`;

const InfoLineTitle = styled.span`
  color: #818e99;
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
`;

const InfoLineValue = styled.span`
  margin-bottom: 24px;
  word-break: break-all;
`;

const QrCodeImage = styled.img`
  width: 282px;
  margin: -8px;
`;

export default class Home extends Component {
  componentDidMount() {
    this.redirectIfNotLoggedIn();

    if (localStorage.currentUsername) {
      this.props.attemptLogin(localStorage.currentUsername, localStorage.currentPassword);
    }
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
    const { user, token, loading } = this.props;

    if (!token) {
      return null;
    }

    const origin = window.location.origin.includes('localhost') ? window.location.origin.replace('3000', '3001') : window.location.origin;

    return (
      <Wrapper>
        <HomeMainSection>
          <PreviewWrapper {...this.props}>
            <Panel>
              <InfoLineTitle>Data încărcării ultimului meniu</InfoLineTitle>
              <InfoLineValue>{user.pdfUploadDate ? moment(user.pdfUploadDate).format('DD MMM @ HH:mm') : '-'}</InfoLineValue>
              <InfoLineTitle>Numele fișierului </InfoLineTitle>
              <InfoLineValue>{user.pdfOriginalName || '-'}</InfoLineValue>
              <InfoLineTitle>Mărime fișier</InfoLineTitle>
              <InfoLineValue style={{ marginBottom: 0 }}>{user.pdfSize ? (user.pdfSize / (1024 * 1000)).toFixed(2) + 'MB' : '-'}</InfoLineValue>
              <FileUploadButton onFileSelected={this.uploadSelectedFile} text={loading ? 'Se incarcă...' : 'Încarcă meniu nou (PDF)'} />
              {loading && <InfoLineValue style={{ marginBottom: 0, marginTop: '16px' }}>Se încarcă...</InfoLineValue>}
            </Panel>
            <Panel>
              <Title>Previzualizare meniu curent</Title>
              <iframe width='375px' height='600px' src={user.pdfUrl} />
            </Panel>
            <Panel>
              <Title>Codul tău QR</Title>
              {user.pdfUrl ? <QrCodeImage src={`${origin}/${user.username}/my-qr-code.svg`} /> : <span>Încarcă prima dată un meniu pentru a putea vedea codul QR.</span>}
              {user.pdfUrl && <Button onClick={() => window.open(`${origin}/${user.username}`, '_blank')} text='Deschide' icon={faExternalLinkAlt} />}
              {user.pdfUrl && <Button onClick={() => window.open(`${origin}/${user.username}/my-qr-code.svg`, '_blank')} text='Descarcă' icon={faDownload} />}
            </Panel>
          </PreviewWrapper>
        </HomeMainSection>
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}
