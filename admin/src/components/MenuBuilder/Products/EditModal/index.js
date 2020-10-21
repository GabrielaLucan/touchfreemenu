import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter, AddButton } from '../../Categories/EditModal/styles';
import { FormInput, Label, SmallDescription, FormInputWrapper, Suffix } from '../../styles';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    inEditMode: false,
    product: {},
  };

  open = (product) => {
    if (product) {
      this.setState({ isOpen: true, inEditMode: true, product: { ...product } });
    } else {
      this.setState({ isOpen: true, inEditMode: false, product: {} });
    }
  };

  save = () => {
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  Field = ({ label, for: propertyName, withAddButton, suffix, asNumber, maxLength, max, description, ...otherInputProps }) => (
    <>
      <Label>{label}</Label>
      <FormInputWrapper>
        <FormInput
          className={[asNumber ? 'small' : '', suffix ? 'with-suffix' : ''].join(' ')}
          value={this.state.product[propertyName] || ''}
          onChange={(e) => {
            if (asNumber) {
              if (!/^(\d)*(\.)?(\d)*$/.test(e.target.value)) {
                return;
              }
            }
            if (maxLength) {
              if ((e.target.value + '').length > maxLength) {
                return;
              }
            }
            if (max) {
              if (+e.target.value > max) {
                return;
              }
            }
            this.setState({ product: { ...this.state.product, [propertyName]: e.target.value } });
          }}
          {...otherInputProps}
        />
        {suffix && <Suffix>{suffix}</Suffix>}
      </FormInputWrapper>
      {withAddButton && (
        <AddButton>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      )}
      <SmallDescription>{description}</SmallDescription>
    </>
  );

  render() {
    const { isOpen, inEditMode } = this.state;

    const { Field } = this;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal className={isOpen ? 'open' : 'closed'}>
          <Header>
            {inEditMode ? 'Editează produsul' : 'Adaugă produs'}
            <CloseButtonWrapper onClick={this.close} title="Închide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Field for="name" label="Nume" maxLength={50} />
            <Field for="weightInGrams" label="Gramaj" asNumber max={9999} description="Poți specifica mai multe gramaje folosind butonul +." suffix="g" withAddButton />
            <Field for="price" label="Preț" asNumber max={9999} suffix="RON" />
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
