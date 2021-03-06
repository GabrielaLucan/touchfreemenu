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
  RemoveImageButton,
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

  Field = ({ label, for: propertyName, required, suffix, asNumber, addNewField, maxLength, max, description, style, ...otherInputProps }) => {
    const { product } = this.state;
    const currentValue = product[propertyName] || '';
    return (
      <FieldWrapper style={style}>
        {label && (
          <Label>
            {label}
            {required && <span style={{ color: '#ff5723' }}> *</span>}
          </Label>
        )}
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
            {inEditMode ? 'Editeaz?? produsul' : <span>Adaug?? produs ??n "{(categories.find((x) => x.id == product.categoryId) || {}).name || ''}"</span>}
            <CloseButtonWrapper onClick={this.close} title="??nchide">
              <FontAwesomeIcon icon={faTimes} />
            </CloseButtonWrapper>
          </Header>
          <ModalContent>
            <Field for="name" required label="Nume" placeholder="Nume produs" maxLength={50} />
            <Field style={{ marginLeft: '16px' }} required for="price" label={product.isDiscounted ? 'Pre?? original' : 'Pre??'} asNumber max={9999} suffix="RON" />
            {product.isDiscounted && <Field for="discountedPrice" required style={{ marginLeft: '16px' }} label="Pre?? redus" asNumber max={9999} suffix="RON" />}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 0 16px' }}>
              <DiscountToggle checked={product.isDiscounted} title="La reducere?" icons={false} onChange={this.toggleDiscounted} />
              <div style={{ marginLeft: '8px' }}>{product.isDiscounted ? 'La reducere' : 'La reducere?'}</div>
            </div>

            <Field for="ingredients" label="Ingrediente" placeholder="e.g. piept de pui, ou, pesmet" />
            <Field for="quantities" style={{ marginLeft: '16px' }} label="Gramaj(e)" placeholder="e.g. 450ml/150g/50g" />

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ paddingTop: '12px', marginBottom: '8px', width: '100%' }}>
                {!product.imageUrl && !selectedImageBase64 ? (
                  <Dropzone onDrop={this.setProductImage}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <DropArea {...getRootProps()} className={isDragActive ? 'dragged' : ''}>
                        <CameraIconWrapper>
                          <FontAwesomeIcon icon={faCamera} />
                        </CameraIconWrapper>
                        <input {...getInputProps()} />
                        <p>Trage o poz?? aici sau f?? click pentru a alege manual.</p>
                      </DropArea>
                    )}
                  </Dropzone>
                ) : (
                  <ProductImageWrapper>
                    <img src={product.imageUrl || selectedImageBase64} style={{ width: '100%' }} />
                    <RemoveImageButton onClick={this.removeProductImage}>??terge</RemoveImageButton>
                  </ProductImageWrapper>
                )}
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button type="cancel" onClick={this.close} text="Anuleaz??" />
            <Button onClick={this.save} disabled={!this.isProductValid()} text={inEditMode ? 'Salveaz??' : 'Adaug??'} icon={faCheck} />
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
