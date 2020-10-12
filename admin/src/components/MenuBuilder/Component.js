import React from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

import { Wrapper, Panel, Title, EditToggleWrapper } from './styles';
import Category from './Category';
import EditModal from './EditNameModal';

const categories = [
  { id: 1, name: 'Aperitive' },
  { id: 2, name: 'Supe' },
  { id: 3, name: 'Fel principal' },
  { id: 4, name: 'Grill - Cârnați' },
  { id: 5, name: 'Paste făcute în casă' },
  { id: 6, name: 'Garnituri' },
  { id: 7, name: 'Salate' },
  { id: 8, name: 'Desert' },
  { id: 90, name: 'Sosuri' },
];

export default class MenuBuilder extends React.Component {
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
        <EditModal ref={(x) => (this.editModal = x)}></EditModal>
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
            <Category {...x} key={x.id} productCount={14} inEditMode={inEditMode} onEditNamePress={() => this.editModal.open(x)} />
          ))}
        </Panel>
        <Panel>
          <Title>Produse</Title>
        </Panel>
      </Wrapper>
    );
  }
}
