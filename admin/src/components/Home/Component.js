import React, { Component } from 'react';
import styled from 'styled-components/macro';
import FileUploadButton from '../shared/FileUploadButton';
import Button from '../shared/Button';
import moment from 'moment';
import { faExternalLinkAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';
import Toggle from 'react-toggle';

const ContentWrapper = styled.main`
  flex: 1;
  min-width: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 24px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

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
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  max-width: 395px;
  color: ${(props) => props.theme.normalText};

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px));
    margin-right: 0;
  }

  iframe {
    width: 100%;
  }

  .questionnaire-toggle.react-toggle--checked .react-toggle-track {
    background-color: #7ac944;
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
  margin-top: 12px;
`;

const InfoLineValue = styled.span`
  margin-bottom: 12px;
  margin-top: 4px;
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
        <ContentWrapper>
          <PreviewWrapper loading={this.props.loading}>
            <div>
              <Panel>
                <Title>Meniul în format PDF</Title>
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
            </div>
            <Panel>
              <Title>Previzualizare meniu curent</Title>
              <iframe title='Meniul curent' style={{ border: 'none' }} width='355px' height='600px' src={user.pdfUrl} />
            </Panel>
            <Panel>
              <Title>Chestionar COVID-19</Title>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '12px' }}>
                <Toggle className='questionnaire-toggle' defaultChecked={user.isCovidQuestionnaireEnabled} onChange={this.props.toggleQuestionnaire} />
                <div style={{ marginLeft: '8px' }}>{user.isCovidQuestionnaireEnabled ? 'Activ' : 'Inactiv'}</div>
              </div>
              {user.isCovidQuestionnaireEnabled ? (
                <span>Chestionarul COVID-19 e activ și apare clienților după ce scanează codul QR, înainte de a vedea meniul.</span>
              ) : (
                <span>Dacă activezi chestionarul, acesta va fi afișat clienților ca un pas intermediar înainte de a accesa meniul.</span>
              )}
            </Panel>
          </PreviewWrapper>
        </ContentWrapper>
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}
