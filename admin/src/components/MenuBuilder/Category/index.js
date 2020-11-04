import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Panel, PanelHeader, SmallDescription, CategoryTitle, Product as ProductStyle, ProductImageWrapper, ProductImage, DragIconWrapper, ButtonsWrapper, Button, CategoryActions } from '../styles';
import { faCaretDown, faGripVertical, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class Category extends Component {
  sortProducts = (a, b) => a.index - b.index;
  filterProducts = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase().trim());
  getProducts = () => this.props.products.filter(this.filterProducts).sort(this.sortProducts);

  render() {
    const { category, inEditMode, provided, openProductModal, removeProduct } = this.props;

    return (
      <Panel>
        <PanelHeader>
          <CategoryActions>
            <CategoryTitle>{category.name}</CategoryTitle>
            <FontAwesomeIcon color="#818e99" icon={faCaretDown} />
          </CategoryActions>
          <Button className="green" title="Adaugă produs" onClick={() => openProductModal(category.id)}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0' }} />
          </Button>
        </PanelHeader>

        {this.getProducts().map((product) => (
          <Product product={product} provided={provided} inEditMode={inEditMode} openEditModal={() => openProductModal(product)} removeProduct={() => removeProduct(product)} />
        ))}

        {provided.placeholder}
      </Panel>
    );
  }
}

const Product = ({ product, provided, inEditMode, openEditModal, removeProduct }) => (
  <Draggable key={product.id} {...provided.droppableProps} ref={provided.innerRef} isDragDisabled={!inEditMode} draggableId={product.id} index={product.index}>
    {(provided) => (
      <ProductStyle ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={inEditMode ? 'editable' : ''}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {inEditMode && (
            <DragIconWrapper>
              <FontAwesomeIcon icon={faGripVertical} />
            </DragIconWrapper>
          )}
          <div style={{ display: 'flex' }}>
            {product.imageUrl && (
              <ProductImageWrapper>
                <ProductImage src={product.imageUrl} />
              </ProductImageWrapper>
            )}
            <div>
              <div>{product.name}</div>
              {product.weightInGrams && <SmallDescription>Gramaj: {product.weightInGrams}g</SmallDescription>}
              {product.price && (
                <SmallDescription>
                  {product.isDiscounted ? 'Preț vechi' : 'Preț'}: {product.price} RON
                  {product.isDiscounted && `Preț redus: {product.discountedPrice} RON`}
                </SmallDescription>
              )}
              {product.ingredients.length > 0 && <SmallDescription>Ingrediente: {product.ingredients}</SmallDescription>}
              {product.quantities.length > 0 && (
                <SmallDescription>
                  Gramaj{product.quantities.includes('/') || product.quantities.includes(',') ? 'e' : ''}: {product.quantities}
                </SmallDescription>
              )}
            </div>
          </div>
        </div>
        {inEditMode && (
          <ButtonsWrapper>
            <Button title="Editează produsul" onClick={() => openEditModal(product)}>
              <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
            </Button>
            <Button title="Șterge produsul" className="destructive" onClick={() => removeProduct(product)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ButtonsWrapper>
        )}
      </ProductStyle>
    )}
  </Draggable>
);
