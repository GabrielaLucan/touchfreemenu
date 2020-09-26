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

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Panel = styled.div`
  display: flex;
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    margin-right: 0;
  }
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
  max-width: 246px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  width: 310px;
  justify-content: space-between;
`;

const QrCodeImage = styled.img`
  width: 410px;
  margin: -49px;
`;

const QrCodeWrapper = styled.div`
  overflow: hidden;
  align-self: center;
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

    const origin = window.location.origin.includes('localhost') ? window.location.origin.replace('3000', '3001') : window.location.origin.replace('admin.', 'www.');

    return (
      <Wrapper>
        <HomeMainSection>
          <PreviewWrapper loading={this.props.loading}>
            <Panel>
              <InfoLineTitle>Data încărcării ultimului meniu</InfoLineTitle>
              <InfoLineValue>{user.pdfUploadDate ? moment(user.pdfUploadDate).format('DD MMM @ HH:mm') : '-'}</InfoLineValue>
              <InfoLineTitle>Nume fișier</InfoLineTitle>
              <InfoLineValue>{user.pdfOriginalName || '-'}</InfoLineValue>
              <InfoLineTitle>Mărime fișier</InfoLineTitle>
              <InfoLineValue style={{ marginBottom: 0 }}>{user.pdfSize ? (user.pdfSize / (1024 * 1000)).toFixed(2) + 'MB' : '-'}</InfoLineValue>
              <FileUploadButton onFileSelected={this.uploadSelectedFile} text='Încarcă meniu nou (PDF)' />
              <Button icon={faDownload} downloadUrl={user.pdfUrl} downloadName={user.pdfOriginalName} text='Descarcă meniul curent' />
            </Panel>
            <Panel>
              <Title>Previzualizare meniu curent</Title>
              <iframe width='355px' height='600px' src={`http://docs.google.com/gview?url=${user.pdfUrl}&embedded=true`} frameborder='0' />
              <iframe src='http://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true' style={{ width: '600px', height: '500px' }} frameborder='0'></iframe>
            </Panel>
            <Panel>
              <Title>Codul tău QR</Title>
              {user.pdfUrl ? (
                <QrCodeWrapper>
                  <QrCodeImage title={`touchfreemenu.ro/${user.username}`} src={`${origin}/${user.username}/my-qr-code.svg`} />
                </QrCodeWrapper>
              ) : (
                <span>Încarcă prima dată un meniu pentru a putea vedea codul QR.</span>
              )}
              {user.pdfUrl && (
                <ActionsWrapper>
                  <Button onClick={() => window.open(`${origin}/${user.username}`, '_blank')} text='Deschide' icon={faExternalLinkAlt} />
                  <Button onClick={() => window.open(`${origin}/${user.username}/my-qr-code.svg`, '_blank')} text='Descarcă' icon={faDownload} />
                </ActionsWrapper>
              )}
            </Panel>
          </PreviewWrapper>
        </HomeMainSection>
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}
