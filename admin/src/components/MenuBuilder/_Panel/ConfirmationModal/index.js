import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter, ErrorText } from './styles';
import { FormInput, Label } from '../../styles';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

const emptyCategory = { name: '' };

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    title: '',
    text: '',
  };

  open = async ({ text, title }) =>
    new Promise((resolve, reject) => {
      this.setState({ isOpen: true, text, title });

      this.resolve = resolve;
      this.reject = reject;
    });

  confirm = () => {
    this.setState({ isOpen: false });
    this.resolve();
  };

  close = () => {
    this.setState({ isOpen: false });
    this.reject();
  };

  render() {
    const { isOpen, title, text } = this.state;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal style={{ width: '400px' }} className={isOpen ? 'open' : 'closed'}>
          <Header>
            {title}
            <CloseButtonWrapper onClick={this.close} title="Închide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <div style={{ fontSize: 14, marginTop: '24px', fontSize: '16px' }}>{text}</div>
          </ModalContent>
          <ModalFooter>
            <Button type="cancel" onClick={this.close} text="Anulează" />
            <Button onClick={this.confirm} text="Șterge" icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
