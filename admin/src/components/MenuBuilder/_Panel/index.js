import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrash, faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, ContentWrapper, ButtonsWrapper, DragIconWrapper, EditToggle, Title, Button, EmptyPlaceholderWrapper, SmallDescription } from './styles';
import { FormInput } from '../styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import LoadingIndicatorSpinner from '../../shared/LoadingIndicator/Spinner';
import ConfirmationModal from './ConfirmationModal';

export default class Panel extends React.Component {
  state = {
    query: '',
    inEditMode: false,
  };

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

  remove = async (item) => {
    const { type, removeItem } = this.props;

    await this.confirmationModal.open({ title: `Ștergere ${type}`, text: `Ești sigur că dorești să ștergi ${type == 'categorie' ? 'categoria' : 'produsul'} "${item.name}"?` });
    removeItem(item.id);
  };

  openEditModal = (item) => this.editModal.getWrappedInstance().open(item);

  render() {
    const { openEditModal } = this;
    const { inEditMode, query } = this.state;
    const { products, type, renderItem, createItem, saveItemEdits, disabled, Productstyle, EditModal, buttonsWrapperStyle, loading } = this.props;

    return (
      <Wrapper>
        <ContentWrapper loading={loading}>
          {products.length > 0 && <EditToggle checked={inEditMode} title="Editează" onChange={() => this.setState({ inEditMode: !inEditMode })} icons={toggleIcons} />}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Title>Meniul tău</Title>
                  <div style={{ display: 'flex' }}>
                    {products.length > 0 && <FormInput style={{ width: '220px' }} placeholder={'Caută...'} value={query} onChange={(e) => this.setState({ query: e.target.value })} />}
                    <Button className="green" disabled={disabled} title="Adaugă un produs" onClick={() => this.openEditModal(undefined, products)}>
                      <FontAwesomeIcon icon={faPlus} />
                      Adaugă
                    </Button>
                  </div>
                  <div style={{ marginTop: '8px', border: '1px solid #0000', width: '100%' }}>
                    {this.getProducts().map((item, i) => (
                      <>
                        {item.category && ((this.getProducts()[i - 1] || {}).category || {}).id != item.category.id && (
                          <SmallDescription style={{ marginTop: '16px' }}>{item.category.name}</SmallDescription>
                        )}
                        <Draggable key={item.id} {...provided.droppableProps} ref={provided.innerRef} isDragDisabled={!inEditMode} key={item.id} draggableId={item.id} index={item.index}>
                          {(provided) => (
                            <Productstyle ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={inEditMode ? 'editable' : ''}>
                              <div style={{ display: 'flex', alignProducts: 'center' }}>
                                {inEditMode && (
                                  <DragIconWrapper>
                                    <FontAwesomeIcon icon={faGripVertical} />
                                  </DragIconWrapper>
                                )}
                                {renderItem(item)}
                              </div>
                              {inEditMode && (
                                <ButtonsWrapper style={buttonsWrapperStyle}>
                                  <Button title="Editează produsul" onClick={() => openEditModal(item, products)}>
                                    <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
                                  </Button>
                                  <Button title="Șterge produsul" className="destructive" onClick={() => this.remove(item)}>
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
          {!products.length && (
            <EmptyPlaceholderWrapper>
              Nimic aici încă. Începe prin a adăuga o categorie.
              <Button
                className="green"
                disabled={disabled}
                style={{ marginLeft: '0', marginTop: '24px' }}
                title="Adaugă"
                onClick={() => this.openEditModal(undefined, products)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Adaugă
              </Button>
            </EmptyPlaceholderWrapper>
          )}
          {disabled && <SmallDescription style={{ marginTop: '-14px' }}>Adaugă o categorie pentru a putea adăuga produse.</SmallDescription>}
        </ContentWrapper>
        <EditModal onCreate={createItem} onSave={saveItemEdits} ref={(x) => (this.editModal = x)} />
        <ConfirmationModal ref={(x) => (this.confirmationModal = x)} />
        {loading && <LoadingIndicatorSpinner />}
      </Wrapper>
    );
  }
}

const toggleIcons = {
  unchecked: <FontAwesomeIcon size="sm" color="#fff" icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
  checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size="sm" color="#fff" icon={faCheck} />,
};
