import React from 'react';
import {
  Backdrop,
  Modal,
  Header,
  CloseButtonWrapper,
  ModalContent,
  ModalFooter,
  AddButton,
  RemoveButton,
  FieldButtonsWrapper,
  DiscountToggle,
  DropArea,
  ProductImageWrapper,
  RemoveImageButton,
} from '../../Categories/EditModal/styles';
import { FormInput, Label, SmallDescription, FormInputWrapper, Suffix } from '../../styles';
import { Button as ActionButton } from '../../Panel/styles';
import { faCheck, faTimes, faPlus, faCamera, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';
import Dropzone from 'react-dropzone';

const emptyProduct = { name: '', photoUrl: '', ingredients: [''], quantities: [null], price: '' };

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

  setBase64Image = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        this.state.product.photoBase64 = reader.result;
        this.setState({ showsPhotoPicker: false });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  removeProductImage = () => {
    this.state.product.photoBase64 = '';
    this.state.product.photoImageUrl = '';
    this.setState({});
  };

  isProductValid = () => {
    const { name = '', price } = this.state.product;

    if (!name.length || !price) {
      return false;
    }
    return true;
  };

  render() {
    const { isOpen, inEditMode, product, showsPhotoPicker } = this.state;

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

            <div style={{ position: 'absolute', top: '0', right: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
              {!product.photoUrl && !product.photoBase64 ? (
                !showsPhotoPicker ? (
                  <ActionButton className="green" title="Adaugă poză" style={{ marginTop: '22px' }} onClick={() => this.setState({ showsPhotoPicker: true })}>
                    <FontAwesomeIcon icon={faCamera} />
                    Adaugă poză
                  </ActionButton>
                ) : (
                  <>
                    <Dropzone onDrop={this.setBase64Image}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <section>
                          <DropArea {...getRootProps()} style={{ backgroundColor: isDragActive ? '#fff' : undefined }}>
                            <input {...getInputProps()} />
                            <p style={{ maxWidth: '250px', textAlign: 'center', padding: '30px' }}>Trage poza aici sau fă click pentru a alege manual.</p>
                          </DropArea>
                        </section>
                      )}
                    </Dropzone>
                    <Button type="cancel" style={{ marginTop: '0' }} onClick={() => this.setState({ showsPhotoPicker: false })} text="Anulează" />
                  </>
                )
              ) : (
                <ProductImageWrapper onClick={this.removeProductImage}>
                  <img src={product.photoUrl || product.photoBase64} style={{ height: '100%' }} />
                  <RemoveImageButton>Șterge</RemoveImageButton>
                </ProductImageWrapper>
              )}
            </div>

            <Field for="price" label={product.isDiscounted ? 'Preț vechi' : 'Preț'} asNumber max={9999} suffix="RON" />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '16px' }}>
              <DiscountToggle checked={product.isDiscounted} title="La reducere?" icons={false} onChange={this.toggleDiscounted} />
              <div style={{ marginLeft: '8px' }}>{product.isDiscounted ? 'La reducere' : 'La reducere?'}</div>
            </div>
            {product.isDiscounted && <Field for="discountedPrice" label="Preț redus" asNumber max={9999} suffix="RON" />}

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

            <Label>Gramaj{product.quantities.length > 1 ? 'e' : ''}</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {product.quantities.map((x, i) => (
                <>
                  {i > 0 && <div style={{ marginTop: '8px', marginRight: '4px', marginLeft: '-2px' }}>/</div>}
                  <Field key={i} for="quantities" autoFocus index={i} asNumber max={9999} suffix="g" />
                </>
              ))}

              {this.renderFieldActionsFor('quantities')}
            </div>
            <SmallDescription>Poți specifica mai multe ingrediente/gramaje folosind butonul "+".</SmallDescription>
          </ModalContent>
          <ModalFooter>
            <Button type="cancel" onClick={this.close} text="Anulează" />
            <Button onClick={this.save} disabled={!this.isProductValid()} text={inEditMode ? 'Salvează' : 'Adaugă'} icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
