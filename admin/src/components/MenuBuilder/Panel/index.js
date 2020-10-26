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
  };

  filterItems = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase().trim());

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

  openEditModal = () => this.editModal.getWrappedInstance().open();

  render() {
    const { openEditModal } = this;
    const { inEditMode, query } = this.state;
    const { title, items, type, renderItem, createItem, saveItemEdits, disabled, ItemStyle, EditModal, buttonsWrapperStyle, loading } = this.props;

    return (
      <Wrapper>
        <ContentWrapper loading={loading}>
          {items.length > 0 && <EditToggle checked={inEditMode} title="Editează" onChange={() => this.setState({ inEditMode: !inEditMode })} icons={toggleIcons} />}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Title>{title}</Title>
                  <div style={{ display: 'flex' }}>
                    {items.length > 0 && <FormInput style={{ width: '220px' }} placeholder={'Caută ' + type} value={query} onChange={(e) => this.setState({ query: e.target.value })} />}
                  </div>
                  <div style={{ marginTop: '8px', border: '1px solid #0000', width: '100%' }}>
                    {items
                      .filter(this.filterItems)
                      .sort((a, b) => a.index - b.index)
                      .map((item) => (
                        <Draggable key={item.id} {...provided.droppableProps} ref={provided.innerRef} isDragDisabled={!inEditMode} key={item.id} draggableId={item.id} index={item.index}>
                          {(provided) => (
                            <ItemStyle ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={inEditMode ? 'editable' : ''}>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {inEditMode && (
                                  <DragIconWrapper>
                                    <FontAwesomeIcon icon={faGripVertical} />
                                  </DragIconWrapper>
                                )}
                                {renderItem(item)}
                              </div>
                              {inEditMode && (
                                <ButtonsWrapper style={buttonsWrapperStyle}>
                                  <Button title={`Editează ${type}`} onClick={() => openEditModal(item, items)}>
                                    <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
                                  </Button>
                                  <Button title={`Șterge ${type}`} className="destructive" onClick={() => this.remove(item)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </ButtonsWrapper>
                              )}
                            </ItemStyle>
                          )}
                        </Draggable>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {!items.length && (
            <EmptyPlaceholderWrapper>
              {type == 'categorie' ? 'Nicio categorie încă.' : 'Niciun produs încă.'}
              <Button
                className="green"
                disabled={disabled}
                style={{ marginLeft: '0', marginTop: '24px' }}
                title={`Adaugă ${type == 'categorie' ? 'o categorie' : 'un produs'}`}
                onClick={() => this.openEditModal(undefined, items)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Adaugă
              </Button>
            </EmptyPlaceholderWrapper>
          )}
          {disabled && <SmallDescription style={{ marginTop: '-14px' }}>Adaugă o categorie pentru a putea adăuga produse.</SmallDescription>}
          {items.length > 0 && (
            <Button className="green" title={`Adaugă ${type}`} style={{ marginLeft: 0, alignSelf: 'flex-end', marginTop: '16px' }} onClick={() => openEditModal(undefined, items)}>
              <FontAwesomeIcon icon={faPlus} />
              Adaugă
            </Button>
          )}
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
