import React from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrash, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { Category, ButtonsWrapper, DragIconWrapper } from './styles';
import { Panel, Title, EditToggleWrapper, ActionButton, SmallDescription, SearchInput } from '../styles';
import EditModal from './EditModal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const categories = [
  { index: 1, id: 10, name: 'Aperitive', productCount: 43 },
  { index: 2, id: 11, name: 'Supe', productCount: 13 },
  { index: 3, id: 13, name: 'Fel principal', productCount: 6 },
  { index: 4, id: 14, name: 'Grill - Cârnați', productCount: 42 },
  { index: 5, id: 15, name: 'Paste făcute în casă', productCount: 43 },
  { index: 6, id: 16, name: 'Garnituri', productCount: 11 },
  { index: 7, id: 17, name: 'Salate', productCount: 43 },
  { index: 8, id: 18, name: 'Desert', productCount: 7 },
  { index: 9, id: 19, name: 'Sosuri', productCount: 43 },
];

export default class Categories extends React.Component {
  state = {
    query: '',
    categories,
  };

  removeCategory = () => {
    if (window.confirm(`Ești sigur că dorești să ștergi categoria "${this.props.name}"?`)) {
      window.alert('Categoria a fost ștearsă');
    }
  };

  toggleIcons = {
    unchecked: <FontAwesomeIcon size='sm' color='#fff' icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
    checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size='sm' color='#fff' icon={faCheck} />,
  };

  filterCategories = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase().trim());

  onDragEnd = (params) => {
    const { destination, source, draggableId } = params;
    const { categories } = this.state;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // pula manzului
    if (destination.index == source.index) {
      return;
    }

    const draggedCategory = categories.find((x) => x.id + '' === draggableId);

    const filteredCategories = categories.filter((x) => x.id + '' !== draggableId);

    const newCategories = [...filteredCategories.slice(0, destination.index - 1), draggedCategory, ...filteredCategories.slice(destination.index - 1)];

    newCategories.forEach((x, i) => {
      x.index = i + 1;
    });

    this.setState({ categories: newCategories });
  };

  render() {
    const { inEditMode, categories, query } = this.state;

    return (
      <Panel>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Title>Categorii</Title>
                <EditToggleWrapper>
                  <Toggle checked={inEditMode} title='Editează' onChange={() => this.setState({ inEditMode: !this.state.inEditMode })} icons={this.toggleIcons} />
                </EditToggleWrapper>
                <SearchInput placeholder='Găsește categorie' value={query} onChange={(e) => this.setState({ query: e.target.value })} />
                <div style={{ marginTop: '8px', width: '100%' }}>
                  {categories.filter(this.filterCategories).map((category) => (
                    <Draggable
                      key={category.id}
                      {...provided.droppableProps}x
                      ref={provided.innerRef}
                      isDragDisabled={!inEditMode}
                      key={category.id}
                      draggableId={category.id + ''}
                      index={category.index}
                    >
                      {(provided, snapshot) => (
                        <Category ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={inEditMode ? 'editable' : ''}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {inEditMode && (
                              <DragIconWrapper>
                                <FontAwesomeIcon icon={faGripVertical} />
                              </DragIconWrapper>
                            )}
                            <div>
                              <div>{category.name}</div>
                              <SmallDescription>{category.productCount} produse</SmallDescription>
                            </div>
                          </div>
                          {inEditMode && (
                            <ButtonsWrapper>
                              <ActionButton title='Redenumește' onClick={() => this.editModal.open(category)}>
                                <FontAwesomeIcon style={{ margin: '0 -1px' }} icon={faPencilAlt} />
                              </ActionButton>
                              <ActionButton title='Șterge' className='destructive' onClick={this.removeCategory}>
                                <FontAwesomeIcon icon={faTrash} />
                              </ActionButton>
                            </ButtonsWrapper>
                          )}
                        </Category>
                      )}
                    </Draggable>
                  ))}
                </div>
                <EditModal ref={(x) => (this.editModal = x)}></EditModal>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Panel>
    );
  }
}
