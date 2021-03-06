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
  margin-right: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  width: 350px;
  overflow: hidden;
  color: ${(props) => props.theme.normalText};

  @media (max-width: 768px) {
    width: min(395px, calc(100vw - 32px)) !important;
    margin-right: 0;
  }

  iframe {
    width: 100%;
  }

  .questionnaire-toggle.react-toggle--checked .react-toggle-track {
    background-color: #7ac944;
  }

  &.larger {
    width: 380px;
    max-width: 380px;
  }
`;

const Title = styled.span`
  color: #818e99;
  text-transform: uppercase;
  font-size: 12px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  border-top: 1px solid ${(props) => props.theme.border};
  margin: 0 -16px;
  width: calc(100% + 32px);
  margin-top: 20px;
  padding-top: 8px;
  background: ${(props) => props.theme.activeBackground};
  margin-bottom: -24px;
  padding-bottom: 16px;

  button {
    margin: 8px 4px;
  }
`;

const QrCodeImage = styled.img`
  width: 296px;
  margin: -36px;
`;

const QrCodeWrapper = styled.div`
  overflow: hidden;
  align-self: center;
  margin-top: 8px;
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
                <Title>Meniul ??n format PDF</Title>
                <InfoLineTitle>Data ??nc??rc??rii ultimului meniu</InfoLineTitle>
                <InfoLineValue>{user.pdfUploadDate ? moment(user.pdfUploadDate).format('DD MMM @ HH:mm') : '-'}</InfoLineValue>
                <InfoLineTitle>Nume fi??ier</InfoLineTitle>
                <InfoLineValue>{user.pdfOriginalName || '-'}</InfoLineValue>
                <InfoLineTitle>M??rime fi??ier</InfoLineTitle>
                <InfoLineValue style={{ marginBottom: 0 }}>{user.pdfSize ? (user.pdfSize / (1024 * 1000)).toFixed(2) + 'MB' : '-'}</InfoLineValue>
                <ButtonsWrapper>
                  <FileUploadButton onFileSelected={this.uploadSelectedFile} text='??ncarc?? meniu nou (PDF)' />
                </ButtonsWrapper>
              </Panel>
              <Panel>
                <Title>Codul t??u QR</Title>
                {user.pdfUrl ? (
                  <QrCodeWrapper>
                    <QrCodeImage title={`touchfreemenu.ro/${user.username}`} src={`${origin}/${user.username}/my-qr-code.svg`} />
                  </QrCodeWrapper>
                ) : (
                  <span>??ncarc?? prima dat?? un meniu pentru a putea vedea codul QR.</span>
                )}
                {user.pdfUrl && (
                  <ButtonsWrapper>
                    <Button onClick={() => window.open(`${origin}/${user.username}`, '_blank')} text='Deschide' icon={faExternalLinkAlt} />
                    <Button onClick={() => window.open(`${origin}/${user.username}/my-qr-code.svg`, '_blank')} text='Descarc??' icon={faDownload} />
                  </ButtonsWrapper>
                )}
              </Panel>
            </div>
            <Panel className='larger'>
              <Title>Previzualizare meniu curent</Title>
              <iframe title='Meniul curent' style={{ border: 'none', marginTop: '8px' }} width='355px' height='600px' src={user.pdfUrl} />
              <ButtonsWrapper>
                <Button icon={faDownload} downloadUrl={user.pdfUrl} downloadName={user.pdfOriginalName} text='Descarc?? (PDF)' />
              </ButtonsWrapper>
            </Panel>
            <div>
              <Panel>
                <Title>Chestionar COVID-19</Title>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '12px' }}>
                  <Toggle className='questionnaire-toggle' defaultChecked={user.isCovidQuestionnaireEnabled} onChange={this.props.toggleQuestionnaire} />
                  <div style={{ marginLeft: '8px' }}>{user.isCovidQuestionnaireEnabled ? 'Activ' : 'Inactiv'}</div>
                </div>
                {user.isCovidQuestionnaireEnabled ? (
                  <span>Chestionarul COVID-19 e activ ??i apare clien??ilor dup?? ce scaneaz?? codul QR, ??nainte de a accesa meniul.</span>
                ) : (
                  <span>Dac?? activezi chestionarul, acesta va fi afi??at clien??ilor ca un pas intermediar ??nainte de a accesa meniul.</span>
                )}
              </Panel>
              <Panel>
                <Title>Menu builder</Title>
                <span>Construie??te-??i meniul ??i personalizeaz??-l a??a cum dore??ti.</span>
                <ButtonsWrapper>
                  <Button onClick={() => window.open(`${window.location.origin}/menu-builder`, '_blank')} text='Acceseaz??' icon={faExternalLinkAlt} />
                </ButtonsWrapper>
              </Panel>
            </div>
          </PreviewWrapper>
        </ContentWrapper>
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}
