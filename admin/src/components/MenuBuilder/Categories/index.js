import React from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faSpellCheck, faPencilAlt, faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from './styles';
import { Panel, Title, EditToggleWrapper, ActionButton, SmallDescription, ButtonsWrapper, SearchInput } from '../styles';
import EditModal from './EditModal';

export default class Categories extends React.Component {
  state = {
    query: '',
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

  filterCategories = (x) => x.name.toLowerCase().normalize('NFKD').replace(/[^\w]/g, '').includes(this.state.query.toLowerCase());

  render() {
    const { inEditMode, query } = this.state;

    return (
      <Panel>
        <Title>Categorii</Title>
        <EditToggleWrapper>
          <Toggle checked={inEditMode} title='Editează' onChange={() => this.setState({ inEditMode: !this.state.inEditMode })} icons={this.toggleIcons} />
        </EditToggleWrapper>
        <SearchInput placeholder='Găsește categorie' value={query} onChange={(e) => this.setState({ query: e.target.value })} />
        <div style={{ marginTop: '8px' }}>
          {categories.filter(this.filterCategories).map((category) => (
            <Category>
              <div>
                <div>{category.name}</div>
                <SmallDescription>{category.productCount} produse</SmallDescription>
              </div>
              {inEditMode && (
                <ButtonsWrapper>
                  <ActionButton title='Mută în sus' className='green left' onClick={this.removeCategory}>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </ActionButton>
                  <ActionButton title='Mută în jos' className='green right' onClick={this.removeCategory}>
                    <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faChevronDown} />
                  </ActionButton>
                  <ActionButton title='Redenumește' onClick={() => this.editModal.open(category)}>
                    <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faPencilAlt} />
                  </ActionButton>
                  <ActionButton title='Șterge' className='destructive' onClick={this.removeCategory}>
                    <FontAwesomeIcon icon={faTrash} />
                  </ActionButton>
                </ButtonsWrapper>
              )}
            </Category>
          ))}
        </div>
        <EditModal ref={(x) => (this.editModal = x)}></EditModal>
      </Panel>
    );
  }
}

const categories = [
  { id: 1, name: 'Aperitive', productCount: 43 },
  { id: 2, name: 'Supe', productCount: 13 },
  { id: 3, name: 'Fel principal', productCount: 6 },
  { id: 4, name: 'Grill - Cârnați', productCount: 42 },
  { id: 5, name: 'Paste făcute în casă', productCount: 43 },
  { id: 6, name: 'Garnituri', productCount: 11 },
  { id: 7, name: 'Salate', productCount: 43 },
  { id: 8, name: 'Desert', productCount: 7 },
  { id: 90, name: 'Sosuri', productCount: 43 },
];
