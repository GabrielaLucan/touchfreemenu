import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter } from './styles';
import { FormInput, Label } from '../../styles';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    currentCategoryName: 'Aperitive',
    newCategoryName: 'Aperitive',
  };

  open = (category) => {
    this.setState({ isOpen: true, currentCategoryName: category.name, newCategoryName: category.name });
  };

  save = () => {
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, newCategoryName, currentCategoryName } = this.state;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal className={isOpen ? 'open' : 'closed'}>
          <Header>
            Editează categoria
            <CloseButtonWrapper onClick={this.close} title='Închide'>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Label>Nume curent</Label>
            <div>{currentCategoryName}</div>
            <Label>Nume nou</Label>
            <FormInput value={newCategoryName} onChange={(e) => this.setState({ newCategoryName: e.target.value })} placeholder='Nume nou' />
          </ModalContent>
          <ModalFooter>
            <Button type='cancel' onClick={this.close} text='Anulează' />
            <Button onClick={this.save} text='Salvează' icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
