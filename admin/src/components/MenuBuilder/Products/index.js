import React from 'react';
import { SmallDescription } from '../styles';
import { Product, ProductImageWrapper, ProductImage } from './styles';
import Panel from '../Panel';
import EditModal from './EditModal';

export default class Products extends React.Component {
  removeItem = (item) => {
    if (window.confirm(`Ești sigur că dorești să ștergi produsul "${item.name}"?`)) {
      window.alert('Produsul a fost șters');
    }
  };

  render() {
    return (
      <Panel
        title="Produse"
        items={products}
        type="produs"
        removeItem={this.removeItem}
        renderItem={({ name, imageUrl, weightInGrams, price }) => (
          <div style={{ display: 'flex' }}>
            {imageUrl && (
              <ProductImageWrapper>
                <ProductImage src={imageUrl} />
              </ProductImageWrapper>
            )}
            <div>
              <div>{name}</div>
              {weightInGrams && <SmallDescription>Gramaj: {weightInGrams}g</SmallDescription>}
              {price && <SmallDescription>Preț: {price} RON</SmallDescription>}
            </div>
          </div>
        )}
        buttonsWrapperStyle={{
          width: '64px',
          justifyContent: 'space-around',
          display: 'flex',
          flexDirection: 'column',
        }}
        ItemStyle={Product}
        EditModal={EditModal}
      />
    );
  }
}

const products = [
  { id: 1, index: 1, name: 'Brezzel cu cremă de brânză', price: 15, weightInGrams: 85, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Brezzel-cu-crema-de-branza.jpg' },
  { id: 2, index: 2, name: 'Bacon uscat', weightInGrams: 80, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Bacon-uscat.jpg' },
  { id: 3, index: 3, name: 'Urechiușe de porc prăjite și picante', price: 22 },
  { id: 4, index: 4, name: 'Cârnăciori de casă din carne de mistreț', price: 17, weightInGrams: 65 },
  { id: 5, index: 5, name: 'Pâine cu untură, bacon și ceapă verde', weightInGrams: 100, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Paine-cu-untura-ceapa-verde-si-bacun.jpg' },
  { id: 6, index: 6, name: 'Pate de casă cu ridichi', price: 12, weightInGrams: 150 },
  { id: 7, index: 7, name: 'Pastă de jumări cu ceapă verde', weightInGrams: 100 },
  { id: 8, index: 8, name: 'Brezzel cu cremă de brânză', imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Brezzel-cu-crema-de-branza.jpg' },
  { id: 9, index: 9, name: 'Bacon uscat', weightInGrams: 80, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Bacon-uscat.jpg' },
  { id: 10, index: 10, name: 'Urechiușe de porc prăjite și picante', weightInGrams: 110 },
  { id: 11, index: 11, name: 'Cârnăciori de casă din carne de mistreț', weightInGrams: 65 },
  { id: 12, index: 12, name: 'Pâine cu untură, bacon și ceapă verde', weightInGrams: 100, imageUrl: 'https://www.touchfreemenu.ro/img/product-images/Paine-cu-untura-ceapa-verde-si-bacun.jpg' },
  { id: 13, index: 13, name: 'Pate de casă cu ridichi', weightInGrams: 150 },
  { id: 14, index: 14, name: 'Pastă de jumări cu ceapă verde', weightInGrams: 100 },
];
