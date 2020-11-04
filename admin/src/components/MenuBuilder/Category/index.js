import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Panel, PanelHeader, SmallDescription, CategoryTitle, Product as ProductStyle, ProductImageWrapper, ProductImage, DragIconWrapper, ButtonsWrapper, Button, CategoryActions } from '../styles';
import { faCaretDown, faCaretRight, faGripVertical, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

export default class Category extends Component {
  state = {
    isExpanded: false,
  };

  sortProducts = (a, b) => a.index - b.index;
  filterProducts = (x) => x.categoryId == this.props.category.id && x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.props.query.toLowerCase().trim());
  getProducts = () => this.props.products.filter(this.filterProducts).sort(this.sortProducts);

  render() {
    const { category, inEditMode, provided, openProductModal, removeProduct } = this.props;
    const { isExpanded } = this.state;

    return (
      <Panel>
        <PanelHeader onClick={() => this.setState({ isExpanded: !this.state.isExpanded })}>
          <CategoryActions>
            <CategoryTitle>{category.name}</CategoryTitle>
            <FontAwesomeIcon style={{ marginTop: '1px', transform: `rotate(${isExpanded ? '90' : '0'}deg)`, transition: 'transform 0.2s ease-in-out' }} color="#818e99" icon={faCaretRight} />
          </CategoryActions>
          <Button className="green" title="Adaugă produs" onClick={() => openProductModal(category.id)}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0' }} />
          </Button>
        </PanelHeader>

        {isExpanded &&
          this.getProducts().map((product) => (
            <Product key={product.id} product={product} provided={provided} inEditMode={inEditMode} openEditModal={() => openProductModal(product)} removeProduct={() => removeProduct(product)} />
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
                  {product.isDiscounted ? 'Preț original: ' : 'Preț: '}
                  <span style={{ fontWeight: product.isDiscounted ? '300' : '600' }}>{product.price} RON</span>
                  {product.isDiscounted && (
                    <span>
                      {' '}
                      / Preț redus: <span style={{ fontWeight: '600' }}>{product.discountedPrice} RON</span>
                    </span>
                  )}
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
        <ButtonsWrapper>
          <Button title="Editează produsul" onClick={() => openEditModal(product)}>
            <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
          </Button>
          <Button title="Șterge produsul" className="destructive" onClick={() => removeProduct(product)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonsWrapper>
      </ProductStyle>
    )}
  </Draggable>
);
