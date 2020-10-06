import React from 'react';
import { Wrapper, Panel, Title, Category as CategoryStyle, ActionButton, EditButton, ProductCountLabel, ButtonsWrapper } from './styles';
import { faPencilAlt, faTrash, faSpellCheck, faCheck, faAngleUp, faAngleDown, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const categories = ['Aperitive', 'Supe', 'Fel principal', 'Grill - Cârnați', 'Paste făcute în casă', 'Garnituri', 'Salate', 'Desert', 'Sosuri'];

export default class ChangePassword extends React.Component {
  state = {
    inEditMode: false,
  };

  componentDidMount() {
    this.redirectIfNotLoggedIn();
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

  render() {
    const { inEditMode } = this.state;

    return (
      <Wrapper>
        <Panel>
          <Title>Categorii</Title>
          <EditButton className={inEditMode ? 'active' : ''} title='Editează' onClick={() => this.setState({ inEditMode: !this.state.inEditMode })}>
            <FontAwesomeIcon icon={inEditMode ? faCheck : faPencilAlt} />
          </EditButton>
          {categories.map((x) => (
            <Category key={x} name={x} productCount={14} inEditMode={inEditMode} />
          ))}
        </Panel>
        <Panel>
          <Title>Produse</Title>
        </Panel>
      </Wrapper>
    );
  }
}

const Category = ({ name, productCount = 14, inEditMode }) => {
  const removeCategory = () => {
    if (window.confirm(`Ești sigur că dorești să ștergi categoria "${name}"?`)) {
      window.alert('Categoria a fost ștearsă');
    }
  };

  return (
    <CategoryStyle>
      <div>
        <div>{name}</div>
        <ProductCountLabel>{productCount} produse</ProductCountLabel>
      </div>
      {inEditMode && (
        <ButtonsWrapper>
          <ActionButton title='Mută în sus' className='green left' onClick={removeCategory}>
            <FontAwesomeIcon size='md' icon={faChevronUp} />
          </ActionButton>
          <ActionButton title='Mută în jos' className='green right' onClick={removeCategory}>
            <FontAwesomeIcon style={{ marginBottom: '-1px' }} size='md' icon={faChevronDown} />
          </ActionButton>
          <ActionButton onClick={removeCategory}>
            <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faSpellCheck} />
            Redenumește
          </ActionButton>
          <ActionButton className='destructive' onClick={removeCategory}>
            <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faTrash} />
            Șterge
          </ActionButton>
        </ButtonsWrapper>
      )}
    </CategoryStyle>
  );
};
