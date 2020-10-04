import React, { Component } from 'react';
import styled from 'styled-components/macro';
import HeaderNavLink from '../NavLink';
import HeaderUsernameText from './Text';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
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
    background: #fafafa;
  }
`;

const Dropdown = styled.div`
  height: 50px;
  position: absolute;
  right: 0;
  top: 57px;
  background: #fff;
  display: none;
`;

const DropdownItem = styled.div`
  padding: 16px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  z-index: 2;

  :hover {
    background: #fafafa;
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
          <img alt="Your logo" src={user.logoUrl} style={{ width: '43px', marginLeft: '-5px', marginRight: '15px' }}></img>
          <HeaderUsernameText>{user.name}</HeaderUsernameText>
          <FontAwesomeIcon color='#818e99' icon={faCaretDown} style={{ marginLeft: '8px' }} />
        </ButtonWrapper>
        <Dropdown className='dropdown'>
          <DropdownItem onClick={() => this.props.history.push('/changePassword')}>Schimbă parola </DropdownItem>
        </Dropdown>
      </Wrapper>
    );
  }
}

export default withRouter(HeaderUserInfo);
