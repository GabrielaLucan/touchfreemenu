import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Wrapper, Panel, Button, EmptyPlaceholderWrapper, TopBar, SearchInput, JiggleModeIndicator } from './styles';

import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';
import ConfirmationModal from './ConfirmationModal';
import ProductModal from './ProductModal/Container';
import CategoryModal from './CategoryModal/Container';
import Category from './Category/Container';

export default class MenuBuilder extends React.Component {
  state = {
    query: '',
    inJiggleMode: false,
  };

  componentDidMount() {
    this.redirectIfNotLoggedIn();
    this.props.getCategories();
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

  sortCategories = (a, b) => a.index - b.index;

  getCategories = () => this.props.categories.sort(this.sortCategories);

  onDragEnd = (params) => {
    const { destination, source, draggableId } = params;

    if (!destination) {
      return;
    }

    if (destination.index == source.index) {
      return;
    }

    this.props.moveCategory(draggableId, destination.index);
  };

  enterJiggleMode = async () => {
    this.setState({ inJiggleMode: true });
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
    const { query, inJiggleMode } = this.state;
    const { categories, disabled, loading } = this.props;

    return (
      <Wrapper loading={loading}>
        {!categories.length ? (
          <Panel>
            <EmptyPlaceholderWrapper>
              Nimic aici încă. <br />
              Începe prin a adăuga o categorie.
              <Button className="green" disabled={disabled} style={{ marginLeft: '0', marginTop: '48px' }} title="Adaugă" onClick={() => this.openCategoryModal(undefined)}>
                <FontAwesomeIcon icon={faPlus} />
                Adaugă
              </Button>
            </EmptyPlaceholderWrapper>
          </Panel>
        ) : (
          <TopBar>
            <SearchInput placeholder="Caută produse, categorii, ingrediente etc..." value={query} onChange={(e) => this.setState({ query: e.target.value })} />
            <Button style={{ height: '43px', padding: '16px', paddingTop: '15px', backgroundColor: 'transparent' }} className="green" title="Adaugă categorie" onClick={() => this.openCategoryModal()}>
              <FontAwesomeIcon icon={faPlus} />
              Adaugă categorie
            </Button>
          </TopBar>
        )}

        <JiggleModeIndicator style={{ height: inJiggleMode ? '42px' : '0px' }}>
          Redenumește, reordonează sau șterge categorii, iar apoi fă click pe "gata".
          <Button className="green" disabled={disabled} title="Adaugă" onClick={() => this.setState({ inJiggleMode: false })}>
            Gata
          </Button>
        </JiggleModeIndicator>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="categoriesContainer">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {this.getCategories().map((category) => (
                  <Draggable key={category.id} {...provided.droppableProps} ref={provided.innerRef} isDragDisabled={!inJiggleMode} draggableId={category.id} index={category.index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Category
                          category={category}
                          provided={provided}
                          openProductModal={this.openProductModal}
                          openCategoryModal={this.openCategoryModal}
                          removeProduct={this.removeProduct}
                          inJiggleMode={inJiggleMode}
                          enterJiggleMode={this.enterJiggleMode}
                          query={query}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ProductModal ref={(x) => (this.productModal = x)} />
        <CategoryModal ref={(x) => (this.categoryModal = x)} />
        <ConfirmationModal ref={(x) => (this.confirmationModal = x)} />
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}
