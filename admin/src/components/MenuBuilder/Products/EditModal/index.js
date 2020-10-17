import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter } from '../../Categories/EditModal/styles';
import { FormInput, Label } from '../../styles';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    originalProduct: {},
    editableProduct: {},
  };

  open = (product) => {
    this.setState({ isOpen: true, originalProduct: product, editableProduct: { ...product } });
  };

  save = () => {
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, editableProduct } = this.state;
    const { weightInGrams, price } = editableProduct;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal className={isOpen ? 'open' : 'closed'}>
          <Header>
            Editează produsul
            <CloseButtonWrapper onClick={this.close} title='Închide'>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Label>Gramaj</Label>
            <FormInput value={weightInGrams} onChange={(e) => this.setState({ weightInGrams: e.target.value })} placeholder='Gramaj' />
            <Label>Preț (RON)</Label>
            <FormInput value={price} onChange={(e) => this.setState({ price: e.target.value })} placeholder='Preț' />
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
