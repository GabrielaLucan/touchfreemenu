import React from 'react';
import { Backdrop, Modal, Header, CloseButtonWrapper, ModalContent, ModalFooter, AddButton, RemoveButton, FieldButtonsWrapper, DiscountToggle } from '../../Categories/EditModal/styles';
import { FormInput, Label, SmallDescription, FormInputWrapper, Suffix } from '../../styles';
import { faCheck, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';

const emptyProduct = { ingredients: [''], quantities: [null], name: '', price: '' };

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

  Field = ({ label, for: propertyName, index, withAddButton, suffix, asNumber, addNewField, maxLength, max, description, ...otherInputProps }) => {
    const { product } = this.state;
    const isListItem = typeof index !== 'undefined';
    const currentValue = (isListItem ? product[propertyName][index] : product[propertyName]) || '';
    return (
      <>
        {label && <Label>{label}</Label>}
        <FormInputWrapper>
          <FormInput
            className={[asNumber ? 'small' : '', suffix ? 'with-suffix' : ''].join(' ')}
            value={currentValue}
            style={isListItem ? { width: (currentValue + '').length * 6 + 45 + 'px', minWidth: otherInputProps.placeholder ? 120 : 50 + 'px' } : {}}
            onChange={(e) => {
              const newValue = e.target.value;

              if (asNumber && !/^(\d)*(\.)?(\d)*$/.test(newValue)) {
                return;
              }

              if (maxLength && (newValue + '').length > maxLength) {
                return;
              }

              if (max && +newValue > max) {
                return;
              }

              if (isListItem) {
                product[propertyName][index] = newValue;
              } else {
                product[propertyName] = newValue;
              }
              this.setState({});
            }}
            {...otherInputProps}
          />
          {suffix && <Suffix>{suffix}</Suffix>}
        </FormInputWrapper>
      </>
    );
  };

  renderFieldActionsFor = (property) => (
    <FieldButtonsWrapper>
      {this.state.product[property].length > 1 && (
        <RemoveButton
          onClick={() => {
            this.state.product[property].pop();
            this.setState({});
          }}
        >
          <FontAwesomeIcon icon={faMinus} />
        </RemoveButton>
      )}
      <AddButton
        onClick={() => {
          this.state.product[property].push(null);
          this.setState({});
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </AddButton>
    </FieldButtonsWrapper>
  );

  toggleDiscounted = () => {
    this.state.product.isDiscounted = !this.state.product.isDiscounted;
    this.setState({});
  };

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
            <Field for="name" label="Nume" placeholder="Nume produs" maxLength={50} />

            <Label>Ingrediente</Label>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', maxWidth: '670px' }}>
              {product.ingredients.map((x, i) => (
                <>
                  {i > 0 && <div style={{ marginTop: '8px', marginRight: '8px', marginLeft: '-4px' }}>,</div>}
                  <Field key={i} for="ingredients" autoFocus index={i} maxLength={50} placeholder="Nume" />
                </>
              ))}

              {this.renderFieldActionsFor('ingredients')}
            </div>
            {product.quantities.length < 2 && <SmallDescription>Poți specifica mai multe ingrediente folosind butonul "+".</SmallDescription>}

            <Label>Gramaj(e)</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {product.quantities.map((x, i) => (
                <>
                  {i > 0 && <div style={{ marginTop: '8px', marginRight: '8px', marginLeft: '-4px' }}>,</div>}
                  <Field key={i} for="quantities" autoFocus index={i} asNumber max={9999} suffix="g" />
                </>
              ))}

              {this.renderFieldActionsFor('quantities')}
            </div>

            <Field for="price" label={product.isDiscounted ? 'Preț vechi' : 'Preț'} asNumber max={9999} suffix="RON" />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '16px' }}>
              <DiscountToggle checked={product.isDiscounted} title="La reducere?" onChange={this.toggleDiscounted} />
              <div style={{ marginLeft: '8px' }}>{product.isDiscounted ? 'La reducere' : 'La reducere?'}</div>
            </div>
            {product.isDiscounted && <Field for="discountedPrice" label="Preț redus" asNumber max={9999} suffix="RON" />}
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
