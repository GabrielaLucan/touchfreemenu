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
  ChangeImageButton,
} from '../../Categories/EditModal/styles';
import { FormInput, Label, SmallDescription, FormInputWrapper, SelectInput, Suffix } from '../../styles';
import { Button as ActionButton } from '../../Panel/styles';
import { faCheck, faTimes, faPlus, faCamera, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../shared/Button';
import Dropzone from 'react-dropzone';

const emptyProduct = { name: '', imageUrl: '', ingredients: [], quantities: [], price: '', isDiscounted: false, categoryId: undefined, discountedPrice: '' };

export default class EditModal extends React.Component {
  state = {
    isOpen: false,
    inEditMode: false,
    product: { ...emptyProduct },
    selectedImageBase64: '',
  };

  open = (product) => {
    if (product) {
      this.setState({ isOpen: true, inEditMode: true, product: { ...product } });
    } else {
      const firstCategory = this.props.categories[0];
      this.setState({ isOpen: true, inEditMode: false, product: { ...emptyProduct, categoryId: firstCategory.id } });
    }
  };

  save = () => {
    const { selectedImage, product } = this.state;

    if (this.state.inEditMode) {
      this.props.onSave({ ...product, imageFile: selectedImage });
    } else {
      this.props.onCreate({ ...product, imageFile: selectedImage });
    }
    this.setState({ isOpen: false });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  Field = ({ label, for: propertyName, index, triggerChar, triggerAction, triggerActionReverse, suffix, asNumber, addNewField, maxLength, max, description, ...otherInputProps }) => {
    const { product } = this.state;
    const isListItem = typeof index !== 'undefined';
    const currentValue = (isListItem ? product[propertyName][index] || '' : product[propertyName]) || '';
    return (
      <>
        {label && <Label>{label}</Label>}
        <FormInputWrapper>
          <FormInput
            className={[asNumber ? 'small' : '', suffix ? 'with-suffix' : ''].join(' ')}
            value={currentValue || ''}
            style={isListItem ? { width: (currentValue + '').length * 6 + 45 + 'px', minWidth: otherInputProps.placeholder ? 120 : 50 + 'px' } : {}}
            onKeyDown={(e) => !e.target.value && e.key === 'Backspace' && triggerActionReverse && triggerActionReverse()}
            onChange={(e) => {
              const newValue = e.target.value;

              if (newValue.endsWith(triggerChar)) {
                triggerAction();
                return;
              }

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
                if (typeof product[propertyName][index] == 'undefined') {
                  product[propertyName].push(newValue);
                } else {
                  product[propertyName][index] = newValue;
                }
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

  addQuantity = () => {
    this.state.product.quantities.push(null);
    this.setState({});
  };

  removeQuantity = () => {
    this.state.product.quantities.pop();
    this.setState({});
  };

  addIngredient = () => {
    this.state.product.ingredients.push(null);
    this.setState({});
  };

  removeIngredient = () => {
    this.state.product.ingredients.pop();
    this.setState({});
  };

  render() {
    const { isOpen, inEditMode, product, showsImagePicker, selectedImageBase64 } = this.state;
    const { categories } = this.props;

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
            <Label>Categorie</Label>

            <SelectInput value={product.categoryId} onChange={this.changeProductCategory}>
              {categories.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </SelectInput>

            <div style={{ position: 'absolute', top: '0', right: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
              {!product.imageUrl && !selectedImageBase64 ? (
                !showsImagePicker ? (
                  <ActionButton className="green" title="Adaugă poză" style={{ marginTop: '22px' }} onClick={() => this.setState({ showsImagePicker: true })}>
                    <FontAwesomeIcon icon={faCamera} />
                    Adaugă poză
                  </ActionButton>
                ) : (
                  <>
                    <Dropzone onDrop={this.setProductImage}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <section>
                          <DropArea {...getRootProps()} style={{ backgroundColor: isDragActive ? '#fff' : undefined }}>
                            <input {...getInputProps()} />
                            <p style={{ maxWidth: '250px', textAlign: 'center', padding: '30px' }}>Trage poza aici sau fă click pentru a alege manual.</p>
                          </DropArea>
                        </section>
                      )}
                    </Dropzone>
                    <Button type="cancel" style={{ marginTop: '0' }} onClick={() => this.setState({ showsImagePicker: false })} text="Anulează" />
                  </>
                )
              ) : (
                <ProductImageWrapper>
                  <img src={product.imageUrl || selectedImageBase64} style={{ height: '100%' }} />
                  <ChangeImageButton onClick={this.changeProductImage}>Schimbă</ChangeImageButton>
                  <ChangeImageButton className="remove" onClick={this.removeProductImage}>
                    Șterge
                  </ChangeImageButton>
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
              {(product.ingredients.length ? product.ingredients : ['']).map((x, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ marginTop: '8px', marginRight: '8px', marginLeft: '-4px' }}>,</div>}
                  <Field for="ingredients" triggerChar="," triggerAction={this.addIngredient} triggerActionReverse={this.removeIngredient} autoFocus index={i} maxLength={50} placeholder="Nume" />
                </React.Fragment>
              ))}

              {this.renderFieldActionsFor('ingredients')}
            </div>

            <Label>Gramaj{product.quantities.length > 1 ? 'e' : ''}</Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {(product.quantities.length ? product.quantities : ['']).map((x, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ marginTop: '8px', marginRight: '4px', marginLeft: '-2px' }}>/</div>}
                  <Field key={i} for="quantities" triggerChar="/" triggerAction={this.addQuantity} triggerActionReverse={this.removeQuantity} autoFocus index={i} asNumber max={9999} suffix="g" />
                </React.Fragment>
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
