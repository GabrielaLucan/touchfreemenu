import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Wrapper, Panel, FormInput, Button, EmptyPlaceholderWrapper, TopBar, SearchInput } from './styles';

import LoadingIndicatorSpinner from '../shared/LoadingIndicator/Spinner';
import ConfirmationModal from './ConfirmationModal';
import ProductModal from './ProductModal/Container';
import CategoryModal from './CategoryModal/Container';
import Category from './Category/Container';

export default class MenuBuilder extends React.Component {
  state = {
    query: '',
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
    const { query } = this.state;
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

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {this.getCategories().map((category) => (
                  <Category category={category} provided={provided} openProductModal={this.openProductModal} removeProduct={this.removeProduct} query={query} />
                ))}
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
