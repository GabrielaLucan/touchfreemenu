import React from 'react';
import { SmallDescription } from '../styles';
import { Product, ProductImageWrapper, ProductImage } from './styles';
import Panel from '../_Panel';
import EditModal from './Edit/Container';

export default class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  renderProduct = ({ name, imageUrl, weightInGrams, price, isDiscounted, discountedPrice, ingredients, quantities }) => (
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
        {isDiscounted && <SmallDescription>Preț redus: {discountedPrice} RON</SmallDescription>}
        {ingredients.length > 0 && <SmallDescription>Ingrediente: {ingredients}</SmallDescription>}
        {quantities.length > 0 && <SmallDescription>Gramaj{quantities.includes('/') || quantities.includes(',') ? 'e' : ''}: {quantities}</SmallDescription>}
      </div>
    </div>
  );

  render() {
    return (
      <Panel
        title="Produse"
        type="produs"
        items={this.props.products.map((x) => ({ ...x, category: this.props.categories.find((y) => y.id == x.categoryId) }))}
        createItem={this.props.createProduct}
        renderItem={this.renderProduct}
        loading={this.props.loading}
        saveItemEdits={this.props.editProduct}
        removeItem={this.props.removeProduct}
        moveItem={this.props.moveProduct}
        disabled={!this.props.categories.length}
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