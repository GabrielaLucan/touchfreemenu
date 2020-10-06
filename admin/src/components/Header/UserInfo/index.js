import React, { Component } from 'react';
import styled from 'styled-components/macro';
import HeaderNavLink from '../NavLink';
import HeaderUsernameText from './Text';
import { faCaretDown, faHome, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../../shared/Button';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  cursor: pointer;
  position: relative;
  z-index: 3;

  :hover .dropdown {
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  z-index: 3;

  :hover {
    background: ${(props) => props.theme.activeBackground};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 57px;
  background: ${(props) => props.theme.foreground};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
  display: none;
`;

const DropdownItem = styled.div`
  height: 50px;
  padding: 16px;
  z-index: 2;
  color: ${(props) => props.theme.mutedText};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${(props) => props.theme.border};

  :hover {
    color: #7ac943;
  }

  :hover .icon {
    color: #7ac943;
  }

  :last-of-type {
    border-bottom-width: 0;
  }
`;

class HeaderUserInfo extends Component {
  state = {
    showsMenu: false,
  };

  toggleMenu = () => {
    this.setState({ showsMenu: !this.state.showsMenu });
  };

  render() {
    const { user } = this.props;

    return (
      <Wrapper to='/' onClick={this.toggleMenu}>
        <ButtonWrapper>
          <img alt='Your logo' src={user.logoUrl} style={{ width: '43px', marginLeft: '-5px', marginRight: '15px' }}></img>
          <HeaderUsernameText>{user.name}</HeaderUsernameText>
          <FontAwesomeIcon color='#818e99' icon={faCaretDown} style={{ marginLeft: '8px' }} />
        </ButtonWrapper>
        <Dropdown className='dropdown'>
          <DropdownItem onClick={() => this.props.history.push('/')}>
            Acasă <FontAwesomeIcon className='icon' color='#818e99' icon={faHome} style={{ marginLeft: '8px' }} />{' '}
          </DropdownItem>
          <DropdownItem onClick={() => this.props.history.push('/change-password')}>
            Schimbă parola <FontAwesomeIcon className='icon' color='#818e99' icon={faKey} style={{ marginLeft: '8px' }} />{' '}
          </DropdownItem>
          <DropdownItem onClick={this.props.logout}>
            Delogare <FontAwesomeIcon className='icon' color='#818e99' icon={faSignOutAlt} style={{ marginLeft: '8px' }} />{' '}
          </DropdownItem>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default withRouter(HeaderUserInfo);
