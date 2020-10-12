import React from 'react';
import { Wrapper, Panel, Title, Category as CategoryStyle, ActionButton, EditToggleWrapper, ProductCountLabel, ButtonsWrapper } from './styles';
import { faPencilAlt, faTrash, faSpellCheck, faCheck, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'react-toggle';

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
          <EditToggleWrapper>
            <Toggle
              checked={inEditMode}
              title='Editează'
              onChange={() => this.setState({ inEditMode: !this.state.inEditMode })}
              icons={{
                unchecked: <FontAwesomeIcon size='sm' color='#fff' icon={faPencilAlt} style={{ marginTop: '-2px', marginLeft: '-2px' }} />,
                checked: <FontAwesomeIcon style={{ marginTop: '-2px' }} size='sm' color='#fff' icon={faCheck} />,
              }}
            />
          </EditToggleWrapper>
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
          <ActionButton title='Redenumește' onClick={removeCategory}>
            <FontAwesomeIcon icon={faSpellCheck} />
            <span>Redenumește</span>
          </ActionButton>
          <ActionButton title='Șterge' className='destructive' onClick={removeCategory}>
            <FontAwesomeIcon icon={faTrash} />
            <span>Șterge</span>
          </ActionButton>
        </ButtonsWrapper>
      )}
    </CategoryStyle>
  );
};
