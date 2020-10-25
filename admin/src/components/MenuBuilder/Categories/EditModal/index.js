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
    inEditMode: false,
    category: { ...emptyCategory },
    allCategories: [],
  };

  open = (category, allCategories) => {
    if (category) {
      this.setState({ isOpen: true, inEditMode: true, category: { ...category }, allCategories });
    } else {
      this.setState({ isOpen: true, category: { ...emptyCategory }, allCategories });
    }
  };

  save = () => {
    if (this.state.inEditMode) {
      this.props.onSave(this.state.category);
    } else {
      this.props.onCreate(this.state.category);
    }
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  changeValue = (fieldName, value) => {
    this.state.category[fieldName] = value;
    this.setState({});
  };

  isCategoryValid = () => {
    const { category } = this.state;

    if (!(category.name || '').trim().length) {
      return false;
    }
    if (!this.isNameUnique()) {
      return false;
    }

    return true;
  };

  isNameUnique = () => !this.state.allCategories.find((x) => x.name == this.state.category.name && x.id !== this.state.category.id);

  render() {
    const { isOpen, inEditMode, category } = this.state;
    const { name } = category;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal style={{ width: '400px' }} className={isOpen ? 'open' : 'closed'}>
          <Header>
            {inEditMode ? 'Editează categoria' : 'Adaugă categorie'}
            <CloseButtonWrapper onClick={this.close} title="Închide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Label>Nume</Label>
            <FormInput value={name} autoFocus onChange={(e) => this.changeValue('name', e.target.value)} placeholder="Nume categorie" />
            {!this.isNameUnique() && <ErrorText>Există deja o categorie cu numele acesta.</ErrorText>}
          </ModalContent>
          <ModalFooter>
            <Button type="cancel" onClick={this.close} text="Anulează" />
            <Button onClick={this.save} text={inEditMode ? 'Salvează' : 'Adaugă'} disabled={!this.isCategoryValid()} icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
