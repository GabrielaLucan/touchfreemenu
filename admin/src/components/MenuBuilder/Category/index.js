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
  MatchedString,
} from '../styles';
import { faCaretRight, faGripHorizontal, faGripVertical, faPencilAlt, faPlus, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class Category extends Component<any> {
  state = {
    isExpanded: false,
  };

  componentDidMount() {
    if (!window.openCategory) {
      window.openCategory = {};
    }
    window.openCategory[this.props.category.id] = () => this.setState({ isExpanded: true });
  }

  sortProducts = (a, b) => a.index - b.index;
  filterProducts = (x) =>
    x.categoryId == this.props.category.id && x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.props.query.toLowerCase().normalize('NFKD').replace(/[^\w]/g, ''));
  getProducts = () => this.props.products.filter(this.filterProducts).sort(this.sortProducts);

  getCategoryHeight = () =>
    74 +
    this.getProducts()
      .map((x) => (x.imageUrl ? 130 : 72 + (x.quantities ? 22 : 0) + (x.ingredients ? 22 : 0)))
      .reduce((a, b) => a + b, 0);

  startTimer = () => {
    this.longPressTimeout = setTimeout(() => {
      this.props.enterJiggleMode();
    }, 300);
  };

  toggle = () => {
    if (!this.props.inJiggleMode) {
      this.setState({ isExpanded: !this.state.isExpanded });
    }
  };

  clearTimeout = () => {
    clearTimeout(this.longPressTimeout);
  };

  onProductDragEnd = (params) => {
    const { destination, source, draggableId } = params;

    if (!destination) {
      return;
    }

    if (destination.index == source.index) {
      return;
    }

    this.props.moveProduct(draggableId, destination.index);
  };

  render() {
    const { category, query, inEditMode, provided, openProductModal, openCategoryModal, removeProductConfirm, removeCategoryConfirm, inJiggleMode } = this.props;
    const isExpanded = (this.state.isExpanded || query.length) && !inJiggleMode;

    const hasProducts = this.getProducts().length > 0;

    return (
      <Panel style={{ height: hasProducts && isExpanded ? this.getCategoryHeight() + 'px' : '68px', transition: 'height 0.25s ease-in-out' }}>
        <PanelHeader
          onMouseDown={this.startTimer}
          onTouchStart={this.startTimer}
          onTouchEnd={this.clearTimeout}
          onMouseUp={this.clearTimeout}
          onClick={this.toggle}
          style={{ cursor: inJiggleMode ? 'move' : 'pointer' }}
        >
          <CategoryActions>
            <CategoryTitle>
              <div style={{ display: 'inline-block', width: inJiggleMode ? '24px' : 0, overflow: 'hidden', transition: 'width 0.25s ease-in-out' }}>
                <FontAwesomeIcon color="#818e99" icon={faGripHorizontal} style={{ marginRight: '8px' }} />
              </div>
              <CountTag>{this.getProducts().length}</CountTag>
              <span>{category.name}</span>
            </CategoryTitle>
            {!inJiggleMode && (
              <FontAwesomeIcon
                style={{
                  transform: `rotate(${isExpanded ? '90' : '0'}deg)`,
                  transition: 'transform 0.2s ease-in-out',
                  opacity: hasProducts ? 1 : 0,
                }}
                color="#818e99"
                icon={faCaretRight}
              />
            )}
          </CategoryActions>
          <div style={{ display: 'flex', marginRight: '-16px' }}>
            <Button
              style={{ marginRight: '16px', transition: 'opacity 0.25s ease-in-out', opacity: inJiggleMode ? 0 : 1, pointerEvents: inJiggleMode ? 'none' : 'all' }}
              className="green"
              title="Adaugă produs"
              onClick={(e) => {
                openProductModal(category.id);
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '0' }} />
            </Button>

            <div style={{ display: 'flex', width: inJiggleMode ? '100px' : '0px', overflow: 'hidden', transition: 'width 0.35s ease-in-out' }}>
              <Button title="Editează produsul" onClick={() => openCategoryModal(category)} style={{ marginRight: '8px' }}>
                <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
              </Button>
              <Button title="Șterge produsul" className="destructive" onClick={() => removeCategoryConfirm(category)} style={{ marginRight: '15px' }}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        </PanelHeader>

        <DragDropContext onDragEnd={this.onProductDragEnd}>
          <Droppable droppableId={'productsContainer' + category.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {this.getProducts().map((product) => (
                  <Draggable key={product.id} {...provided.droppableProps} ref={provided.innerRef} draggableId={product.id} index={product.index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div style={{ padding: '4px 0' }}>
                          <Product query={query} product={product} inEditMode={inEditMode} openEditModal={() => openProductModal(product)} removeProduct={() => removeProductConfirm(product)} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {provided.placeholder}
      </Panel>
    );
  }
}

const Product = ({ product, inEditMode, openEditModal, removeProduct, query: rawQuery }) => {
  const query = rawQuery
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^(\w|\s)]/g, '');
  const productName = product.name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^(\w|\s)]/g, '');

  const indexOfMatch = productName.indexOf(query);

  const beforeMatchedString = product.name.substring(0, indexOfMatch);
  const matchedString = product.name.substring(indexOfMatch, indexOfMatch + query.length);
  const afterMatchedString = product.name.substring(indexOfMatch + query.length);

  console.log('query', query);
  console.log('productName', productName);
  console.log('beforeMatchedString', beforeMatchedString);
  console.log('matchedString', matchedString);
  console.log('afterMatchedString', afterMatchedString);

  return (
    <ProductStyle className={inEditMode ? 'editable' : ''}>
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
            <div>
              <span>{beforeMatchedString}</span>
              <MatchedString>{matchedString}</MatchedString>
              <span>{afterMatchedString}</span>
            </div>
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
  );
};
