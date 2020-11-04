import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrash, faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  Wrapper,
  PanelContent,
  Panel,
  FormInput,
  ButtonsWrapper,
  DragIconWrapper,
  EditToggle,
  Title,
  Button,
  EmptyPlaceholderWrapper,
  SmallDescription,
  ProductImageWrapper,
  ProductImage,
} from './styles';

import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';
import ConfirmationModal from './ConfirmationModal';
import ProductModal from './ProductModal/Container';
import CategoryModal from './CategoryModal/Container';

export default class MenuBuilder extends React.Component {
  state = {
    query: '',
    inEditMode: false,
  };

  componentDidMount() {
    this.redirectIfNotLoggedIn();
    this.props.getProducts();
  }

  componentDidUpdate() {
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn() {
    const { token, history } = this.props;
    if (!token) {
      history.push('/login');
    }
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
        {quantities.length > 0 && (
          <SmallDescription>
            Gramaj{quantities.includes('/') || quantities.includes(',') ? 'e' : ''}: {quantities}
          </SmallDescription>
        )}
      </div>
    </div>
  );

  filterProducts = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase().trim());
  sortProducts = (a, b) => {
    if (!a.category) {
      return a.index - b.index;
    } else {
      if (a.category.index == b.category.index) {
        return a.index - b.index;
      } else {
        return a.category.index - b.category.index;
      }
    }
  };

  getProducts = () => this.props.products.filter(this.filterProducts).sort(this.sortProducts);

  onDragEnd = (params) => {
    const { destination, source, draggableId } = params;

    if (!destination) {
      return;
    }

    if (destination.index == source.index) {
      return;
    }

    this.props.moveItem(draggableId, destination.index);
  };

  removeProduct = async (product) => {
    await this.confirmationModal.open({ title: `Șterge produs`, text: `Ești sigur că dorești să ștergi produsul "${product.name}"?` });
    this.props.removeProduct(product.id);
  };

  removeCategory = async (category) => {
    await this.confirmationModal.open({ title: `Șterge categorie`, text: `Ești sigur că dorești să ștergi categoria "${category.name}"?` });
    this.props.removeCategory(category.id);
  };

  openProductModal = (product) => this.productModal.getWrappedInstance().open(product);
  openCategoryModal = (category) => this.categoryModal.getWrappedInstance().open(category);

  render() {
    const { inEditMode, query } = this.state;
    const { products, categories, disabled, Productstyle, loading } = this.props;

    return (
      <Wrapper>
        <Panel>
          <PanelContent loading={loading}>
            {products.length > 0 && <EditToggle checked={inEditMode} title="Editează" onChange={() => this.setState({ inEditMode: !inEditMode })} icons={toggleIcons} />}
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Title>Meniul tău</Title>
                    {categories.length > 0 && (
                      <div style={{ display: 'flex' }}>
                        <FormInput style={{ width: '220px' }} placeholder="Caută..." value={query} onChange={(e) => this.setState({ query: e.target.value })} />
                        <Button className="green" title="Adaugă categorie" onClick={() => this.openProductModal(undefined)}>
                          <FontAwesomeIcon icon={faPlus} />
                          Adaugă
                        </Button>
                      </div>
                    )}
                    <div style={{ marginTop: '8px', border: '1px solid #0000', width: '100%' }}>
                      {this.getProducts().map((product, i) => (
                        <>
                          {product.category && ((this.getProducts()[i - 1] || {}).category || {}).id != product.category.id && (
                            <SmallDescription style={{ marginTop: '16px' }}>{product.category.name}</SmallDescription>
                          )}
                          <Draggable key={product.id} {...provided.droppableProps} ref={provided.innerRef} isDragDisabled={!inEditMode} draggableId={product.id} index={product.index}>
                            {(provided) => (
                              <Productstyle ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={inEditMode ? 'editable' : ''}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {inEditMode && (
                                    <DragIconWrapper>
                                      <FontAwesomeIcon icon={faGripVertical} />
                                    </DragIconWrapper>
                                  )}
                                  {this.renderProduct(product)}
                                </div>
                                {inEditMode && (
                                  <ButtonsWrapper>
                                    <Button title="Editează produsul" onClick={() => this.openProductModal(product)}>
                                      <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
                                    </Button>
                                    <Button title="Șterge produsul" className="destructive" onClick={() => this.removeProduct(product)}>
                                      <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                  </ButtonsWrapper>
                                )}
                              </Productstyle>
                            )}
                          </Draggable>
                        </>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {!categories.length && (
              <EmptyPlaceholderWrapper>
                Nimic aici încă. Începe prin a adăuga o categorie.
                <Button className="green" disabled={disabled} style={{ marginLeft: '0', marginTop: '24px' }} title="Adaugă" onClick={() => this.openProductModal(undefined)}>
                  <FontAwesomeIcon icon={faPlus} />
                  Adaugă
                </Button>
              </EmptyPlaceholderWrapper>
            )}
          </PanelContent>
          <ProductModal ref={(x) => (this.productModal = x)} />
          <CategoryModal ref={(x) => (this.categoryModal = x)} />
          <ConfirmationModal ref={(x) => (this.confirmationModal = x)} />
          {loading && <LoadingIndicatorSpinner />}
        </Panel>
      </Wrapper>
    );
  }
}

const toggleIcons = {
  unchecked: <FontAwesomeIcon size="sm" color="#fff" icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
  checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size="sm" color="#fff" icon={faCheck} />,
};
