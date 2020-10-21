import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter } from '../../Categories/EditModal/styles';
import { FormInput, Label } from '../../styles';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    inEditMode: false,
    category: {},
  };

  open = (category) => {
    if (category) {
      this.setState({ isOpen: true, inEditMode: true, category: { ...category } });
    } else {
      this.setState({ isOpen: true, category: {} });
    }
  };

  save = () => {
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  changeValue = (fieldName, value) => {
    this.state.category[fieldName] = value;
    this.setState({});
  };

  render() {
    const { isOpen, inEditMode, category } = this.state;
    const { name } = category;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal className={isOpen ? 'open' : 'closed'}>
          <Header>
            {inEditMode ? 'Editează categoria' : 'Adaugă categorie'}
            <CloseButtonWrapper onClick={this.close} title="Închide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Label>Nume</Label>
            <FormInput value={name} onChange={(e) => this.changeValue('name', e.target.value)} placeholder="Nume categorie" />
          </ModalContent>
          <ModalFooter>
            <Button type="cancel" onClick={this.close} text="Anulează" />
            <Button onClick={this.save} text={inEditMode ? 'Salvează' : 'Adaugă'} icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
