import React, { Component } from 'react';
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
  ChangeImageButton,
  FieldWrapper,
} from './styles';
import { FormInput, Label, FormInputWrapper, Suffix, CameraIconWrapper } from '../styles';
import { faCheck, faTimes, faPlus, faCamera, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../shared/Button';
import Dropzone from 'react-dropzone';

const emptyProduct = { name: '', imageUrl: '', ingredients: '', quantities: '', price: '', isDiscounted: false, categoryId: undefined, discountedPrice: '' };

export default class ProductModal extends Component {
  state = {
    isOpen: false,
    inEditMode: false,
    product: { ...emptyProduct },
    selectedImageBase64: '',
    selectedImage: null,
  };

  open = (productOrCategoryId) => {
    if (typeof productOrCategoryId == 'object') {
      const productToEdit = productOrCategoryId;
      this.setState({ inEditMode: true, product: { ...productToEdit } });
    } else {
      const categoryId = productOrCategoryId;
      this.setState({ inEditMode: false, product: { ...emptyProduct, categoryId } });
    }
    this.setState({ selectedImageBase64: '', selectedImage: null, isOpen: true });
  };

  save = () => {
    const { selectedImage, product } = this.state;

    if (this.state.inEditMode) {
      this.props.editProduct({ ...product, imageFile: selectedImage });
    } else {
      this.props.createProduct({ ...product, imageFile: selectedImage });
    }
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
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
    this.setState({ product: { ...this.state.product, isDiscounted: !this.state.product.isDiscounted } });
  };

  setProductImage = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        this.setState({ showsImagePicker: false, product: { ...this.state.product, imageUrl: '' }, selectedImage: file, selectedImageBase64: reader.result });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  removeProductImage = () => {
    this.setState({ product: { ...this.state.product, imageUrl: '' }, selectedImageBase64: '', selectedImage: undefined });
  };

  changeProductImage = () => {
    this.setState({ product: { ...this.state.product, imageUrl: '' }, selectedImageBase64: '', selectedImage: undefined, showsImagePicker: true });
  };

  changeProductCategory = (e) => {
    this.setState({ product: { ...this.state.product, categoryId: e.target.value } });
  };

  isProductValid = () => {
    const { name = '', price, categoryId } = this.state.product;

    if (!name.length || !price || !categoryId) {
      return false;
    }
    return true;
  };

  Field = ({ label, for: propertyName, suffix, asNumber, addNewField, maxLength, max, description, style, ...otherInputProps }) => {
    const { product } = this.state;
    const currentValue = product[propertyName] || '';
    return (
      <FieldWrapper style={style}>
        {label && <Label>{label}</Label>}
        <FormInputWrapper>
          <FormInput
            className={[asNumber ? 'small' : '', suffix ? 'with-suffix' : ''].join(' ')}
            value={currentValue || ''}
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

              product[propertyName] = newValue;
              this.setState({});
            }}
            {...otherInputProps}
          />
          {suffix && <Suffix>{suffix}</Suffix>}
        </FormInputWrapper>
      </FieldWrapper>
    );
  };

  render() {
    const { isOpen, inEditMode, product, selectedImageBase64 } = this.state;
    const { categories } = this.props;

    const { Field } = this;

    return (
      <>
        <Backdrop className={isOpen ? 'open' : 'closed'} />
        <Modal className={isOpen ? 'open' : 'closed'}>
          <Header>
            {inEditMode ? 'Editează produsul' : <span>Adaugă produs în "{(categories.find((x) => x.id == product.categoryId) || {}).name || ''}"</span>}
            <CloseButtonWrapper onClick={this.close} title="Închide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <div style={{ width: '100%' }}>
              <Field for="name" label="Nume" placeholder="Nume produs" maxLength={50} />
            </div>

            <Field for="ingredients" label="Ingrediente (opțional)" placeholder="e.g. piept de pui, ou, pesmet" />
            <Field for="quantities" style={{ marginLeft: '16px' }} label="Gramaj(e)" placeholder="e.g. 450ml/150g/50g" />

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '-8px' }}>
                  <Field for="price" label={product.isDiscounted ? 'Preț original' : 'Preț'} asNumber max={9999} suffix="RON" />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', marginLeft: '16px' }}>
                    <DiscountToggle checked={product.isDiscounted} title="La reducere?" icons={false} onChange={this.toggleDiscounted} />
                    <div style={{ marginLeft: '8px' }}>{product.isDiscounted ? 'La reducere' : 'La reducere?'}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '-8px' }}>
                  {product.isDiscounted && <Field for="discountedPrice" label="Preț redus" asNumber max={9999} suffix="RON" />}
                </div>
              </div>
              <div style={{ paddingTop: '12px', marginBottom: '8px' }}>
                {!product.imageUrl && !selectedImageBase64 ? (
                  <Dropzone onDrop={this.setProductImage}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <DropArea {...getRootProps()} style={{ backgroundColor: isDragActive ? '#fff' : undefined }}>
                        <CameraIconWrapper>
                          <FontAwesomeIcon icon={faCamera} />
                        </CameraIconWrapper>
                        <input {...getInputProps()} />
                        <p style={{ maxWidth: '250px', textAlign: 'center' }}>Trage o poză aici sau fă click pentru a alege manual.</p>
                      </DropArea>
                    )}
                  </Dropzone>
                ) : (
                  <ProductImageWrapper>
                    <img src={product.imageUrl || selectedImageBase64} style={{ width: '100%' }} />
                    <ChangeImageButton onClick={this.changeProductImage}>Schimbă</ChangeImageButton>
                    <ChangeImageButton className="remove" onClick={this.removeProductImage}>
                      Șterge
                    </ChangeImageButton>
                  </ProductImageWrapper>
                )}
              </div>
            </div>
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
