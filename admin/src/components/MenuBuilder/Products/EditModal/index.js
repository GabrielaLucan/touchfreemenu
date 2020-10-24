import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter, AddButton, RemoveButton } from '../../Categories/EditModal/styles';
import { FormInput, Label, SmallDescription, FormInputWrapper, Suffix } from '../../styles';
import { faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

const emptyProduct = { ingredients: [null], quantities: [null], name: '', price: '' };

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    inEditMode: false,
    product: emptyProduct,
  };

  open = (product) => {
    if (product) {
      this.setState({ isOpen: true, inEditMode: true, product: { ...product } });
    } else {
      this.setState({ isOpen: true, inEditMode: false, product: emptyProduct });
    }
  };

  save = () => {
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  addQuantityField = () => {
    this.state.product.quantities.push(null);
    this.setState({});
  };

  removeQuantityField = () => {
    this.state.product.quantities.pop();
    this.setState({});
  };

  Field = ({ label, for: propertyName, index, withAddButton, suffix, asNumber, addNewField, maxLength, max, description, ...otherInputProps }) => (
    <>
      {label && <Label>{label}</Label>}
      <FormInputWrapper>
        <FormInput
          className={[asNumber ? 'small' : '', suffix ? 'with-suffix' : ''].join(' ')}
          value={(typeof index !== 'undefined' ? this.state.product[propertyName][index] : this.state.product[propertyName]) || ''}
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

            if (typeof index !== 'undefined') {
              this.state.product[propertyName][index] = e.target.value;
            } else {
              this.state.product[propertyName] = e.target.value;
            }
            this.setState({});
          }}
          {...otherInputProps}
        />
        {suffix && <Suffix>{suffix}</Suffix>}
      </FormInputWrapper>
    </>
  );

  render() {
    const { isOpen, inEditMode, product } = this.state;

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

            <Label>Gramaj</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {product.quantities.map((x, i) => (
                <Field key={i} for="quantities" index={i} asNumber max={9999} suffix="g" />
              ))}
              {product.quantities.length > 1 && (
                <RemoveButton onClick={this.removeQuantityField}>
                  <FontAwesomeIcon icon={faMinus} />
                </RemoveButton>
              )}
              <AddButton onClick={this.addQuantityField}>
                <FontAwesomeIcon icon={faPlus} />
              </AddButton>
            </div>

            {product.quantities.length < 2 && <SmallDescription>Poți specifica mai multe gramaje folosind butonul +.</SmallDescription>}
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
