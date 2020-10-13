import React from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faSpellCheck, faPencilAlt, faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Panel, Title, EditToggleWrapper, ActionButton, SmallDescription, ButtonsWrapper, SearchInput } from '../styles';
import { Product, ProductImage, ProductImageWrapper } from './styles';
import EditModal from './EditModal';

export default class Products extends React.Component {
  state = {
    query: '',
  };

  removeCategory = () => {
    if (window.confirm(`Ești sigur că dorești să ștergi produsul "${this.props.name}"?`)) {
      window.alert('Produsul a fost șters');
    }
  };

  toggleIcons = {
    unchecked: <FontAwesomeIcon size='sm' color='#fff' icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
    checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size='sm' color='#fff' icon={faCheck} />,
  };

  render() {
    const { inEditMode, query } = this.state;

    return (
      <Panel>
        <Title>Produse</Title>
        {/* <EditToggleWrapper>
          <Toggle checked={inEditMode} title='Editează' onChange={() => this.setState({ inEditMode: !this.state.inEditMode })} icons={this.toggleIcons} />
        </EditToggleWrapper> */}
        <SearchInput placeholder='Găsește produs' value={query} onChange={(e) => this.setState({ query: e.target.value })} />
        {products
          .filter((x) => x.name.toLowerCase().includes(query.toLowerCase()))
          .map((product) => (
            <Product>
              {product.imageUrl && (
                <ProductImageWrapper>
                  <ProductImage src={product.imageUrl} />
                </ProductImageWrapper>
              )}
              <div>
                <div>{product.name}</div>
                <SmallDescription>Gramaj: {product.weightInGrams ? product.weightInGrams + 'g' : 'Indisponibil'}</SmallDescription>
                <SmallDescription>Preț: {product.price ? product.price + ' RON' : 'Indisponibil'}</SmallDescription>
              </div>
              {inEditMode && (
                <ButtonsWrapper>
                  <ActionButton title='Mută în sus' className='green left' onClick={this.removeCategory}>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </ActionButton>
                  <ActionButton title='Mută în jos' className='green right' onClick={this.removeCategory}>
                    <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faChevronDown} />
                  </ActionButton>
                  <ActionButton title='Redenumește' onClick={() => this.editModal.open(product)}>
                    <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faSpellCheck} />
                    <span>Redenumește</span>
                  </ActionButton>
                  <ActionButton title='Șterge' className='destructive' onClick={this.removeCategory}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Șterge</span>
                  </ActionButton>
                </ButtonsWrapper>
              )}
            </Product>
          ))}
        <EditModal ref={(x) => (this.editModal = x)}></EditModal>
      </Panel>
    );
  }
}

const products = [
  { id: 1, name: 'Brezzel cu cremă de brânză', price: 15, weightInGrams: 85, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Brezzel-cu-crema-de-branza.jpg' },
  { id: 2, name: 'Bacon uscat', weightInGrams: 80, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Bacon-uscat.jpg' },
  { id: 3, name: 'Urechiușe de porc prăjite și picante', price: 22 },
  { id: 4, name: 'Cârnăciori de casă din carne de mistreț', price: 17, weightInGrams: 65 },
  { id: 5, name: 'Pâine cu untură, bacon și ceapă verde', weightInGrams: 100, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Paine-cu-untura-ceapa-verde-si-bacun.jpg' },
  { id: 6, name: 'Pate de casă cu ridichi', price: 12, weightInGrams: 150 },
  { id: 7, name: 'Pastă de jumări cu ceapă verde', weightInGrams: 100 },
  { id: 8, name: 'Brezzel cu cremă de brânză', imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Brezzel-cu-crema-de-branza.jpg' },
  { id: 9, name: 'Bacon uscat', weightInGrams: 80, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Bacon-uscat.jpg' },
  { id: 10, name: 'Urechiușe de porc prăjite și picante', weightInGrams: 110 },
  { id: 11, name: 'Cârnăciori de casă din carne de mistreț', weightInGrams: 65 },
  { id: 12, name: 'Pâine cu untură, bacon și ceapă verde', weightInGrams: 100, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Paine-cu-untura-ceapa-verde-si-bacun.jpg' },
  { id: 13, name: 'Pate de casă cu ridichi', weightInGrams: 150 },
  { id: 14, name: 'Pastă de jumări cu ceapă verde', weightInGrams: 100 },
];
