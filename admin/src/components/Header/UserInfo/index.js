import React from 'react';
import styled from 'styled-components/macro';
import HeaderNavLink from '../NavLink';
import HeaderUsernameText from './Text';

const Wrapper = styled(HeaderNavLink)`
  flex-shrink: 1;
  border-left: 1px solid ${(props) => props.theme.border};
  border-right: 1px solid ${(props) => props.theme.border};
  min-width: 0;
`;

const HeaderUserInfo = ({ user }) => (
  <Wrapper to='/'>
    <img src={user.logoUrl} style={{ width: '43px', marginLeft: '-5px', marginRight: '15px' }}></img>
    <HeaderUsernameText>{user.name}</HeaderUsernameText>
  </Wrapper>
);

export default HeaderUserInfo;
