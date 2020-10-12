import React from 'react';
import { Category as CategoryStyle, ActionButton, ProductCountLabel, ButtonsWrapper } from './styles';
import { faTrash, faSpellCheck, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Category extends React.Component {
  removeCategory = () => {
    if (window.confirm(`Ești sigur că dorești să ștergi categoria "${this.props.name}"?`)) {
      window.alert('Categoria a fost ștearsă');
    }
  };

  render() {
    const { productCount, name, inEditMode, onEditNamePress } = this.props;

    return (
      <CategoryStyle>
        <div>
          <div>{name}</div>
          <ProductCountLabel>{productCount} produse</ProductCountLabel>
        </div>
        {inEditMode && (
          <ButtonsWrapper>
            <ActionButton title='Mută în sus' className='green left' onClick={this.removeCategory}>
              <FontAwesomeIcon icon={faChevronUp} />
            </ActionButton>
            <ActionButton title='Mută în jos' className='green right' onClick={this.removeCategory}>
              <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faChevronDown} />
            </ActionButton>
            <ActionButton title='Redenumește' onClick={() => onEditNamePress(name)}>
              <FontAwesomeIcon style={{ marginBottom: '-1px' }} icon={faSpellCheck} />
              <span>Redenumește</span>
            </ActionButton>
            <ActionButton title='Șterge' className='destructive' onClick={this.removeCategory}>
              <FontAwesomeIcon icon={faTrash} />
              <span>Șterge</span>
            </ActionButton>
          </ButtonsWrapper>
        )}
      </CategoryStyle>
    );
  }
}
