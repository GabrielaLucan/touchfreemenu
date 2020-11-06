import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Panel,
  PanelHeader,
  SmallDescription,
  CategoryTitle,
  Product as ProductStyle,
  ProductImageWrapper,
  ProductImage,
  DragIconWrapper,
  ButtonsWrapper,
  Button,
  CategoryActions,
  CountTag,
} from '../styles';
import { faCaretRight, faGripVertical, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

export default class Category extends Component {
  state = {
    isExpanded: this.props.category.index == 1,
  };

  sortProducts = (a, b) => a.index - b.index;
  filterProducts = (x) => x.categoryId == this.props.category.id && x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.props.query.toLowerCase().trim());
  getProducts = () => this.props.products.filter(this.filterProducts).sort(this.sortProducts);

  getCategoryHeight = () =>
    76 +
    this.getProducts()
      .map((x) => (x.imageUrl ? 130 : 74 + (x.quantities ? 22 : 0) + (x.ingredients ? 22 : 0)))
      .reduce((a, b) => a + b, 0);

  render() {
    const { category, inEditMode, provided, openProductModal, removeProduct } = this.props;
    const { isExpanded } = this.state;

    return (
      <Panel style={{ height: isExpanded ? this.getCategoryHeight() + 'px' : '68px', transition: 'height 0.25s ease-in-out' }}>
        <PanelHeader onClick={() => this.setState({ isExpanded: !this.state.isExpanded })} style={{ pointerEvents: this.getProducts().length ? 'all' : 'none' }}>
          <CategoryActions>
            <CategoryTitle>
              <CountTag>{this.getProducts().length}</CountTag>
              <span>{category.name}</span>
            </CategoryTitle>
            <FontAwesomeIcon
              style={{
                transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
                transition: 'transform 0.2s ease-in-out',
                opacity: this.getProducts().length ? 1 : 0,
              }}
              color="#818e99"
              icon={faCaretRight}
            />
          </CategoryActions>
          <Button
            className="green"
            title="Adaugă produs"
            onClick={(e) => {
              openProductModal(category.id);
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0' }} />
          </Button>
        </PanelHeader>

        {this.getProducts().map((product) => (
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
