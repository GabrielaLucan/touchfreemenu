import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrash, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, ButtonsWrapper, DragIconWrapper, EditToggle, Title, Button } from './styles';
import { FormInput } from '../styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default class Panel extends React.Component {
  state = {
    query: '',
    items: this.props.items,
  };

  filterItems = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase().trim());

  onDragEnd = (params) => {
    const { destination, source, draggableId } = params;
    const { items } = this.state;

    if (!destination) {
      return;
    }

    if (destination.index == source.index) {
      return;
    }

    const draggedItem = items.find((x) => x.id + '' === draggableId);

    const filteredItems = items.filter((x) => x.id + '' !== draggableId);

    const newItems = [...filteredItems.slice(0, destination.index - 1), draggedItem, ...filteredItems.slice(destination.index - 1)];

    newItems.forEach((x, i) => {
      x.index = i + 1;
    });

    this.setState({ items: newItems });
  };

  render() {
    const { inEditMode, items, query } = this.state;
    const { title, searchPlaceholder, removeItem, renderItem, ItemStyle, EditModal, buttonsWrapperStyle } = this.props;

    return (
      <Wrapper>
        <EditToggle checked={inEditMode} title='Editează' onChange={() => this.setState({ inEditMode: !this.state.inEditMode })} icons={toggleIcons} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Title>{title}</Title>
                <FormInput placeholder={searchPlaceholder} value={query} onChange={(e) => this.setState({ query: e.target.value })} />
                <div style={{ marginTop: '8px', border: '1px solid #0000', width: '100%' }}>
                  {items.filter(this.filterItems).map((item) => (
                    <Draggable key={item.id} {...provided.droppableProps} x ref={provided.innerRef} isDragDisabled={!inEditMode} key={item.id} draggableId={item.id + ''} index={item.index}>
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
                              <Button title='Redenumește' onClick={() => this.editModal.open(item)}>
                                <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
                              </Button>
                              <Button title='Șterge' className='destructive' onClick={() => removeItem(item)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </ButtonsWrapper>
                          )}
                        </ItemStyle>
                      )}
                    </Draggable>
                  ))}
                </div>
                <EditModal ref={(x) => (this.editModal = x)} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    );
  }
}

const toggleIcons = {
  unchecked: <FontAwesomeIcon size='sm' color='#fff' icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
  checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size='sm' color='#fff' icon={faCheck} />,
};
